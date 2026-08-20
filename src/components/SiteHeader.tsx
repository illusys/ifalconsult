"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icon";
import "./chrome.css";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-header__logo" aria-label="IFAL Consult — home">
          <Image
            src="/logos/ifal-logo-primary.png"
            alt="IFAL — Interactive Financial Advisors Limited"
            width={274}
            height={160}
            priority
            style={{ height: 38, width: "auto" }}
          />
        </Link>

        <nav className="site-nav" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(pathname, l.href) ? "page" : undefined}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <span className="site-header__cta-desktop">
            <Button variant="ghost" size="sm" href="/login">
              Client login
            </Button>
            <Button
              variant="accent"
              size="sm"
              href="/contact"
              iconRight={<Icon name="arrow-right" size={16} />}
            >
              Book a consultation
            </Button>
          </span>
          <button
            type="button"
            className="site-header__burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "x" : "menu"} size={22} />
          </button>
        </div>
      </div>

      <div id="mobile-nav" className={`mobile-nav${open ? " is-open" : ""}`}>
        <div className="mobile-nav__inner">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="mobile-nav__link"
              aria-current={isActive(pathname, l.href) ? "page" : undefined}
            >
              {l.label}
            </Link>
          ))}
          <div className="mobile-nav__actions">
            <Button variant="secondary" size="lg" fullWidth href="/login">
              Client login
            </Button>
            <Button
              variant="accent"
              size="lg"
              fullWidth
              href="/contact"
              iconRight={<Icon name="arrow-right" size={18} />}
            >
              Book a consultation
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
