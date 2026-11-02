"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getFeaturedPizzas, getLowestPrice } from "@/data/menu";
import { useTranslation } from "@/i18n/LanguageProvider";
import { formatAFN } from "@/lib/format";
import { buttonVariants } from "@/components/ui/Button";
import { getWhatsAppUrl } from "@/lib/site-config";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Hero() {
  const { t, locale } = useTranslation();
  const items = getFeaturedPizzas().slice(0, 4);
  const containerRef = useRef<HTMLElement>(null);
  const wa = getWhatsAppUrl("Hello! I'd like to order from Zaitoon Pizza.");

  useGSAP(
    () => {
      const root = containerRef.current;
      if (!root || items.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions!;
          const panels = gsap.utils.toArray<HTMLElement>(".product-panel", root);
          const pizzas = gsap.utils.toArray<HTMLElement>(".product-pizza", root);
          const progressDots = gsap.utils.toArray<HTMLElement>(
            ".product-progress-dot",
            root,
          );
          const stage = root.querySelector<HTMLElement>(".product-stage");

          if (!stage || panels.length === 0 || pizzas.length === 0) return;

          if (reduceMotion) {
            gsap.set(panels, { clearProps: "all" });
            gsap.set(pizzas, { clearProps: "all" });
            gsap.set(progressDots, { clearProps: "all" });
            root.classList.add("product-scroll--static");
            return () => root.classList.remove("product-scroll--static");
          }

          root.classList.remove("product-scroll--static");

          gsap.set(panels, { autoAlpha: 0, y: 28 });
          gsap.set(panels[0], { autoAlpha: 1, y: 0 });
          gsap.set(pizzas, { autoAlpha: 0, scale: 0.92, rotation: -6 });
          gsap.set(pizzas[0], {
            autoAlpha: 1,
            scale: isDesktop ? 0.96 : 0.94,
            rotation: -4,
          });
          gsap.set(progressDots, { scale: 0.7, autoAlpha: 0.35 });
          gsap.set(progressDots[0], { scale: 1, autoAlpha: 1 });

          const pinDistance = isDesktop
            ? Math.max(items.length * 900, 2800)
            : Math.max(items.length * 720, 2200);

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: stage,
              start: "top top",
              end: `+=${pinDistance}`,
              pin: true,
              scrub: isDesktop ? 1 : 0.65,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          const segment = 1 / Math.max(items.length - 1, 1);

          tl.to(
            pizzas[0],
            {
              scale: isDesktop ? 1.05 : 1.02,
              rotation: isDesktop ? 8 : 4,
              duration: segment * 0.55,
            },
            0,
          );

          items.forEach((_, i) => {
            if (i === 0) return;

            const at = (i - 0.5) * segment;
            const fadeDur = segment * 0.4;

            tl.to(
              panels[i - 1],
              { autoAlpha: 0, y: isDesktop ? -22 : -14, duration: fadeDur },
              at,
            );
            tl.fromTo(
              panels[i],
              { autoAlpha: 0, y: isDesktop ? 26 : 16 },
              {
                autoAlpha: 1,
                y: 0,
                duration: fadeDur,
                immediateRender: false,
              },
              at,
            );

            tl.to(
              pizzas[i - 1],
              { autoAlpha: 0, scale: 0.9, duration: fadeDur },
              at,
            );
            tl.fromTo(
              pizzas[i],
              {
                autoAlpha: 0,
                scale: 0.9,
                rotation: isDesktop ? -8 + i * 4 : -4 + i * 2,
              },
              {
                autoAlpha: 1,
                scale: isDesktop ? 1.04 : 1.01,
                rotation: isDesktop ? 8 + i * 6 : 4 + i * 3,
                duration: fadeDur,
                immediateRender: false,
              },
              at,
            );

            tl.to(
              progressDots[i - 1],
              { scale: 0.7, autoAlpha: 0.35, duration: fadeDur * 0.7 },
              at,
            );
            tl.to(
              progressDots[i],
              { scale: 1, autoAlpha: 1, duration: fadeDur * 0.7 },
              at,
            );
          });
        },
        root,
      );

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [items.length, locale], revertOnUpdate: true },
  );

  return (
    <section
      ref={containerRef}
      className="product-scroll relative isolate bg-[var(--color-charcoal)] text-[var(--color-cream)]"
      aria-label={t.sections.productScrollTitle}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_12%,rgba(232,193,90,0.2),transparent_48%),radial-gradient(ellipse_at_88%_78%,rgba(245,184,0,0.14),transparent_42%)]" />

      <div className="product-stage relative flex min-h-[100svh] flex-col justify-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28 lg:grid-cols-2 lg:gap-16 lg:py-0 lg:pt-8">
          <div className="relative order-2 flex flex-col justify-center lg:order-1">
            <div className="product-copy-stack relative min-h-[13.5rem] sm:min-h-[14.5rem]">
              {items.map((item, index) => {
                const displayName =
                  locale === "fa-AF" && item.nameDari
                    ? item.nameDari
                    : locale === "ps" && item.namePashto
                      ? item.namePashto
                      : item.name;
                const from = getLowestPrice(item);

                return (
                  <article
                    key={item.id}
                    className="product-panel absolute inset-x-0 top-0 will-change-[transform,opacity]"
                    data-index={index}
                  >
                    <h2 className="heading-section text-2xl text-[var(--color-cream)] sm:text-3xl md:text-[2.75rem]">
                      {displayName}
                    </h2>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--color-cream)]/65">
                      {item.description}
                    </p>
                    <p className="mt-4 text-sm font-semibold tabular-nums text-[var(--color-gold)]">
                      <span className="font-normal text-[var(--color-cream)]/55">
                        {t.common.from}
                      </span>{" "}
                      {formatAFN(from, locale)}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                      {item.ingredients.slice(0, 4).map((ing) => (
                        <li
                          key={ing}
                          className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-cream)]/45"
                        >
                          {ing}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/menu/${item.slug}`}
                      className={cn(
                        buttonVariants({ variant: "outline", size: "sm" }),
                        "mt-5 pointer-events-auto border-[var(--color-cream)]/30 text-[var(--color-cream)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]",
                      )}
                    >
                      {t.common.learnMore}
                    </Link>
                  </article>
                );
              })}
            </div>

            <div className="mt-10 flex items-center gap-2" aria-hidden="true">
              {items.map((item, index) => (
                <span
                  key={item.id}
                  className="product-progress-dot h-2 w-2 rounded-full bg-[var(--color-gold)] will-change-transform"
                  data-index={index}
                />
              ))}
            </div>

            <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap">
              <Link
                href="/menu"
                className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
              >
                {t.hero.ctaMenu}
              </Link>
              {wa ? (
                <Link
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "border-[var(--color-cream)]/35 text-[var(--color-cream)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]",
                  )}
                >
                  {t.hero.ctaOrder}
                </Link>
              ) : (
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "border-[var(--color-cream)]/35 text-[var(--color-cream)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]",
                  )}
                >
                  {t.hero.ctaOrder}
                </Link>
              )}
            </div>
          </div>

          <div className="product-visual relative order-1 mx-auto aspect-square w-full max-w-[20rem] sm:max-w-[24rem] lg:order-2 lg:max-w-none">
            <div
              aria-hidden
              className="absolute inset-[4%] rounded-full bg-[radial-gradient(circle,rgba(245,184,0,0.28),transparent_68%)] blur-[2px]"
            />
            <div
              aria-hidden
              className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle,rgba(245,184,0,0.16),transparent_70%)]"
            />
            {items.map((item, index) => (
              <div
                key={item.id}
                className="product-pizza absolute inset-0 will-change-transform"
                data-index={index}
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  priority={index === 0}
                  className="rounded-full object-cover shadow-[0_34px_90px_rgba(0,0,0,0.5)]"
                  sizes="(max-width:768px) 80vw, 42vw"
                />
                <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-[var(--color-gold)]/30 ring-offset-2 ring-offset-transparent" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
