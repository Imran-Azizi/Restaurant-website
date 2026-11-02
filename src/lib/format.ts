/**
 * Format amounts in Afghan Afghani (AFN).
 * Uses a stable en-AF style with thin-space grouping for readability.
 */
export function formatAFN(amount: number, locale = "en"): string {
  const formatted = new Intl.NumberFormat(locale === "en" ? "en-US" : "fa-AF", {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount);

  if (locale === "en") {
    return `${formatted} AFN`;
  }

  return `${formatted} افغانی`;
}
