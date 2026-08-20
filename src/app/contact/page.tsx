import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { Icon } from "@/components/Icon";
import { BreadcrumbSchema } from "@/components/StructuredData";
import { ContactForm } from "./ContactForm";
import "./contact.css";

export const metadata: Metadata = {
  title: "Book a consultation",
  description:
    "Book a free consultation with IFAL Consult. Tell us about your business and we'll respond within one working day with a proposed scope and fee.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const items: { icon: string; node: React.ReactNode }[] = [
    { icon: "map-pin", node: SITE.address },
    {
      icon: "phone",
      node: (
        <>
          <a href={`tel:${SITE.phone1Intl}`}>{SITE.phone1}</a> (also{" "}
          <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          )
        </>
      ),
    },
    { icon: "phone", node: <a href={`tel:${SITE.phone2Intl}`}>{SITE.phone2}</a> },
    { icon: "mail", node: <a href={`mailto:${SITE.email}`}>{SITE.email}</a> },
    { icon: "clock", node: SITE.hours },
  ];

  return (
    <section className="section contact">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
        ]}
      />
      <div className="container contact__grid">
        <div>
          <span className="eyebrow">Contact</span>
          <h1>Book a consultation</h1>
          <p className="contact__lead">
            Tell us about your business and we&apos;ll come back within one
            working day with a proposed scope and fee.
          </p>
          <div className="contact__list">
            {items.map((it, i) => (
              <div key={i} className="contact__item">
                <span className="contact__item-ic">
                  <Icon name={it.icon} size={18} />
                </span>
                <span>{it.node}</span>
              </div>
            ))}
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
