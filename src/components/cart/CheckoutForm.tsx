"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { useTranslation } from "@/i18n/LanguageProvider";
import { formatAFN } from "@/lib/format";
import { getWhatsAppUrl } from "@/lib/site-config";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/lib/utils";

const checkoutSchema = z
  .object({
    customerName: z.string().trim().min(2),
    phone: z.string().trim().min(7),
    notes: z.string().optional(),
    fulfillment: z.enum(["pickup", "delivery"]),
    address: z.string().optional(),
  })
  .superRefine((val, ctx) => {
    if (val.fulfillment === "delivery" && !val.address?.trim()) {
      ctx.addIssue({
        code: "custom",
        message: "Address required for delivery",
        path: ["address"],
      });
    }
  });

type CheckoutValues = z.infer<typeof checkoutSchema>;

export function CheckoutForm() {
  const { items, subtotal, clearCart } = useCart();
  const { t, locale } = useTranslation();
  const [status, setStatus] = useState<"idle" | "submitting">("idle");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { fulfillment: "pickup", notes: "", address: "" },
  });

  const fulfillment = useWatch({ control, name: "fulfillment" }) ?? "pickup";

  if (items.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-[var(--color-charcoal)]/20 p-10 text-center text-[var(--color-muted)]">
        {t.cart.empty}
      </p>
    );
  }

  const buildWhatsAppMessage = (data: CheckoutValues) => {
    const lines = [
      `*Zaitoon Pizza Order*`,
      `Name: ${data.customerName}`,
      `Phone: ${data.phone}`,
      `Fulfillment: ${data.fulfillment}`,
      data.fulfillment === "delivery" ? `Address: ${data.address}` : null,
      data.notes ? `Notes: ${data.notes}` : null,
      "",
      ...items.map(
        (i) =>
          `• ${i.name} (${i.sizeLabel}) x${i.quantity} — ${formatAFN(i.unitPrice * i.quantity)}`,
      ),
      "",
      `Total: ${formatAFN(subtotal)}`,
    ];
    return lines.filter(Boolean).join("\n");
  };

  const onSubmit = handleSubmit(async (data) => {
    setStatus("submitting");
    try {
      const payload = {
        ...data,
        items: items.map((i) => ({
          id: i.id,
          name: i.name,
          size: i.sizeLabel,
          quantity: i.quantity,
          unitPrice: i.unitPrice,
        })),
        total: subtotal,
      };

      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as {
        ok?: boolean;
        message?: string;
        whatsappUrl?: string;
        mode?: string;
      };

      if (json.whatsappUrl) {
        window.open(json.whatsappUrl, "_blank", "noopener,noreferrer");
        toast.message(json.message || "Opening WhatsApp…");
        if (json.ok) clearCart();
        return;
      }

      if (!res.ok || !json.ok) {
        const waFallback = getWhatsAppUrl(buildWhatsAppMessage(data));
        if (waFallback) {
          toast.message(json.message || t.cart.noConfig);
          window.open(waFallback, "_blank", "noopener,noreferrer");
          return;
        }
        toast.error(json.message || t.cart.noConfig);
        return;
      }

      toast.success(json.message || "Order submitted");
      clearCart();
    } catch {
      toast.error(t.contact.error);
    } finally {
      setStatus("idle");
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <ul className="divide-y divide-[var(--color-charcoal)]/10 rounded-lg border border-[var(--color-charcoal)]/10 bg-white/40">
        {items.map((item) => (
          <li key={item.key} className="flex justify-between gap-4 px-4 py-3 text-sm">
            <span>
              {item.name}{" "}
              <span className="text-[var(--color-muted)]">
                ({item.sizeLabel}) × {item.quantity}
              </span>
            </span>
            <span className="font-medium">
              {formatAFN(item.unitPrice * item.quantity, locale)}
            </span>
          </li>
        ))}
        <li className="flex justify-between px-4 py-3 font-semibold">
          <span>{t.common.total}</span>
          <span>{formatAFN(subtotal, locale)}</span>
        </li>
      </ul>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium" htmlFor="customerName">
            {t.cart.name}
          </label>
          <Input id="customerName" {...register("customerName")} />
          {errors.customerName && (
            <p className="mt-1 text-xs text-[var(--color-tomato)]">
              {errors.customerName.message}
            </p>
          )}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium" htmlFor="phone">
            {t.cart.phone}
          </label>
          <Input id="phone" {...register("phone")} />
          {errors.phone && (
            <p className="mt-1 text-xs text-[var(--color-tomato)]">
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-medium">{t.cart.fulfillment}</legend>
        <div className="flex gap-3">
          {(["pickup", "delivery"] as const).map((mode) => (
            <label
              key={mode}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-md border px-4 py-2 text-sm",
                fulfillment === mode
                  ? "border-[var(--color-tomato)] bg-[var(--color-tomato)]/10"
                  : "border-[var(--color-charcoal)]/15",
              )}
            >
              <input
                type="radio"
                value={mode}
                {...register("fulfillment")}
                className="sr-only"
              />
              {mode === "pickup" ? t.cart.pickup : t.cart.delivery}
            </label>
          ))}
        </div>
      </fieldset>

      {fulfillment === "delivery" && (
        <div>
          <label className="mb-1.5 block text-sm font-medium" htmlFor="address">
            {t.cart.address}
          </label>
          <Input id="address" {...register("address")} />
          {errors.address && (
            <p className="mt-1 text-xs text-[var(--color-tomato)]">
              {errors.address.message}
            </p>
          )}
        </div>
      )}

      <div>
        <label className="mb-1.5 block text-sm font-medium" htmlFor="notes">
          {t.cart.notes}
        </label>
        <Textarea id="notes" {...register("notes")} />
      </div>

      <Button type="submit" size="lg" disabled={status === "submitting"}>
        {status === "submitting" ? t.common.loading : t.cart.submit}
      </Button>
      <p className="text-xs text-[var(--color-muted)]">{t.cart.sub}</p>
    </form>
  );
}
