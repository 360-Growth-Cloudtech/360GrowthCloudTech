import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const proto = request.headers.get("x-forwarded-proto");

  // In production, enforce canonical apex domain (no www) and HTTPS
  if (process.env.NODE_ENV === "production") {
    const isHttp = proto === "http";
    const isWww = host.startsWith("www.");
    if (isHttp || isWww) {
      const cleanHost = host.replace(/^www\./, "");
      const targetUrl = new URL(request.url);
      targetUrl.protocol = "https:";
      targetUrl.host = cleanHost || "360cloudtech.com";
      return NextResponse.redirect(targetUrl, 308);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  // Skip only the real /api routes (not pages like /api-integration), Next internals and files.
  matcher: ["/((?!api(?:/|$)|_next|_vercel|.*\\..*).*)"],
};
