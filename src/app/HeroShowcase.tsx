"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icon";
import "./hero-showcase.css";

type Service = {
  id: string;
  name: string;
  pain: string;
  headline: string;
  line: string;
  cta: string;
  cardLabel: string;
  cardValue: string;
  cardNote: string;
};

// Copy grounded in current pain points for Nigerian businesses
// (weak records → no credit; ~$236bn MSME funding gap, ~20% loan access;
// 2025 Nigeria Tax Act / NRS e-invoicing; weak internal controls; low
// financial literacy). The value proposition leads; the service follows;
// each call to action is specific to the service on screen.
const SERVICES: Service[] = [
  {
    id: "software",
    name: "Accounting software",
    pain: "Books scattered across spreadsheets, paper, and apps that don't talk.",
    headline: "One system. One source of truth.",
    line: "We select, set up, and tailor your accounting software — e-invoicing ready — so every figure is current and every report is a click away.",
    cta: "Set up my accounting system",
    cardLabel: "Set-up outcome",
    cardValue: "Real-time books",
    cardNote: "NRS e-invoicing ready for 2026.",
  },
  {
    id: "advisory",
    name: "Business advisory",
    pain: "Growth, funding, and restructuring calls made on gut feel.",
    headline: "Decisions backed by numbers.",
    line: "Financial models, budgets, and forecasts that hold up under scrutiny — and that banks and investors actually trust.",
    cta: "Make my numbers investor-ready",
    cardLabel: "MSME funding gap",
    cardValue: "$236bn",
    cardNote: "Bankable numbers open the door.",
  },
  {
    id: "training",
    name: "Training",
    pain: "The business stalls whenever the owner isn't in the room.",
    headline: "A team that runs the numbers.",
    line: "Practical, hands-on finance and systems training, built around the tools and reports your team uses every day.",
    cta: "Upskill my team",
    cardLabel: "Capability",
    cardValue: "Your team",
    cardNote: "Confident with the numbers, not just us.",
  },
  {
    id: "audit",
    name: "Audit",
    pain: "Weak controls, and money leaking out unnoticed until it's too late.",
    headline: "Findings you can act on.",
    line: "Statutory and internal audits that surface what's leaking, strengthen your controls, and produce accounts banks and tenders accept.",
    cta: "Book an audit",
    cardLabel: "SME loan access",
    cardValue: "20.2%",
    cardNote: "Audited accounts help you qualify.",
  },
  {
    id: "tax",
    name: "Tax management",
    pain: "Shifting rules and missed deadlines that turn into penalties.",
    headline: "Every filing on time. Zero penalties.",
    line: "Registration, filings, and planning across VAT, PAYE, and company income tax — and the reliefs you're entitled to under the 2025 reforms.",
    cta: "Fix my tax compliance",
    cardLabel: "Penalties",
    cardValue: "₦0",
    cardNote: "Filed on time; only what you owe.",
  },
];

const DURATION = 6800;

