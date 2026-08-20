import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "accent" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  children: ReactNode;
  className?: string;
};

function classes(v: Variant, s: Size, full?: boolean, extra?: string) {
  return [
    "btn",
    `btn--${v}`,
    `btn--${s}`,
    full ? "btn--full" : "",
    extra || "",
  ]
    .filter(Boolean)
    .join(" ");
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
  ariaLabel?: string;
};

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const {
    variant = "primary",
    size = "md",
    fullWidth,
    iconLeft,
    iconRight,
    children,
    className,
  } = props;
  const cls = classes(variant, size, fullWidth, className);
  const content = (
    <>
      {iconLeft}
      <span>{children}</span>
      {iconRight}
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const { href, external, ariaLabel } = props;
    if (external) {
      return (
        <a
          href={href}
          className={cls}
          aria-label={ariaLabel}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  const { href: _h, ...rest } = props as ButtonAsButton;
  return (
    <button className={cls} {...rest}>
      {content}
    </button>
  );
}
