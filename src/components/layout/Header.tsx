"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ShoppingBag } from "lucide-react";
import PillNav from "@/components/PillNav";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { useTranslation } from "@/i18n/LanguageProvider";
import { siteConfig, getWhatsAppUrl } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", key: "home" as const },
  { href: "/menu", key: "menu" as const },
  { href: "/gallery", key: "gallery" as const },
  { href: "/about", key: "about" as const },
  { href: "/contact", key: "contact" as const },
];

export function Header() {
  const { t } = useTranslation();
  const { itemCount, openCart } = useCart();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const wa = getWhatsAppUrl("Hello Zaitoon Pizza!");

  const items = links.map((link) => ({
    label: t.nav[link.key],
    href: link.href,
  }));

  return (
    <header className="site-header sticky top-0 z-50 overflow-x-clip border-b border-white/8 bg-[var(--color-charcoal)] shadow-[0_12px_32px_-24px_rgba(42,21,72,0.65)]">
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center gap-3 px-4 sm:gap-4 sm:px-6 lg:h-[4.75rem]">
        <Link
          href="/"
          className="relative z-[2] flex shrink-0 items-center"
          aria-label="Zaitoon Pizza"
        >
          <span className="relative block h-12 w-[4.5rem] sm:h-[3.35rem] sm:w-[5rem]">
            <Image
              src={siteConfig.brand.logo}
              alt="Zaitoon Pizza"
              fill
              className="object-contain object-left"
              sizes="80px"
              priority
            />
          </span>
        </Link>

        <div className="flex min-w-0 flex-1 justify-end md:justify-center">
          <PillNav
            items={items}
            activeHref={pathname}
            linkComponent={Link}
            theme="dark"
            layout="split"
            size="md"
            surface="none"
            itemStyle="plain"
            hoverEffect="glide"
            indicator="pill"
            highlightColor="#F5B800"
            highlightTextColor="#2A1548"
            barColor="transparent"
            intro
            collapse="auto"
            style={
              {
                "--pn-text": "rgba(244, 239, 250, 0.88)",
                "--pn-strong": "#FFFFFF",
                "--pn-row-hover": "rgba(245, 184, 0, 0.12)",
              } as CSSProperties
            }
            className={cn(
              "max-w-full md:justify-center",
              "[&_a]:tracking-[-0.01em]",
              "[&_a[aria-current=page]]:font-semibold",
            )}
            ariaLabel="Primary"
          />
        </div>

        <div className="relative z-[2] flex shrink-0 items-center gap-1.5 sm:gap-2.5">
          <LanguageSwitcher tone="dark" />

          <button
            type="button"
            onClick={openCart}
            className={cn(
              "relative inline-flex h-11 w-11 items-center justify-center rounded-full text-[var(--color-cream)] transition-[color,background-color,transform] duration-200 ease-[var(--ease-out)]",
              "hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-charcoal)] motion-safe:active:scale-95",
            )}
            aria-label={t.common.openCart}
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.75} />
            <AnimatePresence>
              {itemCount > 0 ? (
                <motion.span
                  key={itemCount}
                  initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={reduce ? undefined : { scale: 0.6, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 480, damping: 24 }}
                  className="pointer-events-none absolute -end-0.5 -top-0.5"
                >
                  <Badge>{itemCount > 99 ? "99+" : itemCount}</Badge>
                </motion.span>
              ) : null}
            </AnimatePresence>
          </button>

          <Link
            href={wa ?? "/menu"}
            {...(wa ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={cn(
              buttonVariants({ variant: "primary", size: "sm" }),
              "hidden rounded-lg px-4 lg:inline-flex",
            )}
          >
            {t.nav.orderNow}
          </Link>
        </div>
      </div>
    </header>
  );
}
