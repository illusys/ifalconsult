import NextAuth, { type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import LinkedIn from "next-auth/providers/linkedin";
import Facebook from "next-auth/providers/facebook";

// Providers are only enabled when their credentials exist in the environment,
// so the site builds and runs before real OAuth apps are configured. Add the
// AUTH_*_ID / AUTH_*_SECRET pairs (see .env.example) to switch each on.
const providers: NextAuthConfig["providers"] = [];

export const CONFIGURED_PROVIDERS: { id: string; name: string }[] = [];

if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
  providers.push(
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  );
  CONFIGURED_PROVIDERS.push({ id: "google", name: "Google" });
}

if (process.env.AUTH_LINKEDIN_ID && process.env.AUTH_LINKEDIN_SECRET) {
  providers.push(
    LinkedIn({
      clientId: process.env.AUTH_LINKEDIN_ID,
      clientSecret: process.env.AUTH_LINKEDIN_SECRET,
    }),
  );
  CONFIGURED_PROVIDERS.push({ id: "linkedin", name: "LinkedIn" });
}

if (process.env.AUTH_FACEBOOK_ID && process.env.AUTH_FACEBOOK_SECRET) {
  providers.push(
    Facebook({
      clientId: process.env.AUTH_FACEBOOK_ID,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET,
    }),
  );
  CONFIGURED_PROVIDERS.push({ id: "facebook", name: "Facebook" });
}

// All three providers, for rendering the login UI even before they are wired.
export const ALL_PROVIDERS: { id: string; name: string }[] = [
  { id: "google", name: "Google" },
  { id: "linkedin", name: "LinkedIn" },
  { id: "facebook", name: "Facebook" },
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  trustHost: true,
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: { strategy: "jwt" },
});

// Never let a missing AUTH_SECRET (or other config gap) turn a page into a 500.
// Returns null (treated as signed-out) if the session can't be resolved.
export async function safeAuth() {
  try {
    return await auth();
  } catch {
    return null;
  }
}
