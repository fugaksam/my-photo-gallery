import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // localhost と 127.0.0.1 の混在時に HMR がブロックされないようにする
  allowedDevOrigins: ["127.0.0.1"],
  compiler: {
    // styled-componentsをNext.jsに最適化する設定
    styledComponents: true,
  },
};

export default nextConfig;