"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Button as AnimateButton } from "@animate-ui/react/primitives/buttons/button";
import {
  Highlight,
  HighlightItem,
} from "@animate-ui/react/primitives/effects/highlight";
import { MorphingText } from "@animate-ui/react/primitives/texts/morphing";
import { SlidingNumber } from "@animate-ui/react/primitives/texts/sliding-number";
import { Check, ChevronLeft, ChevronRight, Loader2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { getLowestPrice, menuItems, type MenuItem } from "@/data/menu";
import { useCart } from "@/context/CartContext";
import { useTranslation } from "@/i18n/LanguageProvider";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ORBIT_SLOTS = 5;
const easeOut = [0.22, 1, 0.36, 1] as const;
const easeIn = [0.4, 0, 1, 1] as const;
const springOrbit = { type: "spring" as const, stiffness: 300, damping: 28, mass: 0.85 };
const springSoft = { type: "spring" as const, stiffness: 380, damping: 32 };
const springPlate = { type: "spring" as const, stiffness: 240, damping: 26, mass: 0.9 };

const plateVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    scale: 0.84,
    rotateY: dir * 32,
    y: 12,
    zIndex: 2,
    filter: "blur(10px) saturate(0.92)",
    transition: {
      opacity: { duration: 0.4, ease: easeOut },
      filter: { duration: 0.45, ease: easeOut },
      y: { duration: 0.48, ease: easeOut },
      rotateY: springPlate,
      scale: springPlate,
    },
  }),
  center: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    y: 0,
    zIndex: 2,
    filter: "blur(0px) saturate(1)",
    transition: {
      opacity: { duration: 0.38, ease: easeOut },
      filter: { duration: 0.42, ease: easeOut },
      y: { duration: 0.45, ease: easeOut },
      rotateY: springPlate,
      scale: springPlate,
    },
  },
  exit: (dir: number) => ({
    opacity: 0,
    scale: 0.9,
    rotateY: dir * -28,
    y: -8,
    zIndex: 1,
    filter: "blur(8px) saturate(0.95)",
    transition: {
      duration: 0.32,
      ease: easeIn,
    },
  }),
};

