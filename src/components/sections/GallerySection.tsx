"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/FadeIn";
import { getLowestPrice, menuItems, type MenuItem } from "@/data/menu";
import { useTranslation } from "@/i18n/LanguageProvider";
import { formatAFN } from "@/lib/format";
import { cn } from "@/lib/utils";

function displayName(item: MenuItem, locale: string) {
  if (locale === "fa-AF" && item.nameDari) return item.nameDari;
  if (locale === "ps" && item.namePashto) return item.namePashto;
  return item.name;
}

type GallerySectionProps = {
  /** Limit how many dishes to show. Omit to show the full menu. */
  limit?: number;
  /** When false, only the grid renders (for dedicated gallery pages with their own title). */
  showHeading?: boolean;
  className?: string;
};

export function GallerySection({
  limit,
  showHeading = true,
  className,
}: GallerySectionProps) {
  const { t, locale } = useTranslation();
  const items = useMemo(
    () => (limit ? menuItems.slice(0, limit) : menuItems),
    [limit],
  );

  return (
    <section
      id="atmosphere"
      aria-labelledby={showHeading ? "atmosphere-heading" : undefined}
      className={cn("mx-auto max-w-6xl px-4 section-pad sm:px-6", className)}
    >
      {showHeading ? (
        <FadeIn className="mb-10 max-w-xl md:mb-12">
          <h2
            id="atmosphere-heading"
            className="heading-section text-3xl text-[var(--color-ink)] sm:text-4xl"
          >
            {t.sections.galleryTitle}
          </h2>
          <p className="mt-3 text-[var(--color-muted)]">
            {t.sections.gallerySub}
          </p>
        </FadeIn>
      ) : null}

      <StaggerChildren className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => {
          const name = displayName(item, locale);
          const from = getLowestPrice(item);

          return (
            <StaggerItem key={item.id}>
              <Link
                href={`/menu/${item.slug}`}
                className="group relative block aspect-square w-full overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-charcoal)]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-cream)]"
                aria-label={`${name} — ${t.common.from} ${formatAFN(from, locale)}`}
              >
                <Image
                  src={item.image}
                  alt={name}
                  fill
                  className="object-cover transition-[transform,filter] duration-500 ease-[var(--ease-out)] motion-safe:group-hover:scale-[1.05] motion-safe:group-hover:brightness-[1.04]"
                  sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)]/80 via-[var(--color-charcoal)]/15 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-95 group-focus-visible:opacity-95"
                />
                <span className="absolute inset-x-0 bottom-0 flex flex-col gap-0.5 p-3 text-start sm:p-3.5">
                  <span className="text-sm font-medium leading-snug text-white sm:text-[0.95rem]">
                    {name}
                  </span>
                  <span className="text-[0.7rem] font-semibold tabular-nums tracking-wide text-[var(--color-tomato)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:text-xs">
                    {t.common.from} {formatAFN(from, locale)}
                  </span>
                </span>
              </Link>
            </StaggerItem>
          );
        })}
      </StaggerChildren>
    </section>
  );
}
