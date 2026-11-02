import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-control)] text-sm font-semibold tracking-wide transition-[color,background-color,border-color,transform,box-shadow,opacity] duration-200 ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-cream)] disabled:pointer-events-none disabled:opacity-50 motion-safe:active:scale-[0.98] aria-busy:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-tomato)] text-[var(--color-charcoal)] shadow-[0_8px_20px_-12px_rgba(var(--rgb-tomato),0.55)] hover:bg-[var(--color-tomato-deep)] hover:shadow-[0_10px_24px_-12px_rgba(var(--rgb-tomato),0.65)] active:bg-[var(--color-tomato-deeper)]",
        secondary:
          "bg-[var(--color-gold)] text-[var(--color-charcoal)] shadow-[0_8px_20px_-14px_rgba(var(--rgb-gold),0.55)] hover:bg-[var(--color-gold-deep)] hover:text-white active:bg-[var(--color-gold-deep)]",
        outline:
          "border border-[var(--color-charcoal)]/20 bg-transparent text-[var(--color-ink)] hover:border-[var(--color-tomato)] hover:text-[var(--color-tomato)] hover:bg-[var(--color-tomato)]/[0.04]",
        ghost:
          "bg-transparent text-[var(--color-ink)] hover:bg-[var(--color-charcoal)]/5",
        charcoal:
          "bg-[var(--color-charcoal)] text-[var(--color-cream)] hover:bg-[var(--color-charcoal-soft)] shadow-[0_8px_20px_-14px_rgba(var(--rgb-charcoal),0.5)]",
      },
      size: {
        sm: "h-10 min-h-10 px-3.5 text-xs",
        md: "h-11 min-h-11 px-5",
        lg: "h-12 min-h-12 px-7 text-base",
        icon: "h-11 w-11 min-h-11 min-w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <Loader2
          className="h-4 w-4 shrink-0 animate-spin"
          aria-hidden="true"
        />
      ) : null}
      <span className={cn(loading && "opacity-90")}>{children}</span>
    </button>
  ),
);
Button.displayName = "Button";

export { buttonVariants };
