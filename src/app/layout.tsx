import type { Metadata } from "next";
import Script from "next/script";
import { Bricolage_Grotesque, Instrument_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

// Display face for headings; body face for everything else. globals.css maps
// these onto --font-display / --font-sans, so components keep using
// font-sans and the heading rule rather than referencing either directly.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ThreadExtract | Korrali",
  description: "Turn Slack threads into Notion docs automatically with a 🧠 reaction.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${bricolage.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        {/* Cloudflare Web Analytics — cookieless page-load counts, aggregated on
            korrali.com/visitors.html. The token is a public site identifier, not
            a secret; UAT hits are excluded by hostname when the stats are read. */}
        <Script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token":"ec89fdaeed684addb6a98bd5e63fd012"}'
        />
      </body>
    </html>
  );
}
