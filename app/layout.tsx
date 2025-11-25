import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "./components/GoogleAnalytics";
import StructuredData from "./components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Professional Web Development - Get A Website That Brings You Customers",
  description: "Expert web development services for businesses. Custom websites, landing pages, and web applications built with Next.js. Fast delivery, affordable pricing, proven results.",
  keywords: ["web development", "freelance web developer", "Next.js", "landing page design", "custom websites", "web design services"],
  icons: {
    icon: '/icon.svg?v=3',
    apple: '/icon.svg?v=3',
  },
  openGraph: {
    title: "Professional Web Development - Get A Website That Brings You Customers",
    description: "Expert web development services for businesses. Custom websites, landing pages, and web applications built with Next.js.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
