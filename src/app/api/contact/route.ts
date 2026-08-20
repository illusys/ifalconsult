import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendViaResend(payload: {
  to: string;
  from: string;
  replyTo?: string;
  subject: string;
  html: string;
}) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { sent: false as const };
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: payload.to,
      from: payload.from,
      reply_to: payload.replyTo,
      subject: payload.subject,
      html: payload.html,
    }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Email provider error: ${res.status} ${text}`);
  }
  return { sent: true as const };
}

export async function POST(request: Request) {
  let data: Record<string, string>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success, drop silently.
  if (data.company_url && data.company_url.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = (data.name || "").trim();
  const email = (data.email || "").trim();
  const message = (data.message || "").trim();
  const company = (data.company || "").trim();
  const phone = (data.phone || "").trim();
  const service = (data.service || "").trim();
  const entity = (data.entity || "").trim();
  const newsletter = data.newsletter === "yes";

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Please complete the required fields." },
      { status: 422 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 422 },
    );
  }

  const to = process.env.CONTACT_TO_EMAIL || SITE.email;
  const from = process.env.CONTACT_FROM_EMAIL || `IFAL Consult <noreply@${SITE.domain}>`;

  const rows: [string, string][] = [
    ["Name", name],
    ["Company", company || "—"],
    ["Email", email],
    ["Phone", phone || "—"],
    ["Service needed", service || "—"],
    ["Entity type", entity || "—"],
    ["Newsletter", newsletter ? "Yes" : "No"],
  ];

  const internalHtml = `
    <h2 style="font-family:Arial,sans-serif;color:#202070;">New consultation request</h2>
    <table style="font-family:Arial,sans-serif;border-collapse:collapse;font-size:14px;">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:6px 12px;color:#6b7186;">${k}</td><td style="padding:6px 12px;color:#14151b;"><strong>${escapeHtml(
              v,
            )}</strong></td></tr>`,
        )
        .join("")}
    </table>
    <p style="font-family:Arial,sans-serif;font-size:14px;color:#383c4d;">
      <strong>Message</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}
    </p>`;

  const autoresponderHtml = `
    <div style="font-family:Arial,sans-serif;color:#383c4d;font-size:15px;line-height:1.6;">
      <p>Dear ${escapeHtml(name.split(" ")[0] || name)},</p>
      <p>Thank you for contacting IFAL Consult. We&rsquo;ve received your request
      and a member of our team will be in touch within one working day with a
      proposed scope and fee.</p>
      <p>If your matter is urgent, call us on
      <a href="tel:${SITE.phone1Intl}" style="color:#202070;">${SITE.phone1}</a>
      (also on WhatsApp) or <a href="tel:${SITE.phone2Intl}" style="color:#202070;">${SITE.phone2}</a>.</p>
      <p style="margin-top:24px;">Kind regards,<br/><strong style="color:#202070;">IFAL Consult</strong><br/>
      Interactive Financial Advisors Limited<br/>
      ${SITE.address}</p>
    </div>`;

  try {
    const result = await sendViaResend({
      to,
      from,
      replyTo: email,
      subject: `New consultation request — ${name}${company ? ` (${company})` : ""}`,
      html: internalHtml,
    });

    if (result.sent) {
      // Autoresponder to the submitter (best-effort; don't fail the request).
      await sendViaResend({
        to: email,
        from,
        subject: "We've received your request — IFAL Consult",
        html: autoresponderHtml,
      }).catch((e) => console.error("Autoresponder failed:", e));
    } else {
      // No mail provider configured yet: record the submission so it isn't lost.
      console.info("[contact] submission (no mail provider configured):", {
        name,
        email,
        company,
        phone,
        service,
        entity,
        newsletter,
        message,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] delivery error:", err);
    return NextResponse.json(
      { error: "We couldn't send your request just now. Please try again or email us directly." },
      { status: 502 },
    );
  }
}
