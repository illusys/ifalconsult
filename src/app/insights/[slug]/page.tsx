import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icon";
import { ArticleSchema, BreadcrumbSchema } from "@/components/StructuredData";
import { INSIGHTS, getInsight, formatDate } from "@/data/insights";
import "../insights.css";

export function generateStaticParams() {
  return INSIGHTS.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return { title: "Insight not found" };
  return {
    title: insight.title,
    description: insight.excerpt,
    alternates: { canonical: `/insights/${insight.slug}` },
    openGraph: {
      type: "article",
      title: insight.title,
      description: insight.excerpt,
      publishedTime: insight.date,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();

  const more = INSIGHTS.filter((i) => i.slug !== insight.slug).slice(0, 3);

  return (
    <article className="article">
      <ArticleSchema
        title={insight.title}
        description={insight.excerpt}
        slug={insight.slug}
        datePublished={insight.date}
        author={insight.author}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Insights", url: "/insights" },
          { name: insight.title, url: `/insights/${insight.slug}` },
        ]}
      />

      <div className="container">
        <header className="article__head">
          <nav className="article__breadcrumb" aria-label="Breadcrumb">
            <Link href="/insights">Insights</Link> <span aria-hidden="true">/</span>{" "}
            {insight.category}
          </nav>
          <Badge tone="navy">{insight.category}</Badge>
          <h1>{insight.title}</h1>
          <div className="article__meta">
            <span>By {insight.author}</span>
            <span aria-hidden="true">·</span>
            <span>{formatDate(insight.date)}</span>
            <span aria-hidden="true">·</span>
            <span>{insight.readMinutes} min read</span>
          </div>
        </header>

        <div className="article__body">
          {insight.body.map((block, i) => {
            if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
            if (block.type === "p") return <p key={i}>{block.text}</p>;
            if (block.type === "callout")
              return (
                <blockquote key={i} className="article__callout">
                  {block.text}
                </blockquote>
              );
            if (block.type === "ul")
              return (
                <ul key={i}>
                  {block.items.map((it, j) => (
                    <li key={j}>
                      <span className="check">
                        <Icon name="check" size={17} strokeWidth={2.5} />
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>
              );
            return null;
          })}
        </div>

        <div className="article__foot">
          <Button
            variant="accent"
            href="/contact"
            iconRight={<Icon name="arrow-right" size={18} />}
          >
            Talk to an advisor
          </Button>
          <p className="article__disclaimer">
            This article is general guidance for Nigerian businesses and is not a
            substitute for advice on your specific circumstances. Tax rules and
            deadlines change; confirm the current position with IFAL Consult or
            the relevant authority before acting.
          </p>
        </div>

        <section className="ins-more section" style={{ paddingBottom: 0 }}>
          <h2>More insights</h2>
          <div className="ins-grid">
            {more.map((i) => (
              <Card key={i.slug} interactive padding="lg" href={`/insights/${i.slug}`}>
                <div className="ins-card">
                  <span className="ins-card__cat">
                    <Badge tone="navy">{i.category}</Badge>
                  </span>
                  <h3 className="ins-card__title">{i.title}</h3>
                  <p className="ins-card__excerpt">{i.excerpt}</p>
                  <div className="ins-card__meta">
                    <span>{formatDate(i.date)}</span>
                    <Icon name="clock" size={13} />
                    <span>{i.readMinutes} min read</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
