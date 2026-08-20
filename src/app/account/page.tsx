import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icon";
import { safeAuth, signOut } from "@/auth";
import "./account.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your account",
  description: "Your IFAL Consult client area.",
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const session = await safeAuth();
  if (!session?.user) redirect("/login");

  const user = session.user;
  const firstName = (user.name || "there").split(" ")[0];

  return (
    <section className="section account">
      <div className="container">
        <div className="account__head">
          <div>
            <span className="eyebrow">Client area</span>
            <h1 className="account__title">Welcome back, {firstName}</h1>
            <p className="account__sub">
              This is your IFAL client area. A full portal — filings, documents,
              and messaging — is on the way.
            </p>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <Button variant="secondary" type="submit" iconLeft={<Icon name="log-out" size={18} />}>
              Sign out
            </Button>
          </form>
        </div>

        <div className="account__grid">
          <Card padding="lg">
            <div className="account__profile">
              {user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.image}
                  alt=""
                  width={56}
                  height={56}
                  className="account__avatar"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="account__avatar account__avatar--fallback">
                  <Icon name="user" size={24} />
                </span>
              )}
              <div>
                <div className="account__name">{user.name || "Signed in"}</div>
                <div className="account__email">{user.email}</div>
              </div>
            </div>
          </Card>

          <Card padding="lg">
            <div className="account__card-h">
              <span className="icon-chip">
                <Icon name="file-text" size={20} />
              </span>
              Your engagements
            </div>
            <p className="account__card-body">
              No active engagements are linked to this account yet. Once your
              onboarding is complete, your engagements and their status appear
              here.
            </p>
            <Button variant="ghost" href="/contact" iconRight={<Icon name="arrow-right" size={16} />}>
              Start an engagement
            </Button>
          </Card>

          <Card padding="lg">
            <div className="account__card-h">
              <span className="icon-chip">
                <Icon name="calendar" size={20} />
              </span>
              Filing calendar
            </div>
            <p className="account__card-body">
              Your VAT, PAYE, and Company Income Tax deadlines will be tracked
              here once your engagement begins.
            </p>
            <Badge tone="navy">Coming soon</Badge>
          </Card>
        </div>
      </div>
    </section>
  );
}
