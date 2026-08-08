import { ChatWidget } from "@/components/chat/chat-widget";
import type { Metadata } from "next";
import { Bodoni_Moda, Great_Vibes, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
  fallback: ["Alex Brush", "cursive"],
});

export const metadata: Metadata = {
  title: "Loans with Rebekah",
  description: "Professional mortgage brokerage services led by Rebekah. Home loans, refinancing, and 24/7 AI voice scheduling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${bodoniModa.variable} ${greatVibes.variable}`}>
      <body className="bg-ink font-sans text-text antialiased">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
