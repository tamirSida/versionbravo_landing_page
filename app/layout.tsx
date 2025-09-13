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

export const metadata: Metadata = {
  metadataBase: new URL('https://versionbravo.com'),
  title: "Version Bravo - Frontline to Founders | Combat Veteran Entrepreneurship Platform",
  description: "Version Bravo provides education, acceleration, and venture capital support to Combat Veteran Founders from the U.S. and Israel. Join Alpha-Bet School or apply for our exclusive accelerator program.",
  keywords: [
    "combat veterans",
    "entrepreneurship",
    "startup accelerator", 
    "veteran founders",
    "Alpha-Bet School",
    "Version Bravo Accelerator",
    "military entrepreneurship",
    "veteran business",
    "startup funding",
    "Israel US veterans"
  ],
  authors: [{ name: "Version Bravo" }],
  creator: "Version Bravo",
  publisher: "Version Bravo",
  openGraph: {
    title: "Version Bravo - Frontline to Founders",
    description: "Combat Veteran Entrepreneurship Platform - From Alpha-Bet School to Version Bravo Accelerator",
    url: "https://versionbravo.com",
    siteName: "Version Bravo",
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 630,
        alt: "Version Bravo - Combat Veterans to Founders",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Version Bravo - Frontline to Founders",
    description: "Combat Veteran Entrepreneurship Platform - From Alpha-Bet School to Version Bravo Accelerator",
    images: ["/hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code-here',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon and Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        
        {/* Font Preloads */}
        <link 
          rel="preload" 
          href="/fonts/gunplay/gunplay%20rg.otf" 
          as="font" 
          type="font/otf" 
          crossOrigin="anonymous"
        />
        <link 
          rel="preload" 
          href="/fonts/gunplay/gunplay%203d.otf" 
          as="font" 
          type="font/otf" 
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
