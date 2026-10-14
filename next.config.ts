import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.resolve("."),
  images: { formats: ["image/avif", "image/webp"] },
};

export default nextConfig;
