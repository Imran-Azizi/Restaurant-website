"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "motion/react";
import { useTranslation } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

type ScrollProgressProps = {
  className?: string;
};

function readScrollProgress() {
  const el = document.documentElement;
  const max = Math.max(el.scrollHeight - el.clientHeight, 0);
  if (max <= 0) return 0;
  const top = window.scrollY || el.scrollTop || 0;
  return Math.min(1, Math.max(0, top / max));
}

/**
 * Fixed page scroll indicator along the bottom edge of the sticky header.
 */
export function ScrollProgress({ className }: ScrollProgressProps) {
  const { dir } = useTranslation();
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const fillRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const targetRef = useRef(0);
  const currentRef = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const fill = fillRef.current;
    if (!fill) return;

    const apply = (value: number) => {
      fill.style.transform = `scaleX(${value})`;
    };

    const measure = () => {
      targetRef.current = readScrollProgress();
    };

    const tick = () => {
      const target = targetRef.current;
      if (reduce) {
        currentRef.current = target;
      } else {
        currentRef.current += (target - currentRef.current) * 0.2;
        if (Math.abs(target - currentRef.current) < 0.0005) {
          currentRef.current = target;
        }
      }
      apply(currentRef.current);
      frameRef.current = window.requestAnimationFrame(tick);
    };

    measure();
    apply(targetRef.current);
    frameRef.current = window.requestAnimationFrame(tick);

    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure, { passive: true });

    return () => {
      window.cancelAnimationFrame(frameRef.current);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [mounted, pathname, reduce]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 z-[9999] h-1",
        className,
      )}
      style={{
        position: "fixed",
        top: "var(--site-header-height, 4.25rem)",
        left: 0,
        right: 0,
        zIndex: 9999,
      }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(244, 239, 250, 0.16)" }}
      />
      <div
        ref={fillRef}
        className="absolute inset-y-0 start-0 h-full w-full"
        style={{
          transform: "scaleX(0)",
          transformOrigin: dir === "rtl" ? "100% 50%" : "0% 50%",
          willChange: "transform",
          backgroundImage:
            "linear-gradient(90deg, #f5b800 0%, #e8c15a 48%, #f5b800 100%)",
          boxShadow: "0 0 16px rgba(245, 184, 0, 0.45)",
        }}
      />
    </div>,
    document.body,
  );
}
