import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icon";
import { BreadcrumbSchema } from "@/components/StructuredData";
import { INSIGHTS, formatDate } from "@/data/insights";
import { InsightsExplorer } from "./InsightsExplorer";
import { NewsletterForm } from "./NewsletterForm";
import "./insights.css";

export const metadata: Metadata = {
  title: "Insights — Financial guidance for Nigerian businesses",
  description:
    "Practical financial insights from IFAL Consult: tax, accounting, compliance, cash flow, and business growth explained in plain language for Nigerian business owners.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  const featured = INSIGHTS.find((i) => i.featured) || INSIGHTS[0];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Insights", url: "/insights" },
        ]}
      />

      <section className="ins-hero">
        <div className="container">
          <span className="eyebrow">Insights</span>
          <h1>Financial insight, in plain language</h1>
          <p className="ins-hero__lead">
            Practical guidance on tax, accounting, and running a financially
            healthy business in Nigeria — written by the IFAL team to help you
            make confident decisions.
          </p>
        </div>
      </section>

      {/* Featured */}
      <section className="section" style={{ paddingTop: "var(--sp-7)" }}>
        <div className="container">
          <Link href={`/insights/${featured.slug}`} aria-label={featured.title}>
            <article className="ins-featured">
              <div className="ins-featured__side">
                <Badge tone="red">Featured · {featured.category}</Badge>
                <h2>{featured.title}</h2>
                <p className="ins-featured__excerpt">{featured.excerpt}</p>
                <div className="ins-featured__meta">
                  <span>{formatDate(featured.date)}</span>
                  <span>·</span>
                  <span>{featured.readMinutes} min read</span>
                </div>
                <span className="btn btn--accent btn--md" style={{ alignSelf: "flex-start" }}>
                  Read article
                  <Icon name="arrow-right" size={18} />
                </span>
              </div>
              <div className="ins-featured__art" aria-hidden="true">
                <Icon name="trending-up" size={64} strokeWidth={1.5} />
              </div>
            </article>
          </Link>
        </div>
      </section>

      {/* All insights */}
      <section className="section" style={{ paddingTop: "var(--sp-4)" }}>
        <div className="container">
          <span className="eyebrow">All insights</span>
          <h2 className="section-h">Browse by topic</h2>
          <InsightsExplorer />
        </div>
      </section>

      {/* Newsletter */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="ins-news">
            <div>
              <h2>Get the IFAL tax bulletin</h2>
              <p>
                Deadlines, rule changes, and practical guidance for Nigerian
                businesses — a few times a quarter, no spam.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
}
