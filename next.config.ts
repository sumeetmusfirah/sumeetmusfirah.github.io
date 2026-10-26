import type { NextConfig } from "next";

// Static export for free hosting on GitHub Pages (custom domain via public/CNAME).
const nextConfig: NextConfig = {
  output: "export",
  // journal.html would collide with the journal/ entry folder on GitHub Pages; emit journal/index.html instead.
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
