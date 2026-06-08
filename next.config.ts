import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    // styled-componentsをNext.jsに最適化する設定
    styledComponents: true,
  },
};

export default nextConfig;