# IFAL Consult — website

Marketing website for **IFAL — Interactive Financial Advisors Limited**
(trading as **IFAL Consult**), built with Next.js (App Router) and deployed on
Vercel. Live domain: **https://intadvisorsltd.com.ng**

## Stack

- **Next.js 15** (App Router, React 19, TypeScript)
- **Self-hosted fonts** via `next/font` (Barlow Semi Condensed, IBM Plex Sans,
  IBM Plex Mono) — no render-blocking Google Fonts request
- **Design tokens** ported verbatim from the IFAL design system into
  `src/app/globals.css`
- **Auth.js (NextAuth v5)** for client login — Google, LinkedIn, Facebook
- **Google Tag Manager** via `@next/third-parties` (loaded off the main thread)
- Fully static marketing pages for a high Lighthouse performance score

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in values (see below)
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
```

## Environment variables

All variables are documented in [`.env.example`](./.env.example). Set them in
the Vercel dashboard (Project → Settings → Environment Variables) for
production.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical base URL (canonical tags, sitemap, OG). |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container. Defaults to `GTM-TMPLR62L`. |
| `AUTH_SECRET` | Required by Auth.js. Generate with `openssl rand -base64 32`. |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | Google OAuth. |
| `AUTH_LINKEDIN_ID` / `AUTH_LINKEDIN_SECRET` | LinkedIn OAuth. |
| `AUTH_FACEBOOK_ID` / `AUTH_FACEBOOK_SECRET` | Facebook OAuth. |
| `CONTACT_TO_EMAIL` | Where consultation requests are delivered. |
| `RESEND_API_KEY` | Enables email delivery of the contact form + autoresponder. |
| `CONTACT_FROM_EMAIL` | Verified sender address for Resend. |
| `RESEND_AUDIENCE_ID` | Optional — newsletter subscribers audience. |

## Google Tag Manager

GTM is installed site-wide (container **GTM-TMPLR62L**) through the
`@next/third-parties` `GoogleTagManager` component in `src/app/layout.tsx`.
**All other tags (GA4, Meta Pixel, LinkedIn Insight, conversion tags, etc.) are
managed inside the GTM console — no code change is needed to add or remove
them.** To point the site at a different container, set `NEXT_PUBLIC_GTM_ID`.

## Client login (OAuth)

Sign-in with Google, LinkedIn, and Facebook is implemented with Auth.js. Each
provider activates automatically **once its `AUTH_*_ID` / `AUTH_*_SECRET` pair
is present** in the environment; until then the login page shows the provider
as "not configured". To enable a provider:

1. Create an OAuth app with the provider.
2. Set the callback URL to
   `https://intadvisorsltd.com.ng/api/auth/callback/<provider>`
   (`google` / `linkedin` / `facebook`).
3. Add the client ID and secret to the Vercel environment.
4. Also set `AUTH_SECRET`.

After signing in, users land on `/account` (a simple account page). The client
portal can be expanded from there.

## Contact form

`POST /api/contact` validates input, blocks bots with a honeypot, and — when
`RESEND_API_KEY` is set — emails the submission to `CONTACT_TO_EMAIL` and sends
the submitter an autoresponder. Without a mail provider it records the
submission server-side and still confirms success to the user, so nothing
breaks before email is wired up.

## Project structure

```
src/
  app/                 # routes (App Router)
    page.tsx           # Home
    services/          # Services (tabbed explorer + filing calendar)
    about/             # About IFAL
    insights/          # Insights hub + [slug] articles
    contact/           # Contact + working form
    login/ account/    # Auth.js client login + account page
    api/               # contact, newsletter, auth route handlers
    sitemap.ts robots.ts manifest.ts
  components/          # UI primitives, header, footer, icons, structured data
  data/               # services + insights content
  lib/                # site facts, fonts
public/logos/         # optimised IFAL logo lockups
```

## Content notes

Per the design handoff, a few figures are illustrative and should be confirmed
with the client before relying on them publicly: the hero stats (`18+`, `340`,
`100%`), the "Tax saved this year" panel, the testimonial, service fee lines,
and the filing-deadline table (verify against current FIRS/State IRS/CAC rules).
The Insights articles are original educational content written in the brand
voice and carry a general-guidance disclaimer.
