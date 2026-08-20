import { SITE } from "@/lib/site";
import { SERVICES } from "@/data/services";

// LocalBusiness / AccountingService JSON-LD (handoff SEO section).
export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "@id": `${SITE.url}/#organization`,
    name: SITE.tradingName,
    legalName: SITE.legalName,
    url: SITE.url,
    email: SITE.email,
    image: `${SITE.url}/images/og-default.png`,
    logo: `${SITE.url}/logos/ifal-logo-primary.png`,
    description: SITE.description,
    telephone: [SITE.phone1Intl, SITE.phone2Intl],
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.addressParts.street,
      addressLocality: SITE.addressParts.locality,
      addressRegion: SITE.addressParts.region,
      addressCountry: SITE.addressParts.country,
    },
    areaServed: { "@type": "Country", name: "Nigeria" },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    makesOffer: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, description: s.body },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.url}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ArticleSchema({
  title,
  description,
  slug,
  datePublished,
  author,
}: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  author: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    author: { "@type": "Organization", name: author },
    publisher: {
      "@type": "Organization",
      name: SITE.tradingName,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/logos/ifal-logo-primary.png`,
      },
    },
    mainEntityOfPage: `${SITE.url}/insights/${slug}`,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
