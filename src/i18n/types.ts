export type Locale = "en" | "fa-AF" | "ps";

export type Dictionary = {
  meta: {
    homeTitle: string;
    homeDescription: string;
  };
  nav: {
    home: string;
    menu: string;
    about: string;
    gallery: string;
    contact: string;
    cart: string;
    orderNow: string;
    privacy: string;
    terms: string;
  };
  common: {
    sample: string;
    illustrative: string;
    from: string;
    addToCart: string;
    viewMenu: string;
    learnMore: string;
    callUs: string;
    whatsapp: string;
    openCart: string;
    close: string;
    search: string;
    all: string;
    quantity: string;
    size: string;
    total: string;
    remove: string;
    emptyCart: string;
    continueShopping: string;
    checkout: string;
    placeholderPending: string;
    loading: string;
  };
  hero: {
    brand: string;
    headline: string;
    subhead: string;
    ctaMenu: string;
    ctaOrder: string;
  };
  sections: {
    productScrollTitle: string;
    productScrollSub: string;
    whyTitle: string;
    whySub: string;
    whyCraft: string;
    whyCraftBody: string;
    whyWelcome: string;
    whyWelcomeBody: string;
    whyLocal: string;
    whyLocalBody: string;
    galleryTitle: string;
    gallerySub: string;
    testimonialsTitle: string;
    testimonialsSub: string;
  };
  menu: {
    title: string;
    sub: string;
    ingredients: string;
    related: string;
    notFound: string;
  };
  about: {
    title: string;
    body1: string;
    body2: string;
    promise: string;
  };
  gallery: {
    title: string;
    sub: string;
  };
  contact: {
    title: string;
    sub: string;
    name: string;
    phone: string;
    email: string;
    message: string;
    send: string;
    success: string;
    error: string;
    noWebhook: string;
  };
  cart: {
    title: string;
    sub: string;
    name: string;
    phone: string;
    notes: string;
    fulfillment: string;
    pickup: string;
    delivery: string;
    address: string;
    submit: string;
    whatsappCheckout: string;
    noConfig: string;
    empty: string;
  };
  footer: {
    tagline: string;
    rights: string;
    visit: string;
  };
};

export const locales: Locale[] = ["en", "fa-AF", "ps"];

export const localeLabels: Record<Locale, string> = {
  en: "English",
  "fa-AF": "دری",
  ps: "پښتو",
};

export const rtlLocales: Locale[] = ["fa-AF", "ps"];

export function isRtl(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}
