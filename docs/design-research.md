# Zaitoon Pizza — Design Research

**Project:** Zaitoon Pizza Restaurant website  
**Date:** 2026-10-18  
**Note on naming:** The official logo spells **Zaitoon** (double “o”). The website brand uses this spelling. The local project folder may still be named “Zaiton Pizza.”

This document summarizes research of Afghan and international restaurant websites, plus additional pizza brands. Inspiration only — no logos, layouts, or proprietary assets are copied.

---

## 1. Reference websites

### A. Afghanistan

| Site | URL | Loaded |
|------|-----|--------|
| Sulaiman's Palace Restaurant | https://spr.af/index.html | Yes |
| Namak Restaurant | https://namak.af/ | Yes |
| Ziyafat Restaurants | https://ziyafatrestaurants.com/ | Yes |

### B. International fine dining / brand storytelling

| Site | URL | Loaded |
|------|-----|--------|
| Dishoom | https://www.dishoom.com/ | Yes |
| Nobu Restaurants | https://www.noburestaurants.com/ | Yes |

### C. Additional pizza / pizzeria websites

| Site | URL | Loaded |
|------|-----|--------|
| Pizza Pilgrims | https://www.pizzapilgrims.co.uk/ | Yes |
| Franco Manca | https://www.francomanca.co.uk/ | Yes (redirect from francamanca.co.uk) |
| Canotto Pizza | https://canottopizza.uk/ | Yes |
| Roberta’s Pizza | https://www.robertaspizza.com/ | Yes |
| Jet’s Pizza | https://jetspizza.com/ | Yes |
| Pizzeria Mozza | https://www.pizzeriamozza.com/ | Yes |
| Hell Pizza | https://www.hellpizza.com/ | Partial (sparse content returned) |

---

## 2. Key observations by site

### Sulaiman's Palace (spr.af)
- **Effective:** Clear hospitality positioning (“modern palace”), strong Kabul location/phone/WhatsApp, category chips (cuisine, halls, catering), editorial food storytelling.
- **Weaknesses:** Brochure-like; less product-level browsing; limited interactive ordering depth from accessible content.
- **Adapt:** Warm Afghan hospitality language + WhatsApp-first contact; clear visit/reserve CTAs without inventing awards.

### Namak (namak.af)
- **Effective:** Phone prominence, menu cards with AFN prices, free-delivery messaging, multi-section homepage (hero → about → dishes → reviews → delivery).
- **Weaknesses:** Review section can appear empty; mixed English quality; some duplicated dish blocks.
- **Adapt:** AFN pricing, dish cards with short descriptions, delivery clarity — but only show reviews when real content exists.

### Ziyafat (ziyafatrestaurants.com)
- **Effective:** Address + phone + hours visibility; “special menu” grid; banqueting/events story.
- **Weaknesses:** Menu samples feel mismatched to Afghan hospitality brand (sushi/omakase-style items appear); USD pricing; 24/7 hours claim needs verification for any similar claim.
- **Adapt:** Keep contact/hours clear; avoid mismatched cuisine presentation; use AFN and verified categories only.

### Dishoom (dishoom.com)
- **Effective:** Editorial storytelling, immersive photography, “love letter” brand narrative, clear paths to menus/reservations/store, refined typography.
- **Weaknesses:** Heavy content density; less “quick order” focus.
- **Adapt:** Story-driven About and homepage narrative; photography-first sections; never copy Bombay framing — invent original Zaitoon voice.

### Nobu (noburestaurants.com)
- **Effective:** Luxury restraint, chef vision storytelling, featured dishes, global brand consistency.
- **Weaknesses:** Corporate/global; weak local ordering UX for a single neighborhood pizza shop.
- **Adapt:** Premium whitespace and featured-dish spotlight — not multi-city complexity.

### Pizza Pilgrims
- **Effective:** Bold personality (“In Crust We Trust”), events/offers, origin story, community impact.
- **Adapt:** Distinctive verbal identity; offers section; keep claims honest (no fabricated charity/impact).

### Franco Manca
- **Effective:** Simple value proposition, clear offers, neighborhood accessibility, crust/dough craft messaging.
- **Adapt:** One-line craft promise + prominent Order/Menu CTAs; student/weekday offers only when real.

### Canotto Pizza
- **Effective:** Visual-first storefront, menu highlights with ingredient lists, delivery path, mobile-first ordering mindset.
- **Adapt:** Signature pizza highlights with ingredients; strong Order Now; avoid unverified ranking badges.

### Roberta’s
- **Effective:** Seasonal menu framing, multi-location clarity, catering/events.
- **Adapt:** Clean menu taxonomy; catering placeholder only if offered.

