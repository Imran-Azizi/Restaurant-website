"use client";

import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";
import { FadeIn } from "@/components/motion/FadeIn";
import { buttonVariants } from "@/components/ui/Button";
import { useTranslation } from "@/i18n/LanguageProvider";
import { getWhatsAppUrl, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type ContactSectionProps = {
  /** Full-page layout on `/contact` (h1 + page padding). Homepage uses section chrome. */
  asPage?: boolean;
};

export function ContactSection({ asPage = false }: ContactSectionProps) {
  const { t } = useTranslation();
  const wa = getWhatsAppUrl("Hello Zaitoon Pizza!");
  const Heading = asPage ? "h1" : "h2";

  return (
    <section
      id="contact"
      className={cn(
        asPage
          ? "mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16"
          : "border-t border-[var(--color-charcoal)]/8 bg-[color-mix(in_srgb,var(--color-charcoal)_4%,var(--color-cream))] section-pad",
      )}
      aria-labelledby="contact-heading"
    >
      <div
        className={cn(
          "grid gap-10 sm:gap-12 lg:grid-cols-2 lg:items-start lg:gap-16",
          !asPage && "mx-auto max-w-6xl px-4 sm:px-6",
        )}
      >
        <FadeIn>
          <Heading
            id="contact-heading"
            className={cn(
              "text-[var(--color-ink)]",
              asPage
                ? "heading-display text-4xl sm:text-5xl"
                : "heading-section text-3xl sm:text-4xl",
            )}
          >
            {t.contact.title}
          </Heading>
          <p
            className={cn(
              "mt-3 text-[var(--color-muted)] sm:mt-4",
              asPage && "body-measure",
            )}
          >
            {t.contact.sub}
          </p>

          <dl className="mt-8 space-y-6 text-sm sm:mt-10">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-olive)]">
                Address
              </dt>
              <dd className="mt-1.5 leading-relaxed text-[var(--color-ink)]">
                {siteConfig.contact.address}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-olive)]">
                {t.contact.phone}
              </dt>
              <dd className="mt-1.5">
                {siteConfig.contact.phoneHref ? (
                  <a
                    href={siteConfig.contact.phoneHref}
                    className="text-[var(--color-olive)] underline-offset-3 hover:underline"
                  >
                    {siteConfig.contact.phone}
                  </a>
                ) : (
                  <span className="text-[var(--color-ink)]">
                    {siteConfig.contact.phone}
                  </span>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-olive)]">
                Email
              </dt>
              <dd className="mt-1.5 text-[var(--color-ink)]">
                {siteConfig.contact.email}
              </dd>
            </div>
          </dl>

          {wa && (
            <Link
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "secondary" }), "mt-8")}
            >
              {t.common.whatsapp}
            </Link>
          )}
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="rounded-[var(--radius-card)] border border-[var(--color-charcoal)]/10 bg-[var(--color-surface)]/90 p-5 shadow-[var(--shadow-card)] sm:p-8">
            <ContactForm />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
