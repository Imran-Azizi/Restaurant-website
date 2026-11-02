import type { Metadata } from "next";
import { Suspense } from "react";
import { MenuBrowser } from "@/components/menu/MenuBrowser";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Sample Zaitoon Pizza menu with AFN prices — signature, classics, chicken, vegetarian, sides, and drinks.",
};

export default function MenuPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="mb-8 max-w-2xl sm:mb-10">
        <h1 className="heading-display text-4xl text-[var(--color-ink)] sm:text-5xl">
          Menu
        </h1>
        <p className="mt-3 text-[var(--color-muted)] sm:mt-4">
          Prices in AFN. Items marked as sample until the restaurant confirms the
          real menu.
        </p>
      </header>
      <Suspense
        fallback={
          <p className="py-20 text-center text-[var(--color-muted)]">Loading…</p>
        }
      >
        <MenuBrowser />
      </Suspense>
    </div>
  );
}