export function HeroShowcase() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);
  const hovering = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  // Hold the SVG animation and rotation until just after first paint so they
  // never compete with the hero's LCP/hydration on load (mobile especially).
  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };
    let t: ReturnType<typeof setTimeout>;
    const start = () => {
      t = setTimeout(() => setReady(true), 400);
    };
    if (w.requestIdleCallback) {
      w.requestIdleCallback(start, { timeout: 1200 });
    } else {
      start();
    }
    return () => clearTimeout(t);
  }, []);

  // Only rotate while the hero is on screen (it starts on screen, but this
  // pauses rotation once scrolled past, saving work).
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || reduced || !inView || !ready) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % SERVICES.length), DURATION);
    return () => clearTimeout(t);
  }, [index, paused, reduced, inView, ready]);

  const active = SERVICES[index];

  return (
    <div
      ref={rootRef}
      className={`showcase hero-rot${paused ? " is-paused" : ""}${inView && ready ? " is-inview" : ""}`}
      onMouseEnter={() => {
        hovering.current = true;
        setPaused(true);
      }}
      onMouseLeave={() => {
        hovering.current = false;
        setPaused(false);
      }}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node) && !hovering.current) {
          setPaused(false);
        }
      }}
    >
      <div className="container hero-rot__grid">
        {/* LEFT — the story leads here, left-to-right */}
        <div className="hero-rot__left">
          <span className="eyebrow">Interactive Financial Advisors Limited</span>
          <h1 className="hero-rot__h1">Critical thinking, innovative solutions.</h1>

          {/* Rotating value proposition — announced to assistive tech. */}
          <div className="showcase__copy hero-rot__story" aria-live="polite">
            <span className="showcase__kicker" key={`k-${active.id}`}>
              {active.name}
            </span>
            <p className="showcase__pain" key={`p-${active.id}`}>
              <span className="showcase__pain-dot" aria-hidden="true" />
              {active.pain}
            </p>
            <h2 className="hero-rot__value" key={`h-${active.id}`}>
              {active.headline}
            </h2>
            <p className="showcase__line" key={`l-${active.id}`}>
              {active.line}
            </p>
            <div className="hero-rot__ctas" key={`c-${active.id}`}>
              <Button
                variant="accent"
                size="lg"
                href="/contact"
                iconRight={<Icon name="arrow-right" size={18} />}
              >
                {active.cta}
              </Button>
              <Button variant="secondary" size="lg" href={`/services#${active.id}`}>
                See how it works
              </Button>
            </div>
          </div>

          {/* Progress tabs across the five services */}
          <div className="hero-rot__controls">
            <div className="showcase__dots" role="tablist" aria-label="IFAL services">
              {SERVICES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  className="showcase__dot"
                  aria-selected={i === index}
                  aria-label={`${s.name}${i === index ? ", showing" : ""}`}
                  onClick={() => setIndex(i)}
                >
                  <span
                    className="showcase__dot-fill"
                    style={{ "--sc-duration": `${DURATION}ms` } as React.CSSProperties}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              className="showcase__pause"
              aria-label={paused ? "Play the service showcase" : "Pause the service showcase"}
              aria-pressed={paused}
              onClick={() => setPaused((p) => !p)}
            >
              {paused ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
              )}
            </button>
          </div>

          {/* Persistent credibility */}
          <div className="hero__stats">
            {[
              { v: "8+", l: "Years advising" },
              { v: "Cross-industry", l: "Professional solutions", text: true },
              { v: "100%", l: "Filings on time" },
            ].map((s) => (
              <div key={s.l}>
                <div className={`hero__stat-v${s.text ? " hero__stat-v--text" : ""}`}>
                  {s.v}
                </div>
                <div className="hero__stat-l">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — the animation, changing in sync with the story */}
        <div className="hero-rot__right">
          <div className="showcase__stage" aria-hidden="true">
            <Scene key={active.id} id={active.id} />
          </div>
          <Link
            href={`/services#${active.id}`}
            className="showcase__card"
            aria-label={`${active.name}: ${active.headline}. See ${active.name} services.`}
          >
            <div className="showcase__card-label" key={`cl-${active.id}`}>
              {active.cardLabel}
            </div>
            <div className="showcase__card-value" key={`cv-${active.id}`}>
              {active.cardValue}
            </div>
            <div className="showcase__card-note" key={`cn-${active.id}`}>
              {active.cardNote}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Scenes — pure SVG, animated via CSS classes in hero-showcase.css.  */
/* ------------------------------------------------------------------ */

function Scene({ id }: { id: string }) {
  switch (id) {
    case "software":
      return <SoftwareScene />;
    case "advisory":
      return <AdvisoryScene />;
    case "training":
      return <TrainingScene />;
    case "audit":
      return <AuditScene />;
    case "tax":
      return <TaxScene />;
    default:
      return null;
  }
}

const VB = "0 0 340 210";
// Literal hex (SVG presentation attributes don't resolve CSS var()).
const NAVY_100 = "#d4d5ee";
const NAVY_200 = "#a9abdd";
const NAVY_700 = "#202070";
const RED_400 = "#ea3141";
const RED_500 = "#e00016";
const GREEN = "#1a7f4b";
const SANS = "var(--font-sans)";
const MONO = "var(--font-mono)";
const svgStyle = { fontFamily: SANS as string };

/* Scene 1 — scattered records gather into one clean ledger. */
function SoftwareScene() {
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid meet" role="img" style={svgStyle}>
      <g className="sc1-a">
        <rect x="34" y="70" width="42" height="54" rx="4" fill={NAVY_200} opacity="0.5" />
      </g>
      <g className="sc1-b">
        <rect x="40" y="86" width="42" height="54" rx="4" fill={NAVY_100} opacity="0.4" />
      </g>
      <g className="sc1-c">
        <rect x="46" y="60" width="42" height="54" rx="4" fill={NAVY_200} opacity="0.6" />
      </g>

      <rect x="150" y="44" width="150" height="122" rx="10" fill="#26267e" />
      <rect x="150" y="44" width="150" height="26" rx="10" fill="#2f2f92" />
      <circle cx="166" cy="57" r="4" fill={RED_500} />
      <rect x="178" y="54" width="60" height="6" rx="3" fill={NAVY_100} opacity="0.7" />

      <rect className="sc1-row sc1-row-1" x="166" y="84" width="118" height="9" rx="3" fill="#3a3aa0" />
      <rect className="sc1-row sc1-row-2" x="166" y="102" width="118" height="9" rx="3" fill="#3a3aa0" />
      <rect className="sc1-row sc1-row-3" x="166" y="120" width="118" height="9" rx="3" fill="#3a3aa0" />

      <g className="sc1-tick">
        <circle cx="284" cy="150" r="15" fill={GREEN} />
        <path d="M277 150 l5 5 l9 -10" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <text x="166" y="153" style={{ fontFamily: MONO }} fontSize="12" fill="#fff" opacity="0.9">
        ₦ synced
      </text>
    </svg>
  );
}

/* Scene 2 — history + rising forecast, projection cone, investor-ready stamp. */
function AdvisoryScene() {
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid meet" role="img" style={svgStyle}>
      <line x1="40" y1="30" x2="40" y2="170" stroke="#5255b3" strokeWidth="1.5" opacity="0.6" />
      <line x1="40" y1="170" x2="308" y2="170" stroke="#5255b3" strokeWidth="1.5" opacity="0.6" />

      <g fill="#3a3aa0">
        <rect className="sc2-bar sc2-bar-1" x="60" y="128" width="16" height="42" rx="2" />
        <rect className="sc2-bar sc2-bar-2" x="92" y="112" width="16" height="58" rx="2" />
        <rect className="sc2-bar sc2-bar-3" x="124" y="120" width="16" height="50" rx="2" />
        <rect className="sc2-bar sc2-bar-4" x="156" y="96" width="16" height="74" rx="2" />
      </g>

      <polygon className="sc2-cone" points="180,92 300,44 300,96 180,92" fill={RED_400} />

      <polyline
        className="sc2-hist"
        points="52,140 84,124 116,130 172,104"
        fill="none"
        stroke={NAVY_100}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        className="sc2-fore"
        points="172,104 216,86 260,64 300,46"
        fill="none"
        stroke={RED_500}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="300" cy="46" r="4.5" fill={RED_500} />

      <g className="sc2-stamp">
        <rect x="192" y="120" width="122" height="30" rx="15" fill="#fff" />
        <circle cx="210" cy="135" r="8" fill={GREEN} />
        <path d="M206 135 l3 3 l6 -6" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="224" y="139" fontSize="11" fontWeight="600" fill={NAVY_700}>
          Investor-ready
        </text>
      </g>
    </svg>
  );
}

