import { siteConfig } from "@/lib/site-config";

export function RestaurantJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.brand.logo}`,
    servesCuisine: ["Pizza", "Mediterranean"],
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kabul",
      addressCountry: "AF",
      streetAddress: "[Address to be confirmed]",
    },
    openingHoursSpecification: siteConfig.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.day,
      opens: h.open,
      closes: h.close,
    })),
    ...(siteConfig.contact.phoneHref
      ? { telephone: siteConfig.contact.phone }
      : {}),
    currenciesAccepted: "AFN",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
