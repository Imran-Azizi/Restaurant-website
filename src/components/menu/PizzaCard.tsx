"use client";

import Image from "next/image";
import Link from "next/link";
import { formatAFN } from "@/lib/format";
import { getLowestPrice, type MenuItem } from "@/data/menu";
import { useTranslation } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

type PizzaCardProps = {
  item: MenuItem;
  className?: string;
  priority?: boolean;
};

export function PizzaCard({ item, className, priority = false }: PizzaCardProps) {
  const { t, locale } = useTranslation();
  const from = getLowestPrice(item);

  const displayName =
    locale === "fa-AF" && item.nameDari
      ? item.nameDari
      : locale === "ps" && item.namePashto
        ? item.namePashto
        : item.name;

  return (
    <Link
      href={`/menu/${item.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-charcoal)]/8 bg-[var(--color-surface)]",
        "transition-[transform,box-shadow,border-color] duration-300 ease-[var(--ease-out)]",
        "motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[var(--shadow-card)] hover:border-[var(--color-gold)]/45",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-cream)]",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-charcoal)]/5">
        <Image
          src={item.image}
          alt={displayName}
          fill
          priority={priority}
          className="object-cover transition-[transform,filter] duration-500 ease-[var(--ease-out)] motion-safe:group-hover:scale-[1.06] motion-safe:group-hover:brightness-[1.03]"
          sizes="(max-width:768px) 100vw, 33vw"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)]/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        {item.isSample && (
          <span className="absolute start-3 top-3 rounded-full bg-[var(--color-charcoal)]/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-gold)] backdrop-blur-sm">
            {t.common.sample}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="heading-section text-xl text-[var(--color-ink)] transition-colors duration-200 group-hover:text-[var(--color-tomato)]">
            {displayName}
          </h3>
          <p className="shrink-0 pt-0.5 text-sm font-semibold tabular-nums text-[var(--color-tomato)]">
            <span className="font-normal text-[var(--color-muted)]">
              {t.common.from}
            </span>{" "}
            {formatAFN(from, locale)}
          </p>
        </div>
        <p className="line-clamp-2 text-sm leading-relaxed text-[var(--color-muted)]">
          {item.description}
        </p>
      </div>
    </Link>
  );
}
