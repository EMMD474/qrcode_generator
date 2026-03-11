import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QR Code Generator",
  description: "Generate clean QR codes instantly for links, text, and shareable content.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
