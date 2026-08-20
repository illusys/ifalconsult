import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/Icon";
import { SERVICES } from "@/data/services";
import { HeroShowcase } from "./HeroShowcase";
import "./home.css";

export default function HomePage() {
  return (
    <>
      {/* Hero — a single rotating banner: the story leads on the left, the
          animation changes in sync on the right, each CTA specific to the
          service on screen. */}
      <section className="hero">
        <HeroShowcase />
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
