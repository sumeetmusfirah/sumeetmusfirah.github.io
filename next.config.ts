import type { NextConfig } from "next";

// Static export for free hosting on GitHub Pages (custom domain via public/CNAME).
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
