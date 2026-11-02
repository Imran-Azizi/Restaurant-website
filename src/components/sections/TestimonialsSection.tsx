"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import TestimonialMarquee from "@/components/ui/marquee-01";
import { useTranslation } from "@/i18n/LanguageProvider";

export function TestimonialsSection() {
  const { t } = useTranslation();

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#050308] section-pad texture-charcoal"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/50 to-transparent"
      />

      <FadeIn className="mx-auto mb-10 max-w-xl px-4 text-center sm:mb-12 sm:px-6">
        <h2 className="heading-section text-3xl text-[var(--color-cream)] sm:text-4xl">
          {t.sections.testimonialsTitle}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[var(--color-cream)]/65">
          {t.sections.testimonialsSub}
        </p>
        <div className="gold-rule mx-auto mt-6" />
      </FadeIn>

      <div className="relative w-full">
        <TestimonialMarquee />
      </div>
    </section>
  );
}
