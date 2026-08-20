import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/Icon";
import { providerMark } from "@/components/BrandIcons";
import { safeAuth, signIn, ALL_PROVIDERS, CONFIGURED_PROVIDERS } from "@/auth";
import "./login.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Client login",
  description:
    "Sign in to the IFAL Consult client area with Google, LinkedIn, or Facebook to view your engagements and documents.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: true },
};

export default async function LoginPage() {
  const session = await safeAuth();
  if (session?.user) redirect("/account");

  const configuredIds = new Set(CONFIGURED_PROVIDERS.map((p) => p.id));

  return (
    <section className="login">
      <div className="container login__grid">
        <div className="login__intro">
          <span className="eyebrow">Client area</span>
          <h1>Sign in to your IFAL account</h1>
          <p>
            Access your engagements, filing calendar, and documents in one
            place. Sign in with an account you already use — we never see your
            password.
          </p>
          <ul className="login__points">
            {[
              "Track your VAT, PAYE, and CIT filing status",
              "Review and sign documents securely",
              "Message your advisory team",
            ].map((t) => (
              <li key={t}>
                <span className="check">
                  <Icon name="check" size={17} strokeWidth={2.5} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <Card padding="lg" elevation="md">
          <div className="login__card-h">Client login</div>
          <p className="login__card-sub">
            Choose how you&apos;d like to sign in.
          </p>

          <div className="oauth-list">
            {ALL_PROVIDERS.map((p) => {
              const enabled = configuredIds.has(p.id);
              if (enabled) {
                return (
                  <form
                    key={p.id}
                    className="oauth-form"
                    action={async () => {
                      "use server";
                      await signIn(p.id, { redirectTo: "/account" });
                    }}
                  >
                    <button className="oauth-btn" type="submit">
                      {providerMark(p.id)}
                      <span>Continue with {p.name}</span>
                    </button>
                  </form>
                );
              }
              return (
                <div key={p.id}>
                  <button
                    className="oauth-btn"
                    type="button"
                    disabled
                    aria-disabled="true"
                    title={`${p.name} sign-in is not configured yet`}
                  >
                    {providerMark(p.id)}
                    <span>Continue with {p.name}</span>
                  </button>
                </div>
              );
            })}
          </div>

          {CONFIGURED_PROVIDERS.length === 0 && (
            <p className="login__unconfigured">
              Sign-in providers are not yet configured. Add the Google,
              LinkedIn, and Facebook OAuth credentials in the site environment
              to activate them.
            </p>
          )}

          <div className="login__divider">Secure sign-in</div>

          <p className="login__note">
            By continuing you agree to our{" "}
            <a href="/terms">Terms</a> and{" "}
            <a href="/privacy">Privacy Policy</a>. Trouble signing in? Email{" "}
            <a href="mailto:info@intadvisorsltd.com.ng">
              info@intadvisorsltd.com.ng
            </a>
            .
          </p>
        </Card>
      </div>
    </section>
  );
}
