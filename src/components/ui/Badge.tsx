import type { ReactNode } from "react";

type Tone = "neutral" | "navy" | "red" | "success" | "warning";

export function Badge({
  tone = "neutral",
  solid,
  dot,
  children,
}: {
  tone?: Tone;
  solid?: boolean;
  dot?: boolean;
  children: ReactNode;
}) {
  const cls = ["badge", `badge--${tone}`, solid ? "badge--solid" : ""]
    .filter(Boolean)
    .join(" ");
  return (
    <span className={cls}>
      {dot && <span className="badge__dot" aria-hidden="true" />}
      {children}
    </span>
  );
}
