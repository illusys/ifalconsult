import { Barlow_Semi_Condensed, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";

// Self-hosted at build time by next/font (no render-blocking request to
// Google), with font-display: swap. Variable names match the design tokens.
//
// Only the weights actually used in the UI are requested, and only the display
// family (used by the hero headline / LCP element) is preloaded — this keeps
// the LCP font uncontended so it paints early on mobile.

export const barlow = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-barlow",
  display: "swap",
  preload: true,
});

export const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-sans",
  display: "swap",
  preload: false,
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
  preload: false,
});
