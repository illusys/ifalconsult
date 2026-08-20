import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

type Padding = "none" | "sm" | "md" | "lg";
type Elevation = "none" | "xs" | "sm" | "md" | "lg";

export function Card({
  padding = "md",
  elevation = "sm",
  accent,
  interactive,
  href,
  onClick,
  children,
  className,
  style,
}: {
  padding?: Padding;
  elevation?: Elevation;
  accent?: boolean;
  interactive?: boolean;
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const cls = [
    "card",
    `card--pad-${padding}`,
    `card--el-${elevation}`,
    accent ? "card--accent" : "",
    interactive ? "card--interactive" : "",
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  if (interactive && href) {
    return (
      <Link href={href} className={cls} style={style}>
        {children}
      </Link>
    );
  }
  return (
    <div className={cls} style={style}>
      {children}
    </div>
  );
}
