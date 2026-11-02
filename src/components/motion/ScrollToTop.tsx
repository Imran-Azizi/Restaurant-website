"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Ensures each App Router navigation starts at the top of the page. */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
