"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (new FormData(form).get("email") as string || "").trim();
    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      setMsg("Please enter a valid email address.");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      setMsg("Thanks — you're subscribed to the IFAL tax bulletin.");
      form.reset();
    } catch {
      setStatus("error");
      setMsg("Something went wrong. Please try again.");
    }
  }

  if (status === "done") {
    return (
      <p style={{ color: "var(--ifal-success-500)", fontSize: "var(--fs-sm)", fontWeight: 600 }} role="status">
        {msg}
      </p>
    );
  }

  return (
    <form className="ins-news__form" onSubmit={onSubmit} noValidate>
      <label htmlFor="news-email" className="visually-hidden">
        Email address
      </label>
      <input
        id="news-email"
        name="email"
        type="email"
        className="input"
        placeholder="you@company.com"
        autoComplete="email"
        aria-invalid={status === "error"}
      />
      <Button type="submit" variant="accent" disabled={status === "sending"}>
        {status === "sending" ? "Subscribing…" : "Subscribe"}
      </Button>
      {status === "error" && (
        <p style={{ color: "var(--ifal-danger-500)", fontSize: "var(--fs-xs)", width: "100%" }} role="alert">
          {msg}
        </p>
      )}
    </form>
  );
}
