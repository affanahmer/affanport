import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#f4f2ee",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://affanahmer.com"),
  title: "Affan Ahmer | Full-Stack Developer",
  description: "Fresh Computer Science graduate and passionate MERN Stack Developer skilled in MongoDB, Express.js, React, and Node.js.",
  openGraph: {
    title: "Affan Ahmer | Full-Stack Developer",
    description: "Fresh Computer Science graduate and passionate MERN Stack Developer skilled in MongoDB, Express.js, React, and Node.js.",
    url: "https://affanahmer.com",
    siteName: "Affan Ahmer",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

import localFont from "next/font/local";

const interTight = localFont({
  src: "../fonts/Inter_Tight.woff2",
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = localFont({
  src: "../fonts/Instrument_Serif.woff2",
  variable: "--font-instrument",
  display: "swap",
  style: "italic",
});

const jetBrainsMono = localFont({
  src: "../fonts/JetBrains_Mono.woff2",
  variable: "--font-mono",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interTight.variable} ${instrumentSerif.variable} ${jetBrainsMono.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
