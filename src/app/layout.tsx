import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://demdxx.com"),
  title: {
    default: "Demdxx",
    template: "%s | Demdxx",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <body className="flex min-h-screen flex-col">
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
