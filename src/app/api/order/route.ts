import { NextResponse } from "next/server";
import { orderSchema } from "@/lib/validations";

function buildWhatsAppUrl(
  number: string,
  payload: {
    customerName: string;
    phone: string;
    fulfillment: string;
    address?: string;
    notes?: string;
    items: { name: string; size: string; quantity: number; unitPrice: number }[];
    total: number;
  },
) {
  const digits = number.replace(/\D/g, "");
  if (!digits) return null;

  const lines = [
    `*Zaitoon Pizza Order*`,
    `Name: ${payload.customerName}`,
    `Phone: ${payload.phone}`,
    `Fulfillment: ${payload.fulfillment}`,
    payload.address ? `Address: ${payload.address}` : null,
    payload.notes ? `Notes: ${payload.notes}` : null,
    "",
    ...payload.items.map(
      (i) =>
        `• ${i.name} (${i.size}) x${i.quantity} — ${i.unitPrice * i.quantity} AFN`,
    ),
    "",
    `Total: ${payload.total} AFN`,
  ];

  return `https://wa.me/${digits}?text=${encodeURIComponent(
    lines.filter(Boolean).join("\n"),
  )}`;
}

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

  const parsed = orderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  if (
    parsed.data.fulfillment === "delivery" &&
    !parsed.data.address?.trim()
  ) {
    return NextResponse.json(
      { ok: false, error: "Address required for delivery" },
      { status: 400 },
    );
  }

  const webhook = process.env.ORDER_WEBHOOK_URL?.trim();
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() ||
    process.env.WHATSAPP_NUMBER?.trim() ||
    "";

  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "order",
          ...parsed.data,
          receivedAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        return NextResponse.json(
          {
            ok: false,
            message: "Order webhook rejected the request.",
          },
          { status: 502 },
        );
      }

      return NextResponse.json({
        ok: true,
        mode: "webhook",
        message: "Order submitted successfully.",
      });
    } catch {
      return NextResponse.json(
        { ok: false, message: "Could not reach the order webhook." },
        { status: 502 },
      );
    }
  }

  const whatsappUrl = whatsappNumber
    ? buildWhatsAppUrl(whatsappNumber, parsed.data)
    : null;

  if (whatsappUrl) {
    return NextResponse.json({
      ok: true,
      mode: "whatsapp",
      whatsappUrl,
      message:
        "No ORDER_WEBHOOK_URL configured. Continue the order on WhatsApp.",
    });
  }

  return NextResponse.json(
    {
      ok: false,
      message:
        "Orders cannot be completed yet. Configure ORDER_WEBHOOK_URL or NEXT_PUBLIC_WHATSAPP_NUMBER.",
    },
    { status: 503 },
  );
}
