import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // "standalone" breaks the dev-time React client manifest (Next 15.5 devtools),
  // so only emit it for production builds, which is where Docker needs it.
  output: process.env.NODE_ENV === "production" ? "standalone" : undefined,
  reactStrictMode: true,
  // Always render <title>/meta/canonical inside <head> (no streamed metadata),
  // so every crawler and link-preview bot sees them in the raw HTML.
  htmlLimitedBots: /.*/,
  // The dev-only Segment Explorer panel fails to register in the React Client
  // Manifest here and takes the whole client bundle down with it.
  experimental: {
    devtoolSegmentExplorer: false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      {
        // Cache static font and image assets aggressively
        source: "/(case-studies|services|mockups)/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  // English is served unprefixed; old /en and es/fr/de/ja/ar URLs go to the bare path.
  async redirects() {
    return [
      { source: "/:lang(en|es|fr|de|ja|ar)", destination: "/", permanent: true },
      { source: "/:lang(en|es|fr|de|ja|ar)/:path*", destination: "/:path*", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
