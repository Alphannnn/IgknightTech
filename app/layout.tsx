import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://igknight.tech";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Igknight Tech — Software that ships",
    template: "%s · Igknight Tech",
  },
  description:
    "A senior software studio. We design, build, and look after the software your business runs on — engineering, design, AI, cloud, mobile, and web.",
  keywords: [
    "software development agency",
    "custom software",
    "web development",
    "mobile apps",
    "AI engineering",
    "cloud infrastructure",
    "product design",
    "engineering team for hire",
    "senior engineering team",
  ],
  authors: [{ name: "Igknight Tech" }],
  creator: "Igknight Tech",
  publisher: "Igknight Tech",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Igknight Tech",
    title: "Igknight Tech — Software that ships",
    description:
      "A senior software studio. We design, build, and look after the software your business runs on.",
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Igknight Tech — Software that ships",
    description:
      "A senior software studio. We design, build, and look after the software your business runs on.",
    creator: "@igknighttech",
    site: "@igknighttech",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
