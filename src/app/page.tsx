import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/Icon";
import { SERVICES } from "@/data/services";
import "./home.css";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero__grid">
          <div>
            <span className="eyebrow">Interactive Financial Advisors Limited</span>
            <h1>Financial clarity for growing businesses.</h1>
            <p className="hero__lead">
              IFAL handles your accounting, audit, and tax so you can focus on
              running the business. We work with owners who want their numbers
              right and their obligations met on time.
            </p>
            <div className="hero__ctas">
              <Button
                variant="accent"
                size="lg"
                href="/contact"
                iconRight={<Icon name="arrow-right" size={18} />}
              >
                Book a consultation
              </Button>
              <Button variant="secondary" size="lg" href="/services">
                Explore services
              </Button>
            </div>
            <div className="hero__stats">
              {[
                ["18+", "Years advising"],
                ["340", "Businesses served"],
                ["100%", "Filings on time"],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="hero__stat-v">{v}</div>
                  <div className="hero__stat-l">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance-status panel — stands in for brand photography */}
          <div className="hero-panel">
            <div className="hero-panel__box">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span className="eyebrow eyebrow--light">Compliance status</span>
                <Badge tone="success" solid dot>
                  All current
                </Badge>
              </div>
              {(
                [
                  ["VAT — March", "Filed", "success"],
                  ["PAYE — Q1", "Filed", "success"],
                  ["Annual return", "In review", "warning"],
                ] as const
              ).map(([k, v, tone]) => (
                <div key={k} className="hero-panel__row">
                  <span className="hero-panel__row-label">
                    <Icon name="file-text" size={16} />
                    {k}
                  </span>
                  <Badge tone={tone}>{v}</Badge>
                </div>
              ))}
            </div>
            <Card accent elevation="lg" padding="md" className="hero-panel__card">
              <div className="hero-panel__card-l">Tax saved this year</div>
              <div className="hero-panel__card-v">₦ 12,480,000</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="section section--sunken">
        <div className="container">
          <span className="eyebrow">What we do</span>
          <h2 className="section-h">Seven practices, one team</h2>
          <div className="services-grid">
            {SERVICES.map((s) => (
              <Card key={s.id} interactive padding="lg" href={`/services#${s.id}`}>
                <span className="icon-chip">
                  <Icon name={s.icon} size={22} />
                </span>
                <h3 className="service-card__title">{s.title}</h3>
                <p className="service-card__body">{s.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section section--navy">
        <div className="container">
          <div className="testimonial">
            <span style={{ color: "var(--ifal-red-400)", display: "inline-flex" }}>
              <Icon name="quote" size={34} />
            </span>
            <p className="testimonial__quote">
              IFAL restructured our reporting in one quarter. For the first time
              we could see margin by product line — and we made a much better
              call on pricing because of it.
            </p>
            <div className="testimonial__by">
              <strong>Chidi Okafor</strong> · Managing Director, Lekki Foods Ltd
            </div>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="section" style={{ paddingBlock: "var(--sp-9)" }}>
        <div className="container">
          <div className="cta-band">
            <div>
              <h2>Ready to get your numbers in order?</h2>
              <p>Book a 30-minute consultation. No charge, no obligation.</p>
            </div>
            <Button
              variant="accent"
              size="lg"
              href="/contact"
              iconRight={<Icon name="arrow-right" size={18} />}
            >
              Book a consultation
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
