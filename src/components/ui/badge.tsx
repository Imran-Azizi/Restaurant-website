import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full px-1.5 text-[10px] font-bold leading-none tabular-nums",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-tomato)] text-[var(--color-charcoal)]",
        secondary: "bg-[var(--color-gold)] text-[var(--color-charcoal)]",
        outline:
          "border border-[var(--color-charcoal)]/15 bg-transparent text-[var(--color-ink)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { badgeVariants };
