"use client";

import { DirectionProvider } from "@base-ui/react/direction-provider";
import { AnimateUIProvider } from "@animate-ui/react/provider";
import { Toaster } from "sonner";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider, useTranslation } from "@/i18n/LanguageProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";

function AppProviders({ children }: { children: React.ReactNode }) {
  const { dir } = useTranslation();

  return (
    <DirectionProvider direction={dir}>
      <CartProvider>
        <AnimateUIProvider tempo={0.95}>
          {children}
          <CartDrawer />
          <Toaster
            position="top-center"
            toastOptions={{
              className:
                "font-[family-name:var(--font-body)] border border-[var(--color-charcoal)]/12 bg-[var(--color-surface)] text-[var(--color-ink)]",
            }}
          />
        </AnimateUIProvider>
      </CartProvider>
    </DirectionProvider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AppProviders>{children}</AppProviders>
    </LanguageProvider>
  );
}
