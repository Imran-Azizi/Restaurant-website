"use client";

import { useTranslation } from "@/i18n/LanguageProvider";

export function RelatedHeading() {
  const { t } = useTranslation();
  return (
    <h2 className="heading-section text-3xl text-[var(--color-ink)]">
      {t.menu.related}
    </h2>
  );
}
