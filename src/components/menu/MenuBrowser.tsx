"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { FadeIn } from "@/components/motion/FadeIn";
import { PizzaCard } from "@/components/menu/PizzaCard";
import { Input } from "@/components/ui/Input";
import {
  menuCategories,
  menuItems,
  type MenuCategoryId,
} from "@/data/menu";
import { useTranslation } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

export function MenuBrowser() {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const searchParams = useSearchParams();
  const initial = (searchParams.get("category") as MenuCategoryId | null) ?? "all";
  const [category, setCategory] = useState<MenuCategoryId | "all">(
    menuCategories.some((c) => c.id === initial) ? initial : "all",
  );
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return menuItems.filter((item) => {
      const catOk = category === "all" || item.category === category;
      const qOk =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.ingredients.some((ing) => ing.toLowerCase().includes(q));
      return catOk && qOk;
    });
  }, [category, query]);

  const tabClass = (active: boolean) =>
    cn(
      "relative z-0 shrink-0 rounded-[var(--radius-control)] px-3.5 py-2.5 text-sm font-medium transition-[color] duration-200 ease-[var(--ease-out)]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-cream)]",
      active
        ? "text-[var(--color-cream)]"
        : "text-[var(--color-muted)] hover:text-[var(--color-ink)]",
    );

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        <LayoutGroup id="menu-categories">
          <div
            className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
            role="tablist"
            aria-label="Menu categories"
          >
            <button
              type="button"
              role="tab"
              aria-selected={category === "all"}
              onClick={() => setCategory("all")}
              className={tabClass(category === "all")}
            >
              {category === "all" ? (
                <motion.span
                  layoutId="menu-cat-pill"
                  className="absolute inset-0 -z-10 rounded-[var(--radius-control)] bg-[var(--color-charcoal)]"
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 380, damping: 32 }
                  }
                />
              ) : (
                <span className="absolute inset-0 -z-10 rounded-[var(--radius-control)] bg-white/70 transition-colors duration-200 hover:bg-white" />
              )}
              {t.common.all}
            </button>
            {menuCategories.map((cat) => {
              const active = category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCategory(cat.id)}
                  className={tabClass(active)}
                >
                  {active ? (
                    <motion.span
                      layoutId="menu-cat-pill"
                      className="absolute inset-0 -z-10 rounded-[var(--radius-control)] bg-[var(--color-charcoal)]"
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 32 }
                      }
                    />
                  ) : (
                    <span className="absolute inset-0 -z-10 rounded-[var(--radius-control)] bg-white/70 transition-colors duration-200 hover:bg-white" />
                  )}
                  {cat.name}
                </button>
              );
            })}
          </div>
        </LayoutGroup>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.common.search}
          aria-label={t.common.search}
          className="w-full transition-[border-color,box-shadow] duration-200 lg:max-w-xs"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-[var(--color-muted)]">
          No items match your filters.
        </p>
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${category}-${query.trim()}`}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
          >
            {filtered.map((item, i) => (
              <FadeIn key={item.id} delay={Math.min(i * 0.03, 0.24)}>
                <PizzaCard item={item} priority={i === 0} />
              </FadeIn>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
