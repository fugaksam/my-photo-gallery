import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "画像一覧",
  description: "猫ちゃんの写真ギャラリー",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
