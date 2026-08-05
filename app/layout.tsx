import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://emoease.org"),
  title: {
    default: "EmoEase",
    template: "%s | EmoEase",
  },
  description:
    "EmoEase is a Kenyan online safe space supporting men's mental health through honest conversations, community, practical resources, and trusted referrals.",
  keywords: [
    "mens mental health",
    "peer support",
    "mental health resources",
    "community wellness",
    "Kenya",
    "Nairobi",
    "EmoEase",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "EmoEase",
    description:
      "A Kenyan community for men's mental health, honest conversations, practical support, and connection.",
    url: "/",
    siteName: "EmoEase",
    images: [
      {
        url: "/images/emoease-hero.png",
        width: 1600,
        height: 2000,
        alt: "EmoEase hero artwork showing a supportive community scene",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EmoEase",
    description:
      "A calm, trustworthy landing page for men's mental health support, education, and community care.",
    images: ["/images/emoease-hero.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      <body className="min-h-screen overflow-x-clip bg-background pb-20 font-sans text-foreground antialiased md:pb-0">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-foreground focus:shadow-soft"
        >
          Skip to content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
