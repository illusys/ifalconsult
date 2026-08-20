import type { Metadata } from "next";
import { Table } from "@/components/ui/Table";
import { BreadcrumbSchema } from "@/components/StructuredData";
import { FILING_DEADLINES } from "@/data/services";
import { ServicesExplorer } from "./ServicesExplorer";
import "./services.css";

export const metadata: Metadata = {
  title: "Services — Accounting, Audit, Tax & Advisory",
  description:
    "Seven practices, one team: accounting, audit, tax management, accounting software implementation, training, data analysis, and business advisory for growing Nigerian businesses.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
        ]}
      />

      <section className="svc-intro">
        <div className="container">
          <span className="eyebrow">Services</span>
          <h1>Everything a growing business needs from its advisors</h1>
          <p className="svc-intro__lead">
            Engage a single practice or all seven. Most clients start with
            accounting and add tax management once their filing calendar gets
            busy.
          </p>
        </div>
      </section>

      <section className="svc-body">
        <div className="container">
          <ServicesExplorer />
        </div>
      </section>

      <section className="section svc-calendar">
        <div className="container">
          <span className="eyebrow">Filing calendar</span>
          <h2 className="section-h">Key Nigerian deadlines we manage</h2>
          <Table
            caption="Key Nigerian filing deadlines"
            columns={[
              { key: "obligation", header: "Obligation" },
              { key: "authority", header: "Authority" },
              { key: "frequency", header: "Frequency" },
              { key: "due", header: "Due", nowrap: true },
            ]}
            rows={FILING_DEADLINES}
          />
          <p
            style={{
              fontSize: "var(--fs-xs)",
              color: "var(--text-muted)",
              marginTop: "var(--sp-4)",
            }}
          >
            Deadlines are indicative and subject to current FIRS, State IRS, and
            CAC rules. We confirm the exact calendar for your entity during
            onboarding.
          </p>
        </div>
      </section>
    </>
  );
}
