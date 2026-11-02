/**
 * Central site configuration.
 * PLACEHOLDER values must be replaced with verified restaurant details before launch.
 */

export const siteConfig = {
  name: "Zaitoon Pizza",
  legalName: "Zaitoon Pizza Restaurant",
  tagline: "Every slice, a little more joy.",
  description:
    "Freshly prepared pizzas, generous flavor, and welcoming service for families and friends in Afghanistan.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://zaitoon.example",
  locale: "en",
  currency: "AFN" as const,
  city: "Kabul, Afghanistan",

  contact: {
    /** PLACEHOLDER — replace with verified street address */
    address: "[Address to be confirmed] — Kabul, Afghanistan",
    /** PLACEHOLDER — set NEXT_PUBLIC_PHONE or replace */
    phone: process.env.NEXT_PUBLIC_PHONE ?? "[Phone to be confirmed]",
    phoneHref: process.env.NEXT_PUBLIC_PHONE
      ? `tel:${process.env.NEXT_PUBLIC_PHONE.replace(/\s+/g, "")}`
      : undefined,
    /** PLACEHOLDER — set NEXT_PUBLIC_WHATSAPP_NUMBER (digits with country code, no +) */
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
    email: process.env.NEXT_PUBLIC_EMAIL ?? "[Email to be confirmed]",
  },

  hours: [
    { day: "Saturday", open: "11:00", close: "23:00" },
    { day: "Sunday", open: "11:00", close: "23:00" },
    { day: "Monday", open: "11:00", close: "23:00" },
    { day: "Tuesday", open: "11:00", close: "23:00" },
    { day: "Wednesday", open: "11:00", close: "23:00" },
    { day: "Thursday", open: "11:00", close: "23:30" },
    { day: "Friday", open: "13:00", close: "23:30" },
  ] as const,

  social: {
    /** PLACEHOLDER — set when accounts are confirmed */
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
  },

  brand: {
    logo: "/brand/zaitoon-logo.png",
  },

  features: {
    sampleMenu: true,
    illustrativeImages: true,
  },
} as const;

export type SiteConfig = typeof siteConfig;

export function getWhatsAppUrl(message?: string): string | null {
  const number = siteConfig.contact.whatsapp?.trim();
  if (!number) return null;
  const digits = number.replace(/\D/g, "");
  if (!digits) return null;
  const base = `https://wa.me/${digits}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