const plateVariantsReduced = {
  enter: { opacity: 0, transition: { duration: 0.2 } },
  center: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

function orbitPoint(slot: number, slots: number, rx: number, ry: number) {
  const start = (205 * Math.PI) / 180;
  const end = (335 * Math.PI) / 180;
  const t = slots <= 1 ? 0.5 : slot / (slots - 1);
  const angle = start + (end - start) * t;
  return {
    x: Math.cos(angle) * rx,
    y: Math.sin(angle) * ry,
  };
}

function orbitWindow(active: number, total: number, slots: number) {
  if (total <= 0) return [] as number[];
  const count = Math.min(slots, total);
  const half = Math.floor(count / 2);
  return Array.from({ length: count }, (_, i) => {
    return (((active - half + i) % total) + total) % total;
  });
}

function displayName(item: MenuItem, locale: string) {
  if (locale === "fa-AF" && item.nameDari) return item.nameDari;
  if (locale === "ps" && item.namePashto) return item.namePashto;
  return item.name;
}

function currencyLabel(locale: string) {
  return locale === "en" ? "AFN" : "افغانی";
}

export function OrbitMenuShowcase() {
  const { t, locale } = useTranslation();
  const { addItem } = useCart();
  const reduceMotion = useReducedMotion();
  const items = useMemo(() => menuItems, []);
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [orbit, setOrbit] = useState({ rx: 200, ry: 148 });
  const [cartState, setCartState] = useState<"idle" | "loading" | "done">(
    "idle",
  );
  const [platePulse, setPlatePulse] = useState(0);

  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const cartTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const current = items[active] ?? items[0];
  const price = current ? getLowestPrice(current) : 0;
  const total = items.length;
  const title = current ? displayName(current, locale) : "";
  const windowIndices = useMemo(
    () => orbitWindow(active, total, Math.min(ORBIT_SLOTS, total)),
    [active, total],
  );

  useEffect(() => {
    return () => {
      if (cartTimerRef.current) clearTimeout(cartTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const measure = () => {
      const w = stage.clientWidth;
      setOrbit({
        rx: Math.max(118, Math.min(220, w * 0.42)),
        ry: Math.max(92, Math.min(162, w * 0.31)),
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    return () => ro.disconnect();
  }, []);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          allowMotion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduceMotion } = context.conditions!;
          const disc = root.querySelector<HTMLElement>("[data-orbit-disc]");
          const path = pathRef.current;
          const thumbs = gsap.utils.toArray<HTMLElement>(
            "[data-orbit-thumb]",
            root,
          );
          const plate = root.querySelector<HTMLElement>("[data-orbit-plate]");
          const stageBits = [disc, plate, ...thumbs].filter(Boolean);

          if (reduceMotion) {
            gsap.set(stageBits, { clearProps: "all" });
            if (path) {
              gsap.set(path, {
                clearProps: "strokeDashoffset,strokeDasharray",
              });
            }
            return;
          }

          gsap.set(disc, {
            scale: 0.78,
            autoAlpha: 0,
            transformOrigin: "50% 50%",
          });
          gsap.set(thumbs, {
            scale: 0.45,
            autoAlpha: 0,
            transformOrigin: "50% 50%",
          });
          gsap.set(plate, {
            scale: 0.82,
            autoAlpha: 0,
            yPercent: 6,
            transformOrigin: "50% 60%",
          });

          if (path) {
            const length = path.getTotalLength();
            gsap.set(path, {
              strokeDasharray: length,
              strokeDashoffset: length,
            });
          }

          const tl = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: root,
              start: "top 85%",
              once: true,
              immediateRender: false,
            },
          });

          tl.to(disc, { scale: 1, autoAlpha: 1, duration: 0.9 }, 0);

          if (path) {
            tl.to(
              path,
              {
                strokeDashoffset: 0,
                duration: 1.1,
                ease: "power2.inOut",
                onComplete: () => {
                  gsap.set(path, {
                    strokeDasharray: "0.9 1.7",
                    strokeDashoffset: 0,
                  });
                },
              },
              0.16,
            );
          }

          tl.to(
            thumbs,
            {
              scale: 1,
              autoAlpha: 1,
              duration: 0.55,
              stagger: { each: 0.06, from: "center" },
              ease: "back.out(1.35)",
              clearProps: "transform",
            },
            0.4,
          );

          tl.to(
            plate,
            {
              scale: 1,
              autoAlpha: 1,
              yPercent: 0,
              duration: 0.8,
              clearProps: "transform",
            },
            0.5,
          );

          requestAnimationFrame(() => ScrollTrigger.refresh());
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  const goTo = useCallback(
    (next: number) => {
      if (!items.length || next === active) return;
      const wrapped = ((next % items.length) + items.length) % items.length;
      const forward =
        (wrapped - active + items.length) % items.length <= items.length / 2;
      setDirection(forward ? 1 : -1);
      setActive(wrapped);
      setPlatePulse((n) => n + 1);
      setCartState("idle");
      if (cartTimerRef.current) clearTimeout(cartTimerRef.current);
    },
    [active, items.length],
  );

  const onStageKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(active - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(active + 1);
    }
  };

  const handleAddToCart = () => {
    if (!current || cartState === "loading") return;
    const size = current.sizes[0];
    if (!size) return;

    setCartState("loading");
    addItem({
      id: current.id,
      slug: current.slug,
      name: displayName(current, locale),
      sizeId: size.id,
      sizeLabel: size.label,
      unitPrice: size.price,
      image: current.image,
    });

    if (cartTimerRef.current) clearTimeout(cartTimerRef.current);
    cartTimerRef.current = setTimeout(() => {
      setCartState("done");
      toast.success(`${displayName(current, locale)} · ${size.label}`);
      cartTimerRef.current = setTimeout(() => setCartState("idle"), 1400);
    }, 420);
  };

  if (!current) return null;

  const activePlateVariants = reduceMotion ? plateVariantsReduced : plateVariants;

  return (
    <section
      ref={rootRef}
      id="orbit"
      aria-label="Menu orbit showcase"
      className="relative isolate overflow-hidden bg-[var(--color-cream)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 58% 48% at 72% 46%, color-mix(in srgb, var(--color-surface) 88%, transparent) 0%, transparent 72%),
            radial-gradient(ellipse 42% 36% at 18% 78%, color-mix(in srgb, var(--color-gold) 14%, transparent) 0%, transparent 70%),
            linear-gradient(180deg, color-mix(in srgb, var(--color-surface) 55%, var(--color-cream)) 0%, var(--color-cream) 48%, color-mix(in srgb, var(--color-cream) 92%, var(--color-gold) 8%) 100%)
          `,
        }}
      />

      <div className="relative z-[1] mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 sm:gap-10 sm:px-6 sm:py-16 md:gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] lg:gap-6 lg:py-[4.75rem] xl:gap-10 xl:py-24">
        {/* Product copy */}
        <div
          className="relative z-[2] order-2 mx-auto w-full max-w-md text-center lg:order-1 lg:mx-0 lg:pb-8 lg:text-start"
          aria-live="polite"
        >
          <p className="inline-flex items-baseline justify-center gap-[0.3em] font-[family-name:var(--font-display)] text-[3.15rem] font-medium leading-none tracking-[-0.038em] text-[var(--color-tomato)] sm:text-6xl md:text-[4.15rem] lg:justify-start">
            <SlidingNumber
              number={price}
              initiallyStable
              inView
              className="tabular-nums"
            />
            <span className="translate-y-[-0.08em] text-[0.38em] font-semibold tracking-[0.04em] text-[var(--color-tomato)]/80">
              {currencyLabel(locale)}
            </span>
          </p>

          <h2 className="heading-display mt-5 text-[1.85rem] leading-[1.08] tracking-[-0.025em] text-[var(--color-ink)] sm:mt-6 sm:text-[2.35rem] md:text-[2.75rem]">
            <MorphingText text={title} className="inline-block" />
          </h2>

          <div className="mx-auto mt-4 max-w-[36ch] sm:mt-5 lg:mx-0">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={current.id}
                initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(3px)" }}
                transition={{ duration: 0.34, ease: easeOut }}
                className="text-[0.95rem] leading-[1.72] text-[var(--color-muted)] sm:text-[1.02rem]"
              >
                {current.description}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex justify-center sm:mt-9 lg:justify-start">
            <AnimateButton
              type="button"
              tapScale={0.97}
              hoverScale={1.02}
              disabled={cartState === "loading"}
              aria-busy={cartState === "loading" || undefined}
              className={cn(
                buttonVariants({ variant: "primary", size: "lg" }),
                "min-w-[11.5rem] rounded-full px-9 text-[0.95rem] shadow-[0_18px_36px_-16px_rgba(var(--rgb-tomato),0.5)] transition-[box-shadow,background-color] duration-300 hover:shadow-[0_22px_44px_-16px_rgba(var(--rgb-tomato),0.62)]",
              )}
              onClick={handleAddToCart}
            >
              <span className="inline-flex items-center gap-2.5">
                {cartState === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                ) : cartState === "done" ? (
                  <Check className="h-4 w-4" strokeWidth={2.25} aria-hidden />
                ) : (
                  <ShoppingBag className="h-4 w-4" strokeWidth={1.9} aria-hidden />
                )}
                <span>{t.common.addToCart}</span>
              </span>
            </AnimateButton>
          </div>
        </div>

        {/* Stage */}
        <div
          className="relative z-[1] order-1 mx-auto w-full max-w-[22.5rem] sm:max-w-[30rem] md:max-w-[34rem] lg:order-2 lg:max-w-[40rem] xl:max-w-[42rem]"
          tabIndex={0}
          role="group"
          aria-roledescription="carousel"
          aria-label={`Menu carousel, item ${active + 1} of ${total}`}
          onKeyDown={onStageKeyDown}
        >
          <div className="relative mx-auto w-full">
            <div
              ref={stageRef}
              className="relative mx-auto aspect-square w-full"
            >
              {/* Soft stage disc */}
              <div
                data-orbit-disc
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-[46%] h-[96%] w-[96%] -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform"
                style={{
                  background: `
                    radial-gradient(circle at 30% 24%, rgba(255,255,255,0.95) 0%, transparent 38%),
                    radial-gradient(circle at 72% 70%, color-mix(in srgb, var(--color-gold) 18%, transparent) 0%, transparent 46%),
                    radial-gradient(circle at 50% 52%, #fffcff 0%, color-mix(in srgb, var(--color-cream) 72%, var(--color-gold) 28%) 55%, color-mix(in srgb, var(--color-cream) 78%, var(--color-gold) 22%) 100%)
                  `,
                  boxShadow: `
                    inset 0 1px 0 rgba(255,255,255,0.75),
                    inset 0 -28px 56px color-mix(in srgb, var(--color-gold) 14%, transparent),
                    0 28px 60px -36px color-mix(in srgb, var(--color-charcoal) 28%, transparent)
                  `,
                }}
              />

              {/* Dashed orbit path */}
              <svg
                className="pointer-events-none absolute inset-0 z-[1] h-full w-full text-[var(--color-charcoal)]/20"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden
              >
                <path
                  ref={pathRef}
                  d="M 13 51 A 37 30 0 0 1 87 51"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.42"
                  strokeDasharray="0.9 1.7"
                  strokeLinecap="round"
                />
              </svg>

              {/* Orbit thumbs */}
              <div className="absolute inset-0 z-[2]">
                {windowIndices.map((itemIndex, slot) => {
                  const item = items[itemIndex];
                  if (!item) return null;
                  const point = orbitPoint(
                    slot,
                    windowIndices.length,
                    orbit.rx,
                    orbit.ry,
                  );
                  const selected = itemIndex === active;

                  return (
                    <motion.div
                      key={`orbit-slot-${slot}`}
                      className={cn(
                        "absolute left-1/2 top-[39%] h-[4.25rem] w-[4.25rem] sm:h-[5rem] sm:w-[5rem] md:h-[5.35rem] md:w-[5.35rem]",
                        selected ? "z-[5]" : "z-[3]",
                      )}
                      initial={false}
                      animate={{
                        x: `calc(-50% + ${point.x}px)`,
                        y: `calc(-50% + ${point.y}px)`,
                        scale: selected ? 1.12 : 1,
                      }}
                      transition={springOrbit}
                    >
                      <AnimateButton
                        type="button"
                        tapScale={0.94}
                        hoverScale={selected ? 1 : 1.05}
                        onClick={() => goTo(itemIndex)}
                        aria-label={displayName(item, locale)}
                        aria-pressed={selected}
                        title={displayName(item, locale)}
                        className="h-full w-full rounded-full bg-transparent p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-cream)]"
                      >
                        <span
                          data-orbit-thumb
                          className={cn(
                            "relative block h-full w-full overflow-hidden rounded-full bg-[var(--color-surface)] transition-[box-shadow] duration-300 ease-[var(--ease-out)]",
                            selected
                              ? "shadow-[0_16px_32px_-10px_rgba(var(--rgb-charcoal),0.4),0_0_0_3px_var(--color-tomato),0_0_0_6px_rgba(255,255,255,0.95)]"
                              : "shadow-[0_12px_26px_-12px_rgba(var(--rgb-charcoal),0.35),0_0_0_3px_#fff] hover:shadow-[0_16px_30px_-10px_rgba(var(--rgb-charcoal),0.4),0_0_0_3px_rgba(var(--rgb-gold),0.85)]",
                          )}
                        >
                          <Image
                            src={item.image}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="90px"
                          />
                          {selected ? (
                            <span
                              aria-hidden
                              className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/35"
                            />
                          ) : null}
                        </span>
                      </AnimateButton>
                    </motion.div>
                  );
                })}
              </div>

              {/* Hero plate */}
              <div
                data-orbit-plate
                className="absolute left-1/2 top-[60%] z-[4] w-[68%] max-w-[22rem] -translate-x-1/2 -translate-y-1/2 sm:w-[64%] sm:max-w-[23.5rem] md:w-[62%] md:max-w-[25rem]"
                style={{ perspective: reduceMotion ? undefined : 1200 }}
              >
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-[6%] left-1/2 h-[18%] w-[78%] -translate-x-1/2 rounded-[100%] bg-[var(--color-charcoal)]/25 blur-[18px]"
                  animate={
                    reduceMotion
                      ? undefined
                      : { opacity: [0.55, 0.28, 0.55], scaleX: [1, 0.92, 1] }
                  }
                  transition={{ duration: 0.55, ease: easeOut }}
                  key={`shadow-${platePulse}`}
                />
                <motion.div
                  className="relative aspect-square overflow-hidden rounded-full bg-[var(--color-cream)] [transform-style:preserve-3d]"
                  style={{
                    boxShadow: `
                      0 40px 64px -28px rgba(var(--rgb-charcoal),0.5),
                      0 18px 28px -16px rgba(var(--rgb-charcoal),0.3),
                      0 0 0 1px color-mix(in srgb, var(--color-charcoal) 7%, transparent),
                      inset 0 1px 0 rgba(255,255,255,0.35)
                    `,
                  }}
                  animate={
                    reduceMotion
                      ? { scale: 1 }
                      : platePulse === 0
                        ? { scale: 1 }
                        : { scale: [1, 0.965, 1] }
                  }
                  transition={springPlate}
                >
                  <AnimatePresence
                    mode="sync"
                    custom={direction}
                    initial={false}
                  >
                    <motion.div
                      key={current.id}
                      custom={direction}
                      variants={activePlateVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="absolute inset-0 will-change-transform"
                      style={{
                        backfaceVisibility: "hidden",
                        transformOrigin: "50% 50%",
                      }}
                    >
                      <Image
                        src={current.image}
                        alt={displayName(current, locale)}
                        fill
                        className="object-cover"
                        sizes="(max-width:640px) 70vw, (max-width:1024px) 40vw, 400px"
                        priority
                        quality={90}
                      />
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 rounded-full"
                        style={{
                          background:
                            "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.22) 0%, transparent 42%), radial-gradient(circle at 70% 78%, rgba(var(--rgb-charcoal),0.2) 0%, transparent 48%)",
                        }}
                      />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Nav controls */}
              <AnimateButton
                type="button"
                data-orbit-nav
                tapScale={0.94}
                hoverScale={1.05}
                onClick={() => goTo(active - 1)}
                aria-label="Previous item"
                className="absolute bottom-[4%] left-[8%] z-[6] inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-charcoal)]/[0.08] bg-white text-[var(--color-charcoal)] shadow-[0_14px_28px_-12px_rgba(var(--rgb-charcoal),0.35)] transition-[box-shadow,background-color,border-color] duration-200 hover:border-[var(--color-tomato)]/40 hover:bg-[var(--color-cream)] hover:shadow-[0_18px_34px_-12px_rgba(var(--rgb-tomato),0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] sm:left-[11%] sm:h-12 sm:w-12 md:bottom-[5%]"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={1.85} />
              </AnimateButton>
              <AnimateButton
                type="button"
                data-orbit-nav
                tapScale={0.94}
                hoverScale={1.05}
                onClick={() => goTo(active + 1)}
                aria-label="Next item"
                className="absolute bottom-[4%] right-[8%] z-[6] inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-charcoal)]/[0.08] bg-white text-[var(--color-charcoal)] shadow-[0_14px_28px_-12px_rgba(var(--rgb-charcoal),0.35)] transition-[box-shadow,background-color,border-color] duration-200 hover:border-[var(--color-tomato)]/40 hover:bg-[var(--color-cream)] hover:shadow-[0_18px_34px_-12px_rgba(var(--rgb-tomato),0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] sm:right-[11%] sm:h-12 sm:w-12 md:bottom-[5%]"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={1.85} />
              </AnimateButton>
            </div>

            {/* Pager */}
            <div className="mt-5 flex flex-col items-center gap-3 sm:mt-6">
              <p
                aria-label={`${active + 1} of ${total}`}
                className="flex items-baseline text-[0.7rem] font-semibold tracking-[0.14em] text-[var(--color-muted)]"
              >
                <SlidingNumber
                  number={active + 1}
                  initiallyStable
                  aria-hidden
                  className="tabular-nums text-[var(--color-ink)]"
                />
                <span className="mx-1.5 opacity-35" aria-hidden>
                  /
                </span>
                <span className="tabular-nums" aria-hidden>
                  {total}
                </span>
              </p>

              <Highlight
                mode="parent"
                value={String(active)}
                onValueChange={(value) => {
                  if (value == null) return;
                  goTo(Number(value));
                }}
                forceUpdateBounds
                className="rounded-full bg-[var(--color-tomato)]"
                containerClassName="relative flex max-w-[18rem] flex-wrap items-center justify-center gap-1.5"
                transition={springSoft}
              >
                {items.map((item, index) => (
                  <HighlightItem key={item.id} value={String(index)} asChild>
                    <button
                      type="button"
                      aria-label={`${displayName(item, locale)} (${index + 1} of ${total})`}
                      className={cn(
                        "relative z-[1] h-1.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]",
                        index === active
                          ? "w-6"
                          : "w-1.5 bg-[var(--color-charcoal)]/14 hover:bg-[var(--color-charcoal)]/28",
                      )}
                    />
                  </HighlightItem>
                ))}
              </Highlight>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
