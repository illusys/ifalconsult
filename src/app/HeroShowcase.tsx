"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
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

// Order and headings requested by the client: the big header names the
// service on each slide. Copy is grounded in current pain points for Nigerian
// businesses (weak records → no credit; ~$236bn MSME funding gap, ~20% loan
// access; 2025 tax reform / NRS e-invoicing; weak internal controls).
const SERVICES: Service[] = [
  {
    id: "software",
    name: "Accounting Software",
    pain: "Books scattered across spreadsheets, paper, and apps that don't talk.",
    headline: "Centralized Processing System.",
    line: "Cloud-based, real-time accounting software — selected, set up, and tailored to your business, so every figure is current and every report is a click away.",
    cta: "Set up my accounting system",
    cardLabel: "Set-up outcome",
    cardValue: "Real-time books",
    cardNote: "NRS e-invoicing ready for 2026.",
  },
  {
    id: "training",
    name: "Training",
    pain: "The business stalls whenever the owner isn't in the room.",
    headline: "A team that runs the numbers.",
    line: "Practical, hands-on finance and systems training, built around the job expectations, tools, and reports your team uses every day.",
    cta: "Upskill my team",
    cardLabel: "Capability",
    cardValue: "Your team",
    cardNote: "Confident with the numbers, not just us.",
  },
  {
    id: "tax",
    name: "Tax Management",
    pain: "Shifting rules and missed deadlines that turn into penalties.",
    headline: "Every filing on time. Zero penalties.",
    line: "Registration, filings, and planning across VAT, PAYE, and company income tax — and the reliefs you're entitled to under the 2025 reforms.",
    cta: "Fix my tax compliance",
    cardLabel: "Penalties",
    cardValue: "₦0",
    cardNote: "Filed on time; only what you owe.",
  },
  {
    id: "advisory",
    name: "Business Advisory",
    pain: "Growth, funding, and restructuring calls made on gut feel.",
    headline: "Decisions backed by numbers.",
    line: "Financial models, budgets, and forecasts that hold up under scrutiny — and that banks and investors actually trust.",
    cta: "Make my numbers investor-ready",
    cardLabel: "MSME funding gap",
    cardValue: "$236bn",
    cardNote: "Bankable numbers open the door.",
  },
  {
    id: "audit",
    name: "Audit",
    pain: "Weak controls, and money leaking out unnoticed until it's too late.",
    headline: "Findings you can act on.",
    line: "Statutory, internal, and specialist audits that surface what's leaking, strengthen your controls, and produce accounts banks and tenders accept.",
    cta: "Book an audit",
    cardLabel: "SME loan access",
    cardValue: "20.2%",
    cardNote: "Audited accounts help you qualify.",
  },
];

const DURATION = 7000;

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

  // Hold the SVG animation and rotation until just after first paint.
  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };
    let t: ReturnType<typeof setTimeout>;
    const start = () => {
      t = setTimeout(() => setReady(true), 400);
    };
    if (w.requestIdleCallback) w.requestIdleCallback(start, { timeout: 1200 });
    else start();
    return () => clearTimeout(t);
  }, []);

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
        {/* LEFT — the story leads here; the header names the service. */}
        <div className="hero-rot__left">
          <span className="eyebrow">Interactive Financial Advisors Limited</span>

          <div className="showcase__copy hero-rot__story" aria-live="polite">
            <h1 className="hero-rot__h1" key={`n-${active.id}`}>
              {active.name}
            </h1>
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

        {/* RIGHT — a realistic, colourful app screen for each service. */}
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

/* ================================================================== */
/* Scenes — realistic, colourful mini-app screens. Pure SVG + CSS.    */
/* ================================================================== */

const VB = "0 0 340 210";
const SANS = "var(--font-sans)";
const MONO = "var(--font-mono)";
const s = { fontFamily: SANS as string };

// Palette (literal hex — SVG presentation attrs don't resolve CSS vars).
const NAVY = "#202070";
const NAVY6 = "#292a80";
const NAVY5 = "#33368f";
const NAVY4 = "#5255b3";
const NAVY3 = "#7d80cb";
const NAVY50 = "#ecedf7";
const INK = "#202070";
const GRAY7 = "#383c4d";
const GRAY5 = "#6b7186";
const GRAY2 = "#dfe2ec";
const GRAY1 = "#eef0f6";
const GRAY05 = "#f6f7fb";
const GREEN = "#1a7f4b";
const GREEN4 = "#27a567";
const GREEN50 = "#e6f4ec";
const GOLD = "#e0a82e";
const GOLD50 = "#fbf1dc";
const TEAL = "#0ea5a5";
const TEAL50 = "#e2f6f5";
const RED = "#e00016";
const RED50 = "#fde8ea";
const WHITE = "#fff";
const BORDER = "#e6e8f2";

