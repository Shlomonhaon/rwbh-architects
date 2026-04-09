import type { Metadata } from "next";
import { Cinzel, Josefin_Sans } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const josefinSans = Josefin_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "RWBH Architects — Rahel Wahnon Ben Haim",
  description:
    "Luxury residential architecture and interior design studio in Jerusalem. Where heritage meets modern form.",
  openGraph: {
    title: "RWBH Architects — Rahel Wahnon Ben Haim",
    description: "Luxury residential architecture and interior design studio in Jerusalem.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${josefinSans.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
