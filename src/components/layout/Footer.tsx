"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/i18n/LanguageProvider";
import { siteConfig, getWhatsAppUrl } from "@/lib/site-config";

export function Footer() {
  const { t } = useTranslation();
  const year = 2026;
  const wa = getWhatsAppUrl();

  return (
    <footer className="mt-auto border-t border-white/8 text-[var(--color-cream)] texture-charcoal">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-14 md:grid-cols-3 md:gap-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="relative h-12 w-[4.5rem] shrink-0">
              <Image
                src={siteConfig.brand.logo}
                alt=""
                fill
                className="object-contain object-left"
                sizes="72px"
              />
            </span>
            <div>
              <p className="heading-section text-2xl">Zaitoon Pizza</p>
              <p className="mt-0.5 text-sm text-[var(--color-cream)]/65">
                {t.footer.tagline}
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-gold)]">
            {t.footer.visit}
          </p>
          <p className="text-sm leading-relaxed text-[var(--color-cream)]/80">
            {siteConfig.contact.address}
          </p>
          <p className="mt-2 text-sm text-[var(--color-cream)]/80">
            {siteConfig.contact.phone}
          </p>
          {wa && (
            <Link
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm text-[var(--color-gold)] underline-offset-3 hover:underline"
            >
              {t.common.whatsapp}
            </Link>
          )}
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
          <Link href="/menu" className="rounded-sm py-1.5 transition-colors hover:text-[var(--color-gold)]">
            {t.nav.menu}
          </Link>
          <Link href="/about" className="rounded-sm py-1.5 transition-colors hover:text-[var(--color-gold)]">
            {t.nav.about}
          </Link>
          <Link href="/gallery" className="rounded-sm py-1.5 transition-colors hover:text-[var(--color-gold)]">
            {t.nav.gallery}
          </Link>
          <Link href="/contact" className="rounded-sm py-1.5 transition-colors hover:text-[var(--color-gold)]">
            {t.nav.contact}
          </Link>
          <Link href="/cart" className="rounded-sm py-1.5 transition-colors hover:text-[var(--color-gold)]">
            {t.nav.cart}
          </Link>
          <Link href="/privacy" className="rounded-sm py-1.5 transition-colors hover:text-[var(--color-gold)]">
            {t.nav.privacy}
          </Link>
          <Link href="/terms" className="rounded-sm py-1.5 transition-colors hover:text-[var(--color-gold)]">
            {t.nav.terms}
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-[var(--color-cream)]/50">
        © {year} {siteConfig.name}. {t.footer.rights}
      </div>
    </footer>
  );
}
