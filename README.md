# Zaitoon Pizza

Premium restaurant website for **Zaitoon Pizza** (Kabul), built with Next.js 16 App Router, TypeScript, Tailwind CSS v4, Framer Motion, and bilingual-ready i18n (English, Dari, Pashto + RTL).

> Brand spelling follows the official logo: **Zaitoon** (double “o”).

## Quick start

```bash
cd zaitoon-pizza
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve production build |
| `npm run lint` | ESLint |

## Stack

- Next.js 16.4 / React 19 / TypeScript
- Tailwind CSS v4
- Framer Motion, Lucide icons, Sonner toasts
- React Hook Form + Zod
- Embla Carousel (available for future carousels)
- Lightweight UI primitives (Button, Input, Textarea, Dialog, Sheet)

## Project structure

```
src/
  app/           # Routes, API, SEO (sitemap/robots)
  components/    # UI, layout, home, menu, cart, i18n
  context/       # Cart
  data/          # Sample menu, offers, gallery
  i18n/          # Dictionaries + LanguageProvider
  lib/           # site-config, format, validations, utils
public/
  brand/         # Official logo
  images/        # Hero + product imagery (illustrative)
docs/            # Design research + handoff (parent folder or /docs)
```

## Configuration

Copy `.env.example` → `.env.local` and set:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_PHONE` / `NEXT_PUBLIC_WHATSAPP_NUMBER` / `NEXT_PUBLIC_EMAIL`
- `NEXT_PUBLIC_MAP_EMBED_URL` / `NEXT_PUBLIC_MAP_LINK_URL`
- `CONTACT_WEBHOOK_URL` / `ORDER_WEBHOOK_URL` (server-only)

Without WhatsApp or webhooks, order/contact forms validate but do **not** fake success.

## Sample content

Menu prices, offers, hours, and some address fields are **placeholders / samples** until the restaurant confirms them. See `docs/HANDOFF.md` and `docs/design-research.md`.

## Deployment

1. Push to GitHub (or preferred host).
2. Deploy on Vercel / Netlify / Node host with `npm run build` + `npm start`.
3. Set environment variables in the host dashboard.
4. Point DNS to the deployment.
5. Replace sample menu data in `src/data/menu.ts` and confirm contact details in `src/lib/site-config.ts`.

## License

Private project for Zaitoon Pizza. Logo and brand assets remain property of the restaurant.
