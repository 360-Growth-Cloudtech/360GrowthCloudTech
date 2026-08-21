/** @type {import('next').NextConfig} */
const nextConfig = {
  // "standalone" breaks the dev-time React client manifest (Next 15.5 devtools),
  // so only emit it for production builds, which is where Docker needs it.
  output: process.env.NODE_ENV === "production" ? "standalone" : undefined,
  reactStrictMode: true,
  // The dev-only Segment Explorer panel fails to register in the React Client
  // Manifest here and takes the whole client bundle down with it.
  experimental: {
    devtoolSegmentExplorer: false,
  },
};

export default nextConfig;
