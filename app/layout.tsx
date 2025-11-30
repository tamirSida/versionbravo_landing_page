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
  metadataBase: new URL('https://thevetted.vc'),
  title: "The Vetted - Alphabet School | Combat Veteran Entrepreneurship Education",
  description: "The Vetted provides elite entrepreneurship education through Alphabet School for combat veterans. Comprehensive business training, mentorship, and pathway to The Vetted Accelerator program.",
  keywords: [
    "the vetted",
    "alphabet school", 
    "combat veterans",
    "entrepreneurship education",
    "veteran founders",
    "military entrepreneurship",
    "veteran business training",
    "thevetted accelerator",
    "vbv",
    "thevetted.vc"
  ],
  authors: [{ name: "The Vetted" }],
  creator: "The Vetted",
  publisher: "The Vetted",
  openGraph: {
    title: "The Vetted - Alphabet School",
    description: "Elite entrepreneurship education for combat veterans - From Alphabet School to The Vetted Accelerator",
    url: "https://thevetted.vc",
    siteName: "The Vetted",
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 630,
        alt: "The Vetted - Alphabet School for Combat Veterans",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Vetted - Alphabet School",
    description: "Elite entrepreneurship education for combat veterans - From Alphabet School to The Vetted Accelerator",
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
    google: 'jwFpNC478fhLXbjU5t50WNILIPTgFK2FM3XgS8MCqSs',
  },
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { url: '/favicon/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
    ]
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
        {/* Web App Meta */}
        <link rel="manifest" href="/favicon/site.webmanifest" />
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
