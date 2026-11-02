import type { Metadata } from "next";
import { CheckoutForm } from "@/components/cart/CheckoutForm";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your Zaitoon Pizza order and checkout via WhatsApp or order API.",
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-[var(--color-ink)] sm:text-5xl">
        Your cart
      </h1>
      <p className="mt-3 text-[var(--color-muted)]">
        Review your order, then submit via WhatsApp or the order API when configured.
      </p>
      <div className="mt-10">
        <CheckoutForm />
      </div>
    </div>
  );
}
