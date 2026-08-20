// Central business facts for IFAL Consult. Values come from the design
// handoff and must be used verbatim across the site.

export const SITE = {
  legalName: "Interactive Financial Advisors Limited",
  tradingName: "IFAL Consult",
  shortName: "IFAL",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://intadvisorsltd.com.ng",
  domain: "intadvisorsltd.com.ng",
  email: "info@intadvisorsltd.com.ng",
  phone1: "08033230673", // also WhatsApp
  phone1Intl: "+2348033230673",
  whatsapp: "2348033230673", // wa.me format (leading 0 dropped, 234 prefixed)
  phone2: "09056894669",
  phone2Intl: "+2349056894669",
  address: "10 Adeboye Sowande Street, Okota, Lagos",
  addressParts: {
    street: "10 Adeboye Sowande Street",
    locality: "Okota",
    region: "Lagos",
    country: "NG",
  },
  hours: "Mon–Fri, 9:00–17:00 WAT",
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || "GTM-TMPLR62L",
  description:
    "IFAL Consult (Interactive Financial Advisors Limited) provides accounting, audit, tax management, and business advisory services for growing businesses in Nigeria.",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
] as const;
