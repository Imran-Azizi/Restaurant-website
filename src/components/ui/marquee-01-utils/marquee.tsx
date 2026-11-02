import { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] gap-(--gap)",
        vertical ? "flex-col" : "flex-row",
        pauseOnHover && "zp-marquee-paused",
        className,
      )}
    >
      {Array.from({ length: repeat }, (_, i) => (
        <div
          key={i}
          aria-hidden={i > 0 || undefined}
          className={cn(
            "flex shrink-0 justify-around gap-(--gap) will-change-transform",
            vertical ? "flex-col zp-marquee-vertical" : "flex-row zp-marquee",
            reverse && "zp-marquee-reverse",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
