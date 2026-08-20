import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import "../legal.css";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How IFAL Consult collects, uses, and protects your personal information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className="legal">
      <div className="container">
        <div className="legal__inner">
          <h1>Privacy Policy</h1>
          <p className="legal__updated">Last updated: August 2026</p>

          <p>
            {SITE.legalName} (&ldquo;IFAL Consult&rdquo;, &ldquo;we&rdquo;,
            &ldquo;us&rdquo;) respects your privacy. This policy explains what
            information we collect through {SITE.domain}, why we collect it, and
            the choices you have.
          </p>

          <h2>Information we collect</h2>
          <ul>
            <li>Details you submit through our contact and consultation forms — your name, company, email, phone number, and message.</li>
            <li>Your email address if you subscribe to the IFAL tax bulletin.</li>
            <li>Basic account information (name, email, profile image) if you sign in to the client area using Google, LinkedIn, or Facebook.</li>
            <li>Standard technical and analytics data collected through cookies and tags to help us understand how the site is used.</li>
          </ul>

          <h2>How we use your information</h2>
          <ul>
            <li>To respond to your enquiries and provide the services you request.</li>
            <li>To send the tax bulletin where you have subscribed (you can unsubscribe at any time).</li>
            <li>To operate and secure the client area.</li>
            <li>To improve our website and understand which content is useful.</li>
          </ul>

          <h2>Cookies and analytics</h2>
          <p>
            We use Google Tag Manager to manage analytics and marketing tags.
            These may set cookies that help us measure site usage. You can
            control cookies through your browser settings.
          </p>

          <h2>Sign-in providers</h2>
          <p>
            When you sign in with Google, LinkedIn, or Facebook, we receive
            basic profile information from that provider to create and identify
            your account. We never receive your password. Your use of those
            providers is also governed by their own privacy policies.
          </p>

          <h2>How we protect and retain your information</h2>
          <p>
            We keep your information only as long as needed for the purposes
            above or as required by law and professional standards, and we take
            reasonable measures to protect it against unauthorised access.
          </p>

          <h2>Your rights</h2>
          <p>
            You may ask us to access, correct, or delete the personal
            information we hold about you. To make a request, or for any privacy
            question, contact us at{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>

          <h2>Contact</h2>
          <p>
            {SITE.legalName}
            <br />
            {SITE.address}
            <br />
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>
        </div>
      </div>
    </section>
  );
}
