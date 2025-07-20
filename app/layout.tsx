// app/layout.tsx - Add page view tracking to your existing layout
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import Navigation from "@/components/navigation";
import MainFooter from "@/components/main-footer/MainFooter";
import { Providers } from "@/components/providers";
import { GoogleTagManager } from "@next/third-parties/google";
import PageViewTracker from "@/components/PageViewTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'FlareSeal - Mini-Split Systems',
  description: 'Premium mini-split systems and HVAC products',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* GTM noscript fallback */}
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        
        <Providers>
          <PageViewTracker /> {/* ADD THIS LINE */}
          <Navigation />
          {children}
          <MainFooter />
        </Providers>
        
        {gtmId && <GoogleTagManager gtmId={gtmId} />}
      </body>
    </html>
  );
}