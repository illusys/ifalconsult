"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/Icon";
import { SERVICES } from "@/data/services";

export function ServicesExplorer() {
  const [active, setActive] = useState(SERVICES[0].id);

  // Deep-link support: open the tab named in the URL hash (e.g. /services#tax).
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && SERVICES.some((s) => s.id === hash)) {
      setActive(hash);
    }
    const onHash = () => {
      const h = window.location.hash.replace("#", "");
      if (h && SERVICES.some((s) => s.id === h)) setActive(h);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  function select(id: string) {
    setActive(id);
    // Update the hash without jumping the scroll position.
    history.replaceState(null, "", `#${id}`);
  }

  return (
    <div>
      <div className="tabs" role="tablist" aria-label="Services">
        {SERVICES.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            id={`tab-${s.id}`}
            className="tab"
            aria-selected={active === s.id}
            aria-controls={`panel-${s.id}`}
            tabIndex={active === s.id ? 0 : -1}
            onClick={() => select(s.id)}
          >
            {s.shortLabel}
          </button>
        ))}
      </div>

      {SERVICES.map((s) => (
        <section
          key={s.id}
          id={`panel-${s.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${s.id}`}
          hidden={active !== s.id}
        >
          {/* Anchor target for deep links from the footer/home. */}
          <span id={s.id} style={{ position: "relative", top: "-90px" }} aria-hidden="true" />
          <div className="svc-panel-grid">
            <div>
              <span className="icon-chip">
                <Icon name={s.icon} size={22} />
              </span>
              <h2 className="svc-panel__title">{s.title}</h2>
              <p className="svc-panel__desc">{s.body}</p>
              <h3 className="svc-panel__sub">What you receive</h3>
              <ul className="svc-deliverables">
                {s.deliverables.map((d) => (
                  <li key={d}>
                    <span className="check">
                      <Icon name="check" size={17} strokeWidth={2.5} />
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <Card accent padding="lg">
              <Badge tone="navy">Engagement</Badge>
              <div className="svc-fee">{s.fee}</div>
              <p className="svc-fee-caveat">
                Fees depend on transaction volume and entity count. We quote
                after a short scoping call.
              </p>
              <Button variant="primary" fullWidth href="/contact">
                Request a quote
              </Button>
            </Card>
          </div>
        </section>
      ))}
    </div>
  );
}
