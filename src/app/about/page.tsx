import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/Icon";
import { BreadcrumbSchema } from "@/components/StructuredData";
import { SERVICES } from "@/data/services";
import "./about.css";

export const metadata: Metadata = {
  title: "About IFAL Consult",
  description:
    "IFAL Consult (Interactive Financial Advisors Limited) is a Lagos-based financial advisory firm offering accounting, audit, tax, software, training, data analysis, and business advisory to growing businesses.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    icon: "target",
    h: "Precision",
    b: "Financial work leaves no room for approximation. We reconcile to the last figure and file to the exact deadline, because that is what keeps you compliant and confident.",
  },
  {
    icon: "shield-check",
    h: "Trust",
    b: "We hold sensitive information and act in your interest. Independence, confidentiality, and professional standards guide every engagement we take on.",
  },
  {
    icon: "book-open",
    h: "Clarity",
    b: "Numbers only help if you understand them. We explain what your accounts and obligations mean in plain terms, so you can make decisions with a clear view.",
  },
];

const STEPS = [
  { h: "Scoping call", b: "We learn how your business runs, what you need, and where the pressure points are — no charge, no obligation." },
  { h: "Proposal", b: "You receive a written scope and fee within one working day, so you know exactly what we'll do and what it costs." },
  { h: "Onboarding", b: "We gather records, set up systems, and map your filing calendar so nothing is missed from day one." },
  { h: "Ongoing work", b: "We keep your books current, file on time, and bring you findings and decisions — not just paperwork." },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ]}
      />

      <section className="about-hero">
        <div className="container">
          <span className="eyebrow">About IFAL Consult</span>
          <h1>The firm your accountant would recommend</h1>
          <p className="about-hero__lead">
            IFAL Consult is the trading name of Interactive Financial Advisors
            Limited — a Lagos-based advisory firm helping businesses keep their
            finances accurate, their obligations met, and their decisions
            well-informed.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="eyebrow">Who we are</span>
          <h2 className="section-h">Financial advisors for businesses that want to grow with confidence</h2>
          <div className="prose">
            <p>
              We work with owners and finance teams — from sole proprietors to
              limited companies — who need their compliance handled correctly
              and their financial decisions made on solid ground. Whether you
              are registering for tax for the first time or restructuring for
              your next stage of growth, we bring the same standard of care.
            </p>
            <p>
              Our practice spans the full financial function: keeping your books
              accurate, auditing them to standard, managing your tax across VAT,
              PAYE, and company income tax, implementing the accounting systems
              you run on, training your team, turning your data into reporting
              you can act on, and advising you when the big decisions come. One
              team, seven capabilities, working together so nothing falls
              between the gaps.
            </p>
            <p>
              We keep you compliant with the Nigeria Revenue Service (NRS), the
              State Internal Revenue Services, and CAC, and we translate what
              that compliance means for
              your business — not as a box-ticking exercise, but as the
              foundation for decisions you can trust.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--sunken">
        <div className="container">
          <span className="eyebrow">What we stand for</span>
          <h2 className="section-h">The principles behind every engagement</h2>
          <div className="about-values">
            {VALUES.map((v) => (
              <Card key={v.h} padding="lg">
                <span className="icon-chip">
                  <Icon name={v.icon} size={22} />
                </span>
                <h3 className="value-card__h">{v.h}</h3>
                <p className="value-card__b">{v.b}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="eyebrow">What we do</span>
          <h2 className="section-h">One team, seven capabilities</h2>
          <div className="about-svc-grid">
            {SERVICES.map((s) => (
              <div key={s.id} className="about-svc">
                <span className="about-svc__ic">
                  <Icon name={s.icon} size={20} />
                </span>
                <div>
                  <div className="about-svc__t">{s.title}</div>
                  <div className="about-svc__b">{s.body}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "var(--sp-6)" }}>
            <Button variant="secondary" href="/services" iconRight={<Icon name="arrow-right" size={18} />}>
              See services in detail
            </Button>
          </div>
        </div>
      </section>

      <section className="section section--sunken">
        <div className="container">
          <span className="eyebrow">How we work</span>
          <h2 className="section-h">From first call to ongoing partner</h2>
          <div className="about-steps">
            {STEPS.map((s, i) => (
              <div key={s.h} className="step">
                <div className="step__n">0{i + 1}</div>
                <div className="step__h">{s.h}</div>
                <div className="step__b">{s.b}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section" id="team">
        <div className="container">
          <span className="eyebrow">Our team</span>
          <h2 className="section-h">Qualified professionals, close to your business</h2>
          <div className="prose">
            <p>
              IFAL brings together accountants, auditors, and tax specialists
              with experience across manufacturing, trade, services, and the
              non-profit sector. Every client works with a named lead who knows
              their business, backed by the full depth of the practice when an
              engagement calls for it.
            </p>
            <p>
              We hold ourselves to professional standards on independence,
              confidentiality, and continuing education — so the advice you
              receive is current, considered, and genuinely in your interest.
            </p>
          </div>
        </div>
      </section>

      {/* Careers */}
      <section className="section section--sunken" id="careers">
        <div className="container">
          <span className="eyebrow">Careers</span>
          <h2 className="section-h">Build your career at IFAL</h2>
          <div className="prose">
            <p>
              We are always glad to hear from accountants, auditors, and tax
              professionals who share our standard of care. If you would like to
              be considered for current or future openings, send your CV and a
              short note to{" "}
              <a href="mailto:info@intadvisorsltd.com.ng">
                info@intadvisorsltd.com.ng
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ paddingBlock: "var(--sp-9)" }}>
        <div className="container">
          <div className="cta-band">
            <div>
              <h2>Let&apos;s talk about your business</h2>
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
