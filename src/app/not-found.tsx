import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-olive)]">
        404
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[var(--color-ink)]">
        Page not found
      </h1>
      <p className="mt-3 text-[var(--color-muted)]">
        That slice isn&apos;t on the menu. Head back home or browse pizzas.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className={cn(buttonVariants({ variant: "primary" }))}>
          Home
        </Link>
        <Link href="/menu" className={cn(buttonVariants({ variant: "outline" }))}>
          Menu
        </Link>
      </div>
    </div>
  );
}
