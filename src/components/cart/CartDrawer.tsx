"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useTranslation } from "@/i18n/LanguageProvider";
import { formatAFN } from "@/lib/format";
import { Sheet } from "@/components/ui/Sheet";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, subtotal } =
    useCart();
  const { t, locale, dir } = useTranslation();
  const reduce = useReducedMotion();
  const sheetSide = dir === "rtl" ? "left" : "right";

  return (
    <Sheet open={isOpen} onClose={closeCart} title={t.nav.cart} side={sheetSide}>
      <div className="flex h-full min-h-0 flex-col">
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-[var(--color-muted)]">{t.common.emptyCart}</p>
            <Link
              href="/menu"
              onClick={closeCart}
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              {t.common.continueShopping}
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.li
                    key={item.key}
                    layout={!reduce}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={
                      reduce
                        ? undefined
                        : { opacity: 0, height: 0, marginBottom: 0, paddingBottom: 0 }
                    }
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="flex gap-3 overflow-hidden border-b border-[var(--color-charcoal)]/8 pb-4"
                  >
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-[var(--color-charcoal)]/5">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-medium text-[var(--color-ink)]">
                            {item.name}
                          </p>
                          <p className="text-xs text-[var(--color-muted)]">
                            {item.sizeLabel}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.key)}
                          className="rounded-md p-1.5 text-[var(--color-muted)] transition-[color,background-color,transform] duration-200 hover:bg-[var(--color-tomato)]/8 hover:text-[var(--color-tomato)] motion-safe:active:scale-95"
                          aria-label={t.common.remove}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="inline-flex items-center gap-1 rounded-md border border-[var(--color-charcoal)]/10 bg-white/60">
                          <button
                            type="button"
                            className="rounded-s-md p-1.5 transition-colors duration-150 hover:bg-[var(--color-charcoal)]/5 motion-safe:active:scale-95"
                            onClick={() =>
                              updateQuantity(item.key, item.quantity - 1)
                            }
                            aria-label="Decrease"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <motion.span
                            key={item.quantity}
                            initial={reduce ? false : { scale: 0.85, opacity: 0.5 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                            className="min-w-6 text-center text-sm tabular-nums"
                          >
                            {item.quantity}
                          </motion.span>
                          <button
                            type="button"
                            className="rounded-e-md p-1.5 transition-colors duration-150 hover:bg-[var(--color-charcoal)]/5 motion-safe:active:scale-95"
                            onClick={() =>
                              updateQuantity(item.key, item.quantity + 1)
                            }
                            aria-label="Increase"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <p className="text-sm font-semibold tabular-nums text-[var(--color-ink)]">
                          {formatAFN(item.unitPrice * item.quantity, locale)}
                        </p>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
            <div className="border-t border-[var(--color-charcoal)]/10 px-5 py-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[var(--color-muted)]">{t.common.total}</span>
                <motion.span
                  key={subtotal}
                  initial={reduce ? false : { opacity: 0.5, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-lg font-semibold tabular-nums"
                >
                  {formatAFN(subtotal, locale)}
                </motion.span>
              </div>
              <Link
                href="/cart"
                onClick={closeCart}
                className={cn(buttonVariants({ variant: "primary" }), "w-full")}
              >
                {t.common.checkout}
              </Link>
            </div>
          </>
        )}
      </div>
    </Sheet>
  );
}
