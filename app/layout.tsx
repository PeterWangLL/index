import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Peter Wang | 个人主页",
  description: "Code. Hike. Read. Live. — Peter Wang 的个人主页与生活记录",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className="h-full scroll-smooth antialiased"
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
