import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-[132px] w-full rounded-[var(--radius-control)] border border-[var(--color-charcoal)]/15 bg-white/70 px-3.5 py-3 text-sm leading-relaxed text-[var(--color-ink)] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] transition-[border-color,box-shadow,background-color] duration-200 ease-[var(--ease-out)] placeholder:text-[color-mix(in_srgb,var(--color-ink)_42%,transparent)] hover:border-[var(--color-charcoal)]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]/40 focus-visible:border-[var(--color-gold)]/50 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
