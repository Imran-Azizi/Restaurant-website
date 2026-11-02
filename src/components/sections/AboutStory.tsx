"use client";

import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import { useTranslation } from "@/i18n/LanguageProvider";
import { siteConfig } from "@/lib/site-config";

export function AboutStory() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16">
      <FadeIn>
        <h1 className="heading-display text-4xl text-[var(--color-ink)] sm:text-5xl">
          {t.about.title}
        </h1>
      </FadeIn>

      <FadeIn delay={0.08} className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-charcoal)] shadow-[var(--shadow-card)]">
        <Image
          src={siteConfig.brand.logo}
          alt="Zaitoon Pizza emblem"
          fill
          className="object-contain p-10"
          sizes="800px"
          priority
        />
      </FadeIn>

      <FadeIn
        delay={0.12}
        className="prose-zaitoon mt-10 space-y-5 text-base leading-relaxed text-[var(--color-muted)]"
      >
        <p>{t.about.body1}</p>
        <p>{t.about.body2}</p>
        <p className="heading-section text-2xl text-[var(--color-ink)]">
          {t.about.promise}
        </p>
      </FadeIn>
    </div>
  );
}