function Win({ title }: { title: string }) {
  return (
    <g>
      <rect x="14" y="12" width="312" height="186" rx="14" fill={WHITE} stroke={BORDER} />
      <circle cx="32" cy="30" r="3.5" fill={RED} />
      <circle cx="45" cy="30" r="3.5" fill={GOLD} />
      <circle cx="58" cy="30" r="3.5" fill={GREEN} />
      <text x="74" y="34" fontSize="10" fontWeight="600" fill={GRAY5}>
        {title}
      </text>
      <line x1="14" y1="44" x2="326" y2="44" stroke={GRAY1} />
    </g>
  );
}

function Scene({ id }: { id: string }) {
  switch (id) {
    case "software":
      return <SoftwareScene />;
    case "training":
      return <TrainingScene />;
    case "tax":
      return <TaxScene />;
    case "advisory":
      return <AdvisoryScene />;
    case "audit":
      return <AuditScene />;
    default:
      return null;
  }
}

/* Accounting Software — a live finance dashboard. */
function SoftwareScene() {
  const kpis = [
    { x: 26, bg: NAVY50, label: "Revenue", val: "₦4.8m", up: true, c: GREEN },
    { x: 124, bg: GOLD50, label: "Expenses", val: "₦3.1m", up: false, c: GOLD },
    { x: 222, bg: GREEN50, label: "Cash", val: "₦1.7m", up: true, c: GREEN4 },
  ];
  const bars = [
    { h: 26, c: NAVY4 }, { h: 40, c: GREEN4 }, { h: 32, c: TEAL },
    { h: 52, c: NAVY4 }, { h: 44, c: GREEN4 }, { h: 60, c: TEAL },
    { h: 48, c: GREEN },
  ];
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid meet" role="img" style={s}>
      <Win title="Ledger · Overview" />
      {/* synced pill */}
      <g className="a-pop" style={{ animationDelay: "1.4s" }}>
        <rect x="250" y="23" width="62" height="14" rx="7" fill={GREEN50} />
        <circle cx="261" cy="30" r="3" fill={GREEN} />
        <text x="269" y="33.5" fontSize="8.5" fontWeight="600" fill={GREEN}>Synced</text>
      </g>
      {/* KPI cards */}
      {kpis.map((k, i) => (
        <g key={k.label} className="a-in" style={{ animationDelay: `${i * 0.12}s` }}>
          <rect x={k.x} y="54" width={i === 2 ? 88 : 90} height="46" rx="8" fill={k.bg} />
          <text x={k.x + 12} y="72" fontSize="8.5" fill={GRAY5}>{k.label}</text>
          <text x={k.x + 12} y="91" fontSize="15" fontWeight="700" fill={INK} style={{ fontFamily: MONO }}>{k.val}</text>
          <path
            d={k.up ? `M${k.x + 60} 90 l6 -7 l5 4 l8 -9` : `M${k.x + 60} 82 l6 7 l5 -4 l8 9`}
            fill="none" stroke={k.c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          />
        </g>
      ))}
      {/* legend */}
      <g style={{ fontFamily: SANS }}>
        <circle cx="30" cy="116" r="3" fill={GREEN4} /><text x="37" y="119" fontSize="8" fill={GRAY5}>Income</text>
        <circle cx="78" cy="116" r="3" fill={NAVY4} /><text x="85" y="119" fontSize="8" fill={GRAY5}>Outflow</text>
      </g>
      {/* bar chart */}
      {bars.map((b, i) => (
        <rect
          key={i}
          className="a-grow"
          style={{ animationDelay: `${0.3 + i * 0.08}s` }}
          x={30 + i * 40}
          y={188 - b.h}
          width="24"
          height={b.h}
          rx="3"
          fill={b.c}
        />
      ))}
      <line x1="26" y1="188" x2="314" y2="188" stroke={GRAY2} />
    </svg>
  );
}

