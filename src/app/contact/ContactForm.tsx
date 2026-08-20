"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/Icon";
import { SERVICES, ENTITY_TYPES } from "@/data/services";

type Status = "idle" | "sending" | "sent" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<
      string,
      string
    >;

    // Client-side validation.
    const next: Record<string, string> = {};
    if (!data.name?.trim()) next.name = "Please enter your full name.";
    if (!data.email?.trim()) next.email = "Please enter your work email.";
    else if (!EMAIL_RE.test(data.email)) next.email = "Enter a valid email address.";
    if (!data.message?.trim()) next.message = "Tell us a little about your needs.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("sending");
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong.");
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    }
  }

  if (status === "sent") {
    return (
      <Card padding="lg" elevation="md">
        <div className="alert alert--success" role="status">
          <span style={{ marginTop: 1 }}>
            <Icon name="check-circle" size={20} />
          </span>
          <div className="alert__body">
            <div className="alert__title">Request received</div>
            We&apos;ll be in touch within one working day.
          </div>
        </div>
        <div style={{ marginTop: "var(--sp-5)" }}>
          <Button variant="secondary" onClick={() => setStatus("idle")}>
            Send another request
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card padding="lg" elevation="md">
      {status === "error" && serverError && (
        <div
          className="alert alert--danger"
          role="alert"
          style={{ marginBottom: "var(--sp-5)" }}
        >
          <span style={{ marginTop: 1 }}>
            <Icon name="alert-triangle" size={20} />
          </span>
          <div className="alert__body">
            <div className="alert__title">Could not send</div>
            {serverError} You can also email{" "}
            <a href="mailto:info@intadvisorsltd.com.ng">info@intadvisorsltd.com.ng</a>.
          </div>
        </div>
      )}

      <form onSubmit={onSubmit} noValidate>
        {/* Honeypot — hidden from real users, catches bots. */}
        <div
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
        >
          <label htmlFor="company_url">Do not fill this in</label>
          <input id="company_url" name="company_url" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="form-row">
          <div className="field">
            <label className="field__label" htmlFor="name">
              Full name
            </label>
            <input
              id="name"
              name="name"
              className={`input${errors.name ? " input--error" : ""}`}
              placeholder="Jane Adeyemi"
              autoComplete="name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "err-name" : undefined}
            />
            {errors.name && (
              <span id="err-name" className="field__error">
                {errors.name}
              </span>
            )}
          </div>
          <div className="field">
            <label className="field__label" htmlFor="company">
              Company
            </label>
            <input
              id="company"
              name="company"
              className="input"
              placeholder="Adeyemi Holdings Ltd"
              autoComplete="organization"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="field">
            <label className="field__label" htmlFor="email">
              Work email
            </label>
            <div className="control">
              <span className="control__icon">
                <Icon name="mail" size={18} />
              </span>
              <input
                id="email"
                name="email"
                type="email"
                className={`input input--with-icon${errors.email ? " input--error" : ""}`}
                placeholder="jane@company.com"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "err-email" : undefined}
              />
            </div>
            {errors.email && (
              <span id="err-email" className="field__error">
                {errors.email}
              </span>
            )}
          </div>
          <div className="field">
            <label className="field__label" htmlFor="phone">
              Phone
            </label>
            <div className="control">
              <span className="control__icon">
                <Icon name="phone" size={18} />
              </span>
              <input
                id="phone"
                name="phone"
                className="input input--with-icon"
                placeholder="+234 800 000 0000"
                autoComplete="tel"
                inputMode="tel"
              />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="field">
            <label className="field__label" htmlFor="service">
              Service needed
            </label>
            <select id="service" name="service" className="select" defaultValue="">
              <option value="" disabled>
                Select a service
              </option>
              {SERVICES.map((s) => (
                <option key={s.id} value={s.title}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label className="field__label" htmlFor="entity">
              Entity type
            </label>
            <select id="entity" name="entity" className="select" defaultValue="">
              <option value="" disabled>
                Select entity type
              </option>
              {ENTITY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="field" style={{ marginTop: "var(--sp-4)" }}>
          <label className="field__label" htmlFor="message">
            How can we help?
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className={`textarea${errors.message ? " textarea--error" : ""}`}
            placeholder="Tell us about your business…"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "err-message" : undefined}
          />
          {errors.message && (
            <span id="err-message" className="field__error">
              {errors.message}
            </span>
          )}
        </div>

        <label className="checkbox" style={{ marginTop: "var(--sp-4)" }}>
          <input type="checkbox" name="newsletter" value="yes" />
          <span>Subscribe to the IFAL tax bulletin</span>
        </label>

        <div style={{ marginTop: "var(--sp-5)" }}>
          <Button
            type="submit"
            variant="accent"
            size="lg"
            fullWidth
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending…" : "Send request"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
