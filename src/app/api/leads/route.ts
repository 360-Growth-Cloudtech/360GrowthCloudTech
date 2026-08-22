import { NextRequest, NextResponse } from "next/server";
import { appendLeadRow } from "@/lib/google-sheets";
import { sendLeadAutoReply } from "@/lib/email";
import { leadSchema } from "@/lib/schemas/lead";

const RATE_LIMIT_MS = 60_000;
const rateLimitMap = new Map<string, number>();

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const last = rateLimitMap.get(ip);
  if (last && now - last < RATE_LIMIT_MS) return true;
  rateLimitMap.set(ip, now);
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again in a minute." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const lead = parsed.data;

    if (lead.website) {
      return NextResponse.json({ success: true });
    }

    const errors: string[] = [];

    try {
      await appendLeadRow(lead);
    } catch (err) {
      console.error("[leads] Google Sheets error:", err);
      errors.push("sheets");
    }

    try {
      await sendLeadAutoReply(lead);
    } catch (err) {
      console.error("[leads] Email error:", err);
      errors.push("email");
    }

    if (errors.length === 2) {
      return NextResponse.json(
        { success: false, error: "Unable to process your submission. Please try again later." },
        { status: 500 },
      );
    }

    if (errors.length === 1) {
      return NextResponse.json({
        success: true,
        warning: errors[0] === "email"
          ? "Your message was saved, but we could not send a confirmation email."
          : "Your confirmation email was sent, but we had trouble saving your details.",
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[leads] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