/* Training — team skills climbing. */
function TrainingScene() {
  const rows = [
    { y: 56, avatar: NAVY5, pct: 92, w: 138 },
    { y: 100, avatar: TEAL, pct: 78, w: 117 },
    { y: 144, avatar: GOLD, pct: 64, w: 96 },
  ];
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid meet" role="img" style={s}>
      <Win title="Team training" />
      {rows.map((r, i) => (
        <g key={i}>
          <g className="a-in" style={{ animationDelay: `${i * 0.12}s` }}>
            <circle cx="40" cy={r.y + 16} r="14" fill={r.avatar} />
            <circle cx="40" cy={r.y + 11} r="5.5" fill={WHITE} opacity="0.95" />
            <path d={`M28 ${r.y + 28} a12 9 0 0 1 24 0 z`} fill={WHITE} opacity="0.95" />
          </g>
          <rect x="64" y={r.y + 4} width="86" height="9" rx="4.5" fill={GRAY1} />
          <rect x="64" y={r.y + 20} width="188" height="9" rx="4.5" fill={GRAY1} />
          <rect
            className="a-growx"
            style={{ animationDelay: `${0.35 + i * 0.22}s` }}
            x="64" y={r.y + 20} width={r.w} height="9" rx="4.5"
            fill={r.pct >= 90 ? GREEN : r.pct >= 75 ? GREEN4 : GOLD}
          />
          <text x="262" y={r.y + 28} fontSize="11" fontWeight="700" fill={INK} style={{ fontFamily: MONO }}>{r.pct}%</text>
        </g>
      ))}
      {/* certificate badge */}
      <g className="a-pop" style={{ animationDelay: "1.5s" }}>
        <circle cx="296" cy="60" r="15" fill={GOLD} />
        <path d="M296 52 l2.2 4.6 l5 .7 l-3.6 3.5 .9 5 -4.5 -2.4 -4.5 2.4 .9 -5 -3.6 -3.5 5 -.7 z" fill={WHITE} />
        <path d="M290 74 l6 4 l6 -4 v10 l-6 -3 -6 3 z" fill={GOLD} />
      </g>
    </svg>
  );
}

/* Tax Management — filing tracker + deadline ring. */
function TaxScene() {
  const rows = [
    { y: 54, label: "VAT", status: "Filed", tone: GREEN, bg: GREEN50, d: "0.6s" },
    { y: 92, label: "PAYE", status: "Filed", tone: GREEN, bg: GREEN50, d: "1s" },
    { y: 130, label: "CIT", status: "Scheduled", tone: GOLD, bg: GOLD50, d: "1.4s" },
  ];
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid meet" role="img" style={s}>
      <Win title="Filing status" />
      {rows.map((r) => (
        <g key={r.label}>
          <rect x="26" y={r.y} width="176" height="30" rx="8" fill={GRAY05} stroke={GRAY1} />
          <text x="40" y={r.y + 20} fontSize="13" fontWeight="600" fill={INK} style={{ fontFamily: MONO }}>{r.label}</text>
          <rect x="120" y={r.y + 7} width="70" height="16" rx="8" fill={r.bg} />
          <text x="132" y={r.y + 18} fontSize="9.5" fontWeight="600" fill={r.tone}>{r.status}</text>
          <g className="a-pop" style={{ animationDelay: r.d }}>
            <circle cx="126" cy={r.y + 15} r="6" fill={r.tone} />
            <path d={`M123 ${r.y + 15} l2 2 l4 -4`} fill="none" stroke={WHITE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>
      ))}
      {/* deadline ring */}
      <g transform="translate(272,108)">
        <circle r="30" fill="none" stroke={GRAY1} strokeWidth="8" />
        <circle
          className="a-ring"
          style={{ ["--len" as string]: 189 } as React.CSSProperties}
          r="30" fill="none" stroke={GREEN} strokeWidth="8" strokeLinecap="round"
          strokeDasharray="189" transform="rotate(-90)"
        />
        <text x="0" y="1" textAnchor="middle" fontSize="15" fontWeight="700" fill={INK} style={{ fontFamily: MONO }}>₦0</text>
        <text x="0" y="14" textAnchor="middle" fontSize="8" fill={GRAY5}>penalties</text>
      </g>
    </svg>
  );
}

