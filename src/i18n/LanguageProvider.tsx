"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getDictionary, isRtl, type Dictionary, type Locale } from "./index";

const STORAGE_KEY = "zaitoon-locale";

type LanguageContextValue = {
  locale: Locale;
  dictionary: Dictionary;
  dir: "ltr" | "rtl";
  setLocale: (locale: Locale) => void;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "fa-AF" || stored === "ps") return stored;
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next === "fa-AF" ? "fa" : next;
    document.documentElement.dir = isRtl(next) ? "rtl" : "ltr";
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "fa-AF" ? "fa" : locale;
    document.documentElement.dir = isRtl(locale) ? "rtl" : "ltr";
  }, [locale]);

  const dictionary = useMemo(() => getDictionary(locale), [locale]);
  const dir: "ltr" | "rtl" = isRtl(locale) ? "rtl" : "ltr";

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      dictionary,
      dir,
      setLocale,
      t: dictionary,
    }),
    [locale, dictionary, dir, setLocale],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useTranslation must be used within LanguageProvider");
  }
  return ctx;
}
