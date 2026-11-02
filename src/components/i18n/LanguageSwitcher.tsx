"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTranslation } from "@/i18n/LanguageProvider";
import { localeLabels, locales, type Locale } from "@/i18n/types";
import { cn } from "@/lib/utils";

const compactLabels: Record<Locale, string> = {
  en: "EN",
  "fa-AF": "دری",
  ps: "پښتو",
};

export function LanguageSwitcher({
  className,
  compact = false,
  tone = "light",
}: {
  className?: string;
  compact?: boolean;
  tone?: "light" | "dark";
}) {
  const { locale, setLocale } = useTranslation();
  const reduce = useReducedMotion();
  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "relative inline-flex items-center rounded-full p-1",
        dark
          ? "border border-white/12 bg-white/6"
          : "border border-[var(--color-charcoal)]/10 bg-[var(--color-surface)] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]",
        className,
      )}
      role="group"
      aria-label="Language"
    >
      {locales.map((code: Locale) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            className={cn(
              "relative z-[1] min-h-8 rounded-full py-1.5 text-xs font-medium transition-colors duration-200 ease-[var(--ease-out)]",
              compact ? "px-2.5" : "px-3",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2",
              dark
                ? "focus-visible:ring-offset-[var(--color-charcoal)]"
                : "focus-visible:ring-offset-[var(--color-cream)]",
              active
                ? dark
                  ? "text-[var(--color-charcoal)]"
                  : "text-[var(--color-cream)]"
                : dark
                  ? "text-white/65 hover:text-white"
                  : "text-[var(--color-muted)] hover:text-[var(--color-ink)]",
            )}
            aria-pressed={active}
            aria-label={localeLabels[code]}
          >
            {active ? (
              <motion.span
                layoutId={`lang-pill-${tone}${compact ? "-compact" : ""}`}
                className={cn(
                  "absolute inset-0 -z-10 rounded-full",
                  dark
                    ? "bg-[var(--color-tomato)] text-[var(--color-charcoal)] shadow-[0_4px_12px_-6px_rgba(var(--rgb-tomato),0.55)]"
                    : "bg-[var(--color-charcoal)] shadow-[0_4px_12px_-6px_rgba(var(--rgb-charcoal),0.5)]",
                )}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 420, damping: 34, mass: 0.7 }
                }
              />
            ) : null}
            <span className={compact ? undefined : "hidden md:inline"}>
              {compact ? compactLabels[code] : localeLabels[code]}
            </span>
            {!compact ? (
              <span className="md:hidden">{compactLabels[code]}</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