/* Business Advisory — growth forecast with an investor-ready badge. */
function AdvisoryScene() {
  const bars = [
    { x: 40, h: 34 }, { x: 66, h: 46 }, { x: 92, h: 40 }, { x: 118, h: 56 }, { x: 144, h: 50 },
  ];
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid meet" role="img" style={s}>
      <Win title="Growth forecast" />
      {/* axes */}
      <line x1="34" y1="58" x2="34" y2="176" stroke={GRAY2} />
      <line x1="34" y1="176" x2="312" y2="176" stroke={GRAY2} />
      {/* history bars */}
      {bars.map((b, i) => (
        <rect key={i} className="a-grow" style={{ animationDelay: `${0.2 + i * 0.08}s` }}
          x={b.x} y={176 - b.h} width="15" height={b.h} rx="2.5" fill={NAVY3} opacity="0.55" />
      ))}
      {/* forecast area fill */}
      <polygon className="a-in" style={{ animationDelay: "0.9s" }}
        points="176,96 208,80 248,60 300,44 300,176 176,176" fill={GREEN50} />
      {/* historical line */}
      <polyline className="a-draw" style={{ ["--len" as string]: 200 } as React.CSSProperties}
        points="40,140 78,120 118,128 176,96" fill="none" stroke={NAVY4} strokeWidth="3"
        strokeLinecap="round" strokeLinejoin="round" strokeDasharray="200" />
      {/* forecast line */}
      <polyline className="a-draw" style={{ animationDelay: "0.7s", ["--len" as string]: 200 } as React.CSSProperties}
        points="176,96 208,80 248,60 300,44" fill="none" stroke={GREEN} strokeWidth="3"
        strokeLinecap="round" strokeLinejoin="round" strokeDasharray="200" />
      <circle cx="300" cy="44" r="4.5" fill={GREEN} />
      <circle cx="176" cy="96" r="3.5" fill={GOLD} />
      {/* investor-ready badge */}
      <g className="a-pop" style={{ animationDelay: "1.6s" }}>
        <rect x="186" y="136" width="120" height="28" rx="14" fill={WHITE} stroke={GREEN} strokeWidth="1.5" />
        <circle cx="204" cy="150" r="8" fill={GREEN} />
        <path d="M200 150 l3 3 l6 -6" fill="none" stroke={WHITE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="218" y="154" fontSize="11" fontWeight="700" fill={INK}>Be investor-ready</text>
      </g>
    </svg>
  );
}

/* Audit — reviewing ledgers, flagging then clearing a finding. */
function AuditScene() {
  const rows = [56, 82, 108, 134];
  return (
    <svg viewBox={VB} preserveAspectRatio="xMidYMid meet" role="img" style={s}>
      <Win title="Audit review" />
      {rows.map((y, i) => (
        <g key={i}>
          <rect x="28" y={y} width="150" height="9" rx="4.5" fill={i === 2 ? GRAY2 : GRAY1} />
          <rect x="190" y={y} width="46" height="9" rx="4.5" fill={GRAY1} />
        </g>
      ))}
      {/* scanning highlight */}
      <rect className="a-scan" x="26" y="52" width="212" height="18" rx="6" fill={NAVY50} opacity="0.9" />
      {/* flagged then cleared on row 3 (y=108) */}
      <g className="a-flag">
        <rect x="24" y="104" width="216" height="17" rx="5" fill="none" stroke={RED} strokeWidth="1.6" />
        <rect x="190" y={108} width="46" height="9" rx="4.5" fill={RED50} />
        <circle cx="246" cy="112" r="7" fill={RED} />
        <rect x="245.2" y="108" width="1.6" height="5" rx="0.8" fill={WHITE} />
        <circle cx="246" cy="116" r="1" fill={WHITE} />
      </g>
      <g className="a-resolve">
        <rect x="190" y={108} width="46" height="9" rx="4.5" fill={GREEN50} />
        <circle cx="246" cy="112" r="7" fill={GREEN} />
        <path d="M242 112 l3 3 l5 -5" fill="none" stroke={WHITE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* audited shield seal */}
      <g className="a-pop" style={{ animationDelay: "2.4s" }}>
        <rect x="70" y="162" width="220" height="28" rx="8" fill={NAVY} />
        <path d="M90 168 l10 3.6 v8 c0 7.4 -6 11 -10 13 c-4 -2 -10 -5.6 -10 -13 v-8 z" fill={WHITE} />
        <path d="M85.5 176 l3 3 l5.5 -6.5" fill="none" stroke={NAVY} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <text x="108" y="180" fontSize="12" fontWeight="700" fill={WHITE}>Audited · controls verified</text>
      </g>
    </svg>
  );
}
