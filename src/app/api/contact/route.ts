import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL?.trim();
  if (!webhook) {
    // Sample / local mode: accept the message so the form remains usable
    // before a webhook is configured.
    console.info("[contact] sample ingest (no CONTACT_WEBHOOK_URL)", parsed.data);
    return NextResponse.json({
      ok: true,
      message:
        "Message received. Contact webhook is not configured yet — this is sample mode.",
    });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "contact",
        ...parsed.data,
        receivedAt: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      return NextResponse.json(
        {
          ok: false,
          message: "Contact webhook rejected the request. Please try again later.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Message sent. We will get back to you soon.",
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Could not reach the contact webhook.",
      },
      { status: 502 },
    );
  }
}
