"use client";

import { Flame, Heart, MapPin } from "lucide-react";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/motion/FadeIn";
import { useTranslation } from "@/i18n/LanguageProvider";

export function WhyZaitoon() {
  const { t } = useTranslation();

  const items = [
    {
      icon: Flame,
      title: t.sections.whyCraft,
      body: t.sections.whyCraftBody,
    },
    {
      icon: Heart,
      title: t.sections.whyWelcome,
      body: t.sections.whyWelcomeBody,
    },
    {
      icon: MapPin,
      title: t.sections.whyLocal,
      body: t.sections.whyLocalBody,
    },
  ];

  return (
    <section
      aria-labelledby="why-zaitoon-heading"
      className="mx-auto max-w-6xl px-4 section-pad sm:px-6"
    >
      <FadeIn className="mb-10 max-w-xl md:mb-12">
        <h2
          id="why-zaitoon-heading"
          className="heading-section text-3xl text-[var(--color-ink)] sm:text-4xl"
        >
          {t.sections.whyTitle}
        </h2>
        <p className="mt-3 text-[var(--color-muted)]">{t.sections.whySub}</p>
      </FadeIn>

      <StaggerChildren className="grid gap-10 md:grid-cols-3 md:gap-8">
        {items.map((item) => (
          <StaggerItem key={item.title}>
            <div className="border-t border-[var(--color-gold)]/55 pt-6">
              <item.icon
                className="mb-4 h-6 w-6 text-[var(--color-olive)]"
                strokeWidth={1.5}
                aria-hidden
              />
              <h3 className="heading-section text-xl text-[var(--color-ink)]">
                {item.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[var(--color-muted)]">
                {item.body}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </section>
  );
}
