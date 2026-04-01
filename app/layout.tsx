import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "署名サイト",
  description: "議題への賛同署名を集めるためのサイト",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
