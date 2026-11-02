"use client";

import Link from "next/link";
import type { MenuItem } from "@/data/menu";
import { useTranslation } from "@/i18n/LanguageProvider";
import { AddToCartForm } from "@/components/menu/AddToCartForm";

function displayName(item: MenuItem, locale: string) {
  if (locale === "fa-AF" && item.nameDari) return item.nameDari;
  if (locale === "ps" && item.namePashto) return item.namePashto;
  return item.name;
}

export function MenuItemDetail({ item }: { item: MenuItem }) {
  const { t, locale } = useTranslation();
  const name = displayName(item, locale);

  return (
    <div className="lg:pt-2">
      {item.isSample ? (
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-tomato)]">
          {t.common.sample}
        </p>
      ) : null}

      <h1 className="heading-display mt-2 text-4xl text-[var(--color-ink)] sm:text-5xl">
        {name}
      </h1>

      <p className="mt-4 max-w-[40ch] text-[0.98rem] leading-relaxed text-[var(--color-muted)]">
        {item.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {item.vegetarian ? (
          <span className="rounded-full border border-[var(--color-tomato)]/45 bg-[var(--color-tomato)]/10 px-3 py-1 text-xs font-medium text-[var(--color-tomato-deeper)]">
            Vegetarian
          </span>
        ) : null}
        {item.spicy ? (
          <span className="rounded-full border border-[var(--color-tomato)]/45 bg-[var(--color-tomato)]/10 px-3 py-1 text-xs font-medium text-[var(--color-tomato-deeper)]">
            Spicy
          </span>
        ) : null}
      </div>

      {item.ingredients.length > 0 ? (
        <p className="mt-6 text-sm leading-relaxed text-[var(--color-muted)]">
          <span className="font-semibold text-[var(--color-tomato)]">
            {t.menu.ingredients}:{" "}
          </span>
          {item.ingredients.join(" · ")}
        </p>
      ) : null}

      <div className="mt-8">
        <AddToCartForm item={item} />
      </div>

      <Link
        href="/menu"
        className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-ink)] transition-colors hover:text-[var(--color-tomato)]"
      >
        ← {t.common.viewMenu}
      </Link>
    </div>
  );
}
