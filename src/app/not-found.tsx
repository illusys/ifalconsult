import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icon";

export default function NotFound() {
  return (
    <section className="section" style={{ background: "var(--surface-page)", minHeight: "60vh", display: "flex", alignItems: "center" }}>
      <div className="container" style={{ textAlign: "center", maxWidth: 560 }}>
        <span className="eyebrow">Error 404</span>
        <h1 style={{ fontSize: "var(--fs-3xl)", fontWeight: "var(--fw-heavy)", color: "var(--ifal-navy-700)", letterSpacing: "var(--ls-tighter)", margin: "var(--sp-3) 0 var(--sp-4)" }}>
          Page not found
        </h1>
        <p style={{ fontSize: "var(--fs-md)", color: "var(--text-body)", marginBottom: "var(--sp-6)" }}>
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s
          get you back on track.
        </p>
        <div style={{ display: "flex", gap: "var(--sp-3)", justifyContent: "center", flexWrap: "wrap" }}>
          <Button variant="accent" href="/" iconRight={<Icon name="arrow-right" size={18} />}>
            Back to home
          </Button>
          <Button variant="secondary" href="/contact">
            Contact us
          </Button>
        </div>
      </div>
    </section>
  );
}
