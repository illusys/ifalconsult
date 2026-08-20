import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { INSIGHTS } from "@/data/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  const staticRoutes = [
    { url: "/", priority: 1.0, changeFrequency: "monthly" as const },
    { url: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/about", priority: 0.7, changeFrequency: "yearly" as const },
    { url: "/insights", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/contact", priority: 0.8, changeFrequency: "yearly" as const },
    { url: "/login", priority: 0.3, changeFrequency: "yearly" as const },
    { url: "/privacy", priority: 0.2, changeFrequency: "yearly" as const },
    { url: "/terms", priority: 0.2, changeFrequency: "yearly" as const },
  ].map((r) => ({ ...r, url: `${base}${r.url}`, lastModified: now }));

  const insightRoutes = INSIGHTS.map((i) => ({
    url: `${base}/insights/${i.slug}`,
    lastModified: new Date(i.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...insightRoutes];
}