/* Scene 3 — team skill meters fill, a report completes. */
function TrainingScene() {
  const people = [
    { x: 44, node: "sc3-node-1", fill: "sc3-fill-1" },
    { x: 120, node: "sc3-node-2", fill: "sc3-fill-2" },
    { x: 196, node: "sc3-node-3", fill: "sc3-fill-3" },
  ];
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid meet" role="img" style={svgStyle}>
      {people.map((p, i) => (
        <g key={i}>
          <g className={`sc3-node ${p.node}`} style={{ transformOrigin: `${p.x + 24}px 66px` }}>
            <circle cx={p.x + 24} cy="66" r="15" fill="#3a3aa0" />
            <circle cx={p.x + 24} cy="61" r="6" fill="#fff" opacity="0.9" />
            <path d={`M${p.x + 12} 78 a12 10 0 0 1 24 0 z`} fill="#fff" opacity="0.9" />
          </g>
          <rect x={p.x} y="100" width="48" height="8" rx="4" fill="#2f2f92" />
          <rect
            className={`sc3-fill ${p.fill}`}
            x={p.x}
            y="100"
            width="48"
            height="8"
            rx="4"
            fill={GREEN}
            style={{ transformBox: "fill-box" }}
          />
        </g>
      ))}

      <rect x="256" y="52" width="60" height="76" rx="8" fill="#26267e" />
      <rect x="268" y="66" width="36" height="6" rx="3" fill="#3a3aa0" />
      <rect x="268" y="80" width="36" height="6" rx="3" fill="#3a3aa0" />
      <rect x="268" y="94" width="24" height="6" rx="3" fill="#3a3aa0" />
      <path
        className="sc3-check"
        d="M270 112 l6 6 l12 -14"
        fill="none"
        stroke={GREEN}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text x="44" y="140" fontSize="11" fontWeight="600" fill={NAVY_100}>
        Skills building across the team
      </text>
    </svg>
  );
}

