import { NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let email = "";
  try {
    const body = await request.json();
    email = (body.email || "").trim();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 422 });
  }

  // If a Resend audience is configured, add the contact; otherwise record it.
  const key = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  try {
    if (key && audienceId) {
      const res = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, unsubscribed: false }),
      });
      if (!res.ok && res.status !== 409) {
        const text = await res.text().catch(() => "");
        throw new Error(`Newsletter provider error: ${res.status} ${text}`);
      }
    } else {
      console.info("[newsletter] subscribe (no provider configured):", email);
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[newsletter] error:", err);
    return NextResponse.json({ error: "Could not subscribe right now." }, { status: 502 });
  }
}
