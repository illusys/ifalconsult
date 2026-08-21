import type { Metadata, Viewport } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { barlow, plexSans, plexMono } from "@/lib/fonts";
import { SITE } from "@/lib/site";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { OrganizationSchema } from "@/components/StructuredData";
import "./globals.css";
import "@/components/ui.css";

const siteUrl = SITE.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "IFAL Consult — Accounting, Audit & Tax Advisory in Lagos",
    template: "%s · IFAL Consult",
  },
  description: SITE.description,
  applicationName: "IFAL Consult",
  authors: [{ name: SITE.legalName }],
  keywords: [
    "accounting Lagos",
    "audit Nigeria",
    "tax management NRS",
    "business advisory",
    "IFAL Consult",
    "Interactive Financial Advisors Limited",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: siteUrl,
    siteName: "IFAL Consult",
    title: "IFAL Consult — Accounting, Audit & Tax Advisory",
    description: SITE.description,
    images: [{ url: "/images/og-default.png", width: 1000, height: 525, alt: "IFAL — Interactive Financial Advisors Limited" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IFAL Consult — Accounting, Audit & Tax Advisory",
    description: SITE.description,
    images: ["/images/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/icon.png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#202070",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <OrganizationSchema />
        <Analytics />
        {SITE.gtmId ? <GoogleTagManager gtmId={SITE.gtmId} /> : null}
      </body>
    </html>
  );
}