/* Scene 4 — audit scan sweeps rows, flags an anomaly, then seals. */
function AuditScene() {
  const rows = [58, 82, 106, 130];
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid meet" role="img" style={svgStyle}>
      <rect x="34" y="40" width="210" height="132" rx="10" fill="#26267e" />
      {rows.map((y, i) => (
        <g key={i}>
          <rect x="50" y={y} width="120" height="8" rx="4" fill="#3a3aa0" />
          <rect x="184" y={y} width="44" height="8" rx="4" fill="#33338f" />
        </g>
      ))}

      <rect className="sc4-scan" x="34" y="40" width="210" height="14" rx="4" fill={NAVY_100} opacity="0.18" />

      <g className="sc4-flag">
        <rect x="46" y="102" width="186" height="16" rx="5" fill="none" stroke={RED_500} strokeWidth="2" />
        <circle cx="238" cy="110" r="8" fill={RED_500} />
        <rect x="237.2" y="105" width="1.6" height="6" rx="0.8" fill="#fff" />
        <circle cx="238" cy="114" r="1" fill="#fff" />
      </g>
      <g className="sc4-resolve">
        <circle cx="238" cy="110" r="8" fill={GREEN} />
        <path d="M234 110 l3 3 l6 -6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      <g className="sc4-seal" style={{ transformOrigin: "286px 150px" }}>
        <circle cx="286" cy="150" r="26" fill="#fff" />
        <path
          d="M286 130 l16 6 v13 c0 12 -10 18 -16 21 c-6 -3 -16 -9 -16 -21 v-13 z"
          fill={NAVY_700}
        />
        <path d="M279 150 l5 5 l9 -11" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

/* Scene 5 — filings ticked on time; deadline ring completes; zero penalties. */
function TaxScene() {
  const rows = [
    { label: "VAT", y: 46, cls: "sc5-tick-1" },
    { label: "PAYE", y: 86, cls: "sc5-tick-2" },
    { label: "CIT", y: 126, cls: "sc5-tick-3" },
  ];
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid meet" role="img" style={svgStyle}>
      {rows.map((r) => (
        <g key={r.label}>
          <rect x="34" y={r.y} width="190" height="30" rx="8" fill="#26267e" />
          <text x="50" y={r.y + 20} style={{ fontFamily: MONO }} fontSize="13" fill="#fff">
            {r.label}
          </text>
          <text x="104" y={r.y + 20} fontSize="11" fill={NAVY_200}>
            filed
          </text>
          <g className={`sc5-tick ${r.cls}`} style={{ transformOrigin: `205px ${r.y + 15}px` }}>
            <circle cx="205" cy={r.y + 15} r="11" fill={GREEN} />
            <path
              d={`M199 ${r.y + 15} l4 4 l8 -9`}
              fill="none"
              stroke="#fff"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      ))}

      <g transform="translate(284,101)">
        <circle r="30" fill="none" stroke="#2f2f92" strokeWidth="7" />
        <circle
          className="sc5-ring"
          r="24"
          fill="none"
          stroke={GREEN}
          strokeWidth="7"
          strokeLinecap="round"
          transform="rotate(-90)"
        />
        <text x="0" y="5" textAnchor="middle" style={{ fontFamily: MONO }} fontSize="14" fontWeight="600" fill="#fff">
          ₦0
        </text>
      </g>
      <g className="sc5-seal" style={{ transformOrigin: "284px 101px" }}>
        <text x="284" y="150" textAnchor="middle" fontSize="10" fontWeight="600" fill={NAVY_100}>
          no penalties
        </text>
      </g>
    </svg>
  );
}
