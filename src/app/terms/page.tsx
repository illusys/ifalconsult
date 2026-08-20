import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import "../legal.css";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms governing your use of the IFAL Consult website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <section className="legal">
      <div className="container">
        <div className="legal__inner">
          <h1>Terms of Use</h1>
          <p className="legal__updated">Last updated: August 2026</p>

          <p>
            These terms govern your use of {SITE.domain}, operated by{" "}
            {SITE.legalName} (&ldquo;IFAL Consult&rdquo;). By using this website
            you agree to them.
          </p>

          <h2>Use of the website</h2>
          <p>
            You may use this website for lawful purposes only. You agree not to
            misuse it, attempt to gain unauthorised access, or interfere with
            its normal operation.
          </p>

          <h2>Information is general, not advice</h2>
          <p>
            The content on this website — including insights and guidance on tax,
            accounting, and compliance — is provided for general information. It
            does not constitute professional advice for your specific
            circumstances, and you should not act on it without engaging us or a
            suitably qualified professional. Tax rules and filing deadlines
            change; we do not warrant that all content is current at the time you
            read it.
          </p>

          <h2>The client area</h2>
          <p>
            Access to the client area is provided to clients of IFAL Consult. You
            are responsible for keeping your sign-in credentials secure and for
            activity under your account.
          </p>

          <h2>Intellectual property</h2>
          <p>
            The IFAL name, logo, and the content of this website are owned by
            {" "}
            {SITE.legalName} and may not be reproduced without permission.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the extent permitted by law, IFAL Consult is not liable for any
            loss arising from reliance on the general information on this website.
            Engagements are governed by the separate letter of engagement agreed
            with each client.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms? Contact us at{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
