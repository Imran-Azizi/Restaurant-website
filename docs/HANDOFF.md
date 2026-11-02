# Zaitoon Pizza — Production Handoff

## Implemented pages

| Route | Status |
|-------|--------|
| `/` | Homepage: hero, signatures, categories, why, offers, about, gallery, location |
| `/menu` | Search + category filters |
| `/menu/[slug]` | Item detail, sizes, add to cart |
| `/about` | Brand story |
| `/offers` | Sample offers (clearly marked) |
| `/gallery` | Grid + accessible lightbox |
| `/contact` | Validated form + sidebar |
| `/cart` | Cart review + checkout boundary |
| `/privacy`, `/terms` | Placeholder legal pages |
| `/api/contact`, `/api/order` | Zod validation + webhook/WhatsApp |

## Design system

- Colors from logo: cream `#F6F0E6`, charcoal `#12110F`, tomato `#C43B2C`, olive `#3D5A3A`, gold `#C4A574`
- Fonts: Cormorant Garamond (display), DM Sans (body), Noto Naskh Arabic (Dari/Pashto)
- Tokens in `src/app/globals.css`

## Assets

- Official logo: `zaitoon-pizza/public/brand/zaitoon-logo.png`
- Illustrative food photos: `public/images/*.jpg` (AI-generated; not restaurant photography)
- Side/drink SVGs: illustrative placeholders

## Libraries

| Library | Purpose |
|---------|---------|
| next / react | App framework |
| tailwindcss | Styling |
| framer-motion | Motion (respects reduced-motion) |
| lucide-react | Icons |
| react-hook-form + zod | Forms |
| sonner | Toasts |
| clsx + tailwind-merge + cva | Class utilities |
| embla-carousel-* | Available for carousels |

## Remaining requirements (restaurant)

1. Confirm legal business name, street address, phone, WhatsApp, email
2. Confirm opening hours (current hours are provisional)
3. Replace sample menu / prices in `src/data/menu.ts`
4. Replace sample offers or remove until real promotions exist
5. Provide real restaurant photography for gallery/hero
6. Configure `CONTACT_WEBHOOK_URL` and/or `ORDER_WEBHOOK_URL`
7. Set `NEXT_PUBLIC_WHATSAPP_NUMBER` for WhatsApp ordering
8. Legal review of Privacy / Terms
9. Optional: full professional translation QA for Dari & Pashto dictionaries

## Test results (2026-10-18)

| Check | Result |
|-------|--------|
| `npm run build` | Passed (Next.js 16.4.2 Turbopack) — 28 routes generated |
| TypeScript | Passed during build |
| `npm run lint` | React Compiler warnings for RHF `watch()`; setState-in-effect issues addressed |
| Production server | `npm start` → http://localhost:3000 Ready |
| Browser smoke | Homepage loads: hero, signatures (AFN), categories, why, offers, about, gallery, location, footer; EN/Dari/Pashto switcher present |
| Lighthouse | Not measured in this pass — run in Chrome DevTools before claiming scores |

**Note:** App lives in `zaitoon-pizza/` subdirectory of the workspace.

## Design research

See `docs/design-research.md` for reference website analysis and recommended direction.
