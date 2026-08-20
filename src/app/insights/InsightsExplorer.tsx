"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/Icon";
import { INSIGHTS, CATEGORIES, formatDate } from "@/data/insights";

export function InsightsExplorer() {
  const [active, setActive] = useState<string>("All");
  const list = INSIGHTS.filter(
    (i) => active === "All" || i.category === active,
  );

  return (
    <div>
      <div className="ins-filters" role="group" aria-label="Filter insights by category">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            className="chip"
            aria-pressed={active === c}
            onClick={() => setActive(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <p className="ins-empty">No insights in this category yet.</p>
      ) : (
        <div className="ins-grid">
          {list.map((i) => (
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
      )}
    </div>
  );
}
