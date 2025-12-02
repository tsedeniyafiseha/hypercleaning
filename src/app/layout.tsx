import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { satoshi } from "@/styles/fonts";

import TopBanner from "@/components/layout/Banner/TopBanner";
import TopNavbar from "@/components/layout/Navbar/TopNavbar";
import HolyLoader from "holy-loader";
import Providers from "./providers";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default: "Hyper Cleaning Supplies | Professional Cleaning Materials & Supplies",
    template: "%s | Hyper Cleaning Supplies",
  },
  description:
    "Hyper Cleaning Supplies is a modern e‑commerce store for professional cleaning chemicals, bathroom care, kitchen care, floor care, dispensers, gloves, and paper products.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Hyper Cleaning Supplies | Professional Cleaning Materials & Supplies",
    description:
      "Shop professional-grade cleaning materials and supplies: chemicals, bathroom and kitchen care, floor cleaners, dispensers, gloves, and paper products.",
    siteName: "Hyper Cleaning Supplies",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hyper Cleaning Supplies",
    description:
      "Professional cleaning materials and supplies for commercial and residential use.",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={satoshi.className}>
        <HolyLoader color="#868686" />
        <TopBanner />
        <Providers>
          <TopNavbar />
          {children}
        </Providers>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
