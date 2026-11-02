import en from "./dictionaries/en";
import faAF from "./dictionaries/fa-AF";
import ps from "./dictionaries/ps";
import type { Dictionary, Locale } from "./types";
import { locales } from "./types";

export * from "./types";

const dictionaries: Record<Locale, Dictionary> = {
  en,
  "fa-AF": faAF,
  ps,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}

export function isValidLocale(value: string): value is Locale {
  return (locales as string[]).includes(value);
}
