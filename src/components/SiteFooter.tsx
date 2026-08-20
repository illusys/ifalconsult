import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/site";
import { SERVICES } from "@/data/services";
import "./chrome.css";

const companyLinks = [
  { label: "About IFAL", href: "/about" },
  { label: "Our team", href: "/about#team" },
  { label: "Careers", href: "/about#careers" },
  { label: "Insights", href: "/insights" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div>
          <Image
            src="/logos/ifal-logo-white.png"
            alt="IFAL — Interactive Financial Advisors Limited"
            width={469}
            height={176}
            style={{ height: 44, width: "auto" }}
          />
          <p className="site-footer__desc">
            Interactive Financial Advisors Limited — accounting, audit, tax, and
            advisory for businesses that want to grow with confidence.
          </p>
        </div>

        <div>
          <div className="site-footer__col-h">Services</div>
          <ul className="site-footer__list">
            {SERVICES.map((s) => (
              <li key={s.id}>
                <Link href={`/services#${s.id}`}>{s.footerLabel}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="site-footer__col-h">Company</div>
          <ul className="site-footer__list">
            {companyLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="site-footer__col-h">Contact</div>
          <ul className="site-footer__list">
            <li>
              <span>{SITE.address}</span>
            </li>
            <li>
              <a href={`tel:${SITE.phone1Intl}`}>{SITE.phone1}</a>{" "}
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                (WhatsApp)
              </a>
            </li>
            <li>
              <a href={`tel:${SITE.phone2Intl}`}>{SITE.phone2}</a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="site-footer__bar">
        <span>
          © {new Date().getFullYear()} {SITE.legalName} · {SITE.domain}
        </span>
        <span className="site-footer__legal">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </span>
      </div>
    </footer>
  );
}