### Jet’s Pizza
- **Effective:** Brand education (Detroit-style), combo promotions, product storytelling.
- **Adapt:** Short “how we make pizza” education without inventing proprietary methods.

### Pizzeria Mozza
- **Effective:** Minimal, chef-led credibility, clear menu CTAs, pickup/delivery (Mozza2Go).
- **Adapt:** Restraint and trust; separate dine-in vs order paths.

---

## 3. Comparison of approaches

| Dimension | Afghan sites | Premium intl (Dishoom/Nobu) | Pizza brands |
|-----------|--------------|-----------------------------|--------------|
| Hero | Hospitality + ambiance | Editorial immersive | Food-forward + CTA |
| Menu | Cards + AFN prices | Separate menus/reservations | Sticky categories, item pages |
| Ordering | Phone/WhatsApp/delivery claims | Book a table | Direct order / app |
| Story | Short tradition blurbs | Long-form narrative | Origin + craft |
| Mobile | Phone numbers first | Image-heavy | Order-first |
| Trust | Local address/WhatsApp | Awards/editorial | Social proof / education |

**Opportunity for Zaitoon:** Combine Afghan practicality (AFN, WhatsApp, clear address, bilingual) with international editorial photography and pizza-brand ordering clarity — without generic template cards or fabricated social proof.

---

## 4. Recommended design direction

### Brand feel
Premium, appetizing, warm, and energetic — “night-out” charcoal with cream type, tomato-red CTAs, olive-green accents, sparse gold highlights — drawn from the official emblem (olive + pizza slice on black).

### Visual system
- **Surfaces:** Warm cream (#F7F1E8) for reading pages; deep charcoal/black for hero and logo moments.
- **Accent:** Tomato/brick red for primary CTAs.
- **Secondary:** Olive/forest green for links, badges, hover.
- **Gold:** Thin rules and underlines only (match logo swoosh), never as a full theme wash.
- **Typography:** Expressive serif display for brand moments; highly readable sans for UI/body.
- **Imagery:** Large pizza photography, full-bleed hero, gallery grid; generated/sample images labeled as illustrative until real restaurant photos arrive.
- **Motion:** Hero entrance, staggered text, scroll reveals, card hover, cart drawer — respect `prefers-reduced-motion`.

### UX priorities for Afghanistan
1. Order Now + WhatsApp as primary conversion paths.
2. AFN pricing and local phone formats.
3. EN / Dari / Pashto with RTL for Dari & Pashto.
4. Fast mobile performance on constrained networks.
5. Clear hours, map/directions placeholders until verified coordinates exist.

### What to avoid
- Purple-gradient / generic SaaS restaurant templates.
- Fabricated reviews, ratings, founding years, or awards.
- Nonfunctional “Order” buttons that fake success.
- Copying Dishoom editorial layouts or Nobu corporate structure.

---

## 5. Features to implement

### Pages
- Home (hero, signatures, categories, why Zaitoon, offers, about teaser, gallery, location, footer)
- Menu (search, category filter, cards)
- Pizza / item detail (sizes, price, add to cart)
- About
- Offers (sample offers clearly marked)
- Gallery (lightbox)
- Contact (validated form + phone/WhatsApp)
- Cart / checkout (frontend + submission boundary; WhatsApp/order API when configured)
- Privacy / Terms stubs

### System
- Design tokens (colors, type, spacing, motion)
- Site config (contact, hours, social — placeholders where unknown)
- Centralized sample menu data (replaceable)
- Cart state (client)
- i18n EN + Dari + Pashto + RTL
- SEO metadata, sitemap, robots, Restaurant schema (only with accurate fields)
- Accessibility: focus, labels, keyboard, reduced motion
- `.env.example` for form/order webhooks

### Explicit placeholders / disclosures
- Exact street address, map embed, verified WhatsApp, and real offers pending restaurant confirmation
- Sample menu items and prices marked as sample until replaced
- Order submission requires configured endpoint or WhatsApp handoff
- No fabricated customer reviews section until authentic quotes exist

---

## 6. Synthesis — original Zaitoon experience

**Positioning line (draft):** *Every slice, a little more joy.*  
**Promise:** Freshly prepared pizzas, generous flavor, and welcoming service for families and friends in Afghanistan.

The site should feel like a **campaign for a beloved local pizzeria with international polish**: black-and-cream brand moments from the logo, tomato-red “Order” energy, olive-leaf accents, bilingual dignity, and a frictionless path from craving → menu → cart → WhatsApp/order.
`}