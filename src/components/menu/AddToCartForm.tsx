"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { MenuItem } from "@/data/menu";
import { useCart } from "@/context/CartContext";
import { useTranslation } from "@/i18n/LanguageProvider";
import { formatAFN } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function AddToCartForm({ item }: { item: MenuItem }) {
  const { addItem } = useCart();
  const { t, locale } = useTranslation();
  const [sizeId, setSizeId] = useState(item.sizes[0]?.id ?? "");
  const [qty, setQty] = useState(1);
  const [pending, setPending] = useState(false);

  const size = item.sizes.find((s) => s.id === sizeId) ?? item.sizes[0];

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-olive)]">
          {t.common.size}
        </p>
        <div className="flex flex-wrap gap-2">
          {item.sizes.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSizeId(s.id)}
              className={cn(
                "rounded-md border px-4 py-2 text-sm transition-[color,background-color,border-color,transform] duration-200 ease-[var(--ease-out)] motion-safe:active:scale-[0.98]",
                sizeId === s.id
                  ? "border-[var(--color-tomato)] bg-[var(--color-tomato)]/15 text-[var(--color-ink)] shadow-[0_6px_16px_-12px_rgba(var(--rgb-tomato),0.45)]"
                  : "border-[var(--color-charcoal)]/15 text-[var(--color-muted)] hover:border-[var(--color-olive)] hover:text-[var(--color-ink)]",
              )}
            >
              {s.label} · {formatAFN(s.price, locale)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
          {t.common.quantity}
          <input
            type="number"
            min={1}
            max={20}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
            className="h-10 w-16 rounded-md border border-[var(--color-charcoal)]/15 bg-white/70 px-2 text-center text-[var(--color-ink)] transition-[border-color,box-shadow] duration-200 focus:border-[var(--color-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30"
          />
        </label>
        <Button
          type="button"
          size="lg"
          loading={pending}
          onClick={() => {
            if (!size || pending) return;
            setPending(true);
            addItem({
              id: item.id,
              slug: item.slug,
              name: item.name,
              sizeId: size.id,
              sizeLabel: size.label,
              unitPrice: size.price,
              quantity: qty,
              image: item.image,
            });
            toast.success(`${item.name} — ${t.common.addToCart}`);
            window.setTimeout(() => setPending(false), 420);
          }}
        >
          {t.common.addToCart} · {formatAFN((size?.price ?? 0) * qty, locale)}
        </Button>
      </div>
    </div>
  );
}
