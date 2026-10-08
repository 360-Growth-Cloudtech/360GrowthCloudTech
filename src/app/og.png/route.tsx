import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/seo/site";

// Default 1200×630 Open Graph / Twitter card, rendered once at build time.
export const dynamic = "force-static";

const SERVICES = ["Custom Software", "AI & Automation", "Cloud & DevOps", "Web & Mobile"];

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0f172a",
          backgroundImage:
            "radial-gradient(ellipse 60% 70% at 100% 0%, rgba(37,99,235,0.45) 0%, transparent 70%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#2563eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            360
          </div>
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -0.5 }}>{SITE_NAME}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 66, fontWeight: 800, lineHeight: 1.08, letterSpacing: -1.5, maxWidth: 940 }}>
            AI-First Custom Software Development Company
          </div>
          <div style={{ fontSize: 28, color: "#cbd5e1", maxWidth: 900 }}>
            Enterprise web, mobile, SaaS and cloud platforms. Transparent delivery, full IP ownership.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {SERVICES.map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                padding: "10px 22px",
                borderRadius: 999,
                border: "1px solid rgba(148,163,184,0.35)",
                fontSize: 22,
                color: "#e2e8f0",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
