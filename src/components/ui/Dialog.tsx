"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

function DialogRoot({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 z-[90] bg-[var(--color-charcoal)]/55 transition-[opacity,backdrop-filter] duration-200 ease-[var(--ease-out)] supports-backdrop-filter:backdrop-blur-[2px]",
        "data-starting-style:opacity-0 data-ending-style:opacity-0",
        "motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  size = "md",
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean;
  size?: "md" | "lg" | "xl";
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-[90] grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-cream)] text-[var(--color-ink)] shadow-[0_24px_64px_-28px_rgba(var(--rgb-charcoal),0.5)] outline-none ring-1 ring-[var(--color-charcoal)]/10",
          "transition-[opacity,transform] duration-200 ease-[var(--ease-out)]",
          "data-starting-style:opacity-0 data-starting-style:scale-[0.97]",
          "data-ending-style:opacity-0 data-ending-style:scale-[0.97]",
          "motion-reduce:transition-none motion-reduce:data-starting-style:scale-100 motion-reduce:data-ending-style:scale-100",
          size === "md" && "sm:max-w-lg",
          size === "lg" && "sm:max-w-3xl",
          size === "xl" && "sm:max-w-5xl",
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton ? (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="absolute end-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-control)] text-[var(--color-muted)] transition-[color,background-color,transform] duration-200 ease-[var(--ease-out)] hover:bg-[var(--color-charcoal)]/5 hover:text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] motion-safe:active:scale-[0.96]"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </DialogPrimitive.Close>
        ) : null}
      </DialogPrimitive.Popup>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        "flex flex-col gap-1 border-b border-[var(--color-charcoal)]/10 px-4 py-3 pe-12",
        className,
      )}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 border-t border-[var(--color-charcoal)]/10 bg-[var(--color-cream-deep)]/40 p-4 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "font-[family-name:var(--font-display)] text-xl leading-none text-[var(--color-ink)]",
        className,
      )}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-sm text-[var(--color-muted)]", className)}
      {...props}
    />
  );
}

type DialogProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  size?: "md" | "lg" | "xl";
};

/** Controlled dialog wrapper preserving the app’s open/onClose API. */
function Dialog({
  open,
  onClose,
  title,
  children,
  className,
  size = "lg",
}: DialogProps) {
  return (
    <DialogRoot
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      <DialogContent size={size} className={cn("p-0", className)}>
        {title ? (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        ) : null}
        <div className="overflow-y-auto">{children}</div>
      </DialogContent>
    </DialogRoot>
  );
}

export {
  Dialog,
  DialogRoot,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
