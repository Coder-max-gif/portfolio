import { NextResponse } from "next/server";

/**
 * Contact endpoint.
 * [PLACEHOLDER] Wire this to an email provider (e.g. Resend, Postmark) before launch.
 * Until then submissions are only logged on the server.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Honeypot: bots fill the hidden "company" field. Pretend success.
  if (body.company) return NextResponse.json({ ok: true });

  const name = String(body.name ?? "").trim().slice(0, 200);
  const email = String(body.email ?? "").trim().slice(0, 200);
  const role = String(body.role ?? "Other").slice(0, 20);
  const message = String(body.message ?? "").trim().slice(0, 5000);

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  }

  console.log("[contact]", { name, email, role, message });
  return NextResponse.json({ ok: true });
}
