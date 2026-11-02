"use client";

import * as React from "react";
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

function SheetRoot({ ...props }: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({ ...props }: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({ ...props }: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({ ...props }: SheetPrimitive.Portal.Props) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({
  className,
  ...props
}: SheetPrimitive.Backdrop.Props) {
  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-[80] bg-[var(--color-charcoal)]/50 transition-[opacity,backdrop-filter] duration-200 ease-[var(--ease-out)] supports-backdrop-filter:backdrop-blur-[2px]",
        "data-starting-style:opacity-0 data-ending-style:opacity-0",
        "motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  );
}

type SheetSide = "right" | "left" | "top" | "bottom";

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: SheetPrimitive.Popup.Props & {
  side?: SheetSide;
  showCloseButton?: boolean;
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          "fixed z-[80] flex flex-col bg-[var(--color-cream)] text-[var(--color-ink)] shadow-[0_24px_64px_-20px_rgba(var(--rgb-charcoal),0.48)] outline-none transition-[opacity,transform] duration-300 ease-[var(--ease-out)]",
          "data-starting-style:opacity-0 data-ending-style:opacity-0",
          "motion-reduce:transition-none",
          side === "right" &&
            "inset-y-0 right-0 h-full w-full max-w-md border-s border-[var(--color-charcoal)]/10 data-starting-style:translate-x-8 data-ending-style:translate-x-8",
          side === "left" &&
            "inset-y-0 left-0 h-full w-full max-w-md border-e border-[var(--color-charcoal)]/10 data-starting-style:-translate-x-8 data-ending-style:-translate-x-8",
          side === "top" &&
            "inset-x-0 top-0 h-auto border-b border-[var(--color-charcoal)]/10 data-starting-style:-translate-y-6 data-ending-style:-translate-y-6",
          side === "bottom" &&
            "inset-x-0 bottom-0 h-auto border-t border-[var(--color-charcoal)]/10 data-starting-style:translate-y-6 data-ending-style:translate-y-6",
          "motion-reduce:data-starting-style:translate-x-0 motion-reduce:data-ending-style:translate-x-0 motion-reduce:data-starting-style:translate-y-0 motion-reduce:data-ending-style:translate-y-0",
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton ? (
          <SheetPrimitive.Close
            data-slot="sheet-close"
            className="absolute end-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-control)] text-[var(--color-muted)] transition-[color,background-color,transform] duration-200 ease-[var(--ease-out)] hover:bg-[var(--color-charcoal)]/5 hover:text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] motion-safe:active:scale-[0.96]"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </SheetPrimitive.Close>
        ) : null}
      </SheetPrimitive.Popup>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn(
        "flex flex-col gap-0.5 border-b border-[var(--color-charcoal)]/10 px-5 py-4 pe-12",
        className,
      )}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn(
        "font-[family-name:var(--font-display)] text-2xl text-[var(--color-ink)]",
        className,
      )}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: SheetPrimitive.Description.Props) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-[var(--color-muted)]", className)}
      {...props}
    />
  );
}

type SheetProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  side?: SheetSide;
  children: React.ReactNode;
  className?: string;
};

/** Controlled sheet wrapper preserving the app’s open/onClose API. */
function Sheet({
  open,
  onClose,
  title,
  side = "right",
  children,
  className,
}: SheetProps) {
  return (
    <SheetRoot
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      <SheetContent side={side} className={className}>
        {title ? (
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
          </SheetHeader>
        ) : null}
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          {children}
        </div>
      </SheetContent>
    </SheetRoot>
  );
}

export {
  Sheet,
  SheetRoot,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
