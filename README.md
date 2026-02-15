# Promotional Campaign Page

A CMS-driven promotional campaign page built with **Next.js 16**, **Tailwind CSS v4**, and **Contentful**.

I chose a composable page architecture — pages are stored as ordered lists of section references in Contentful, and the frontend maps each section type to a React component. This keeps the CMS flexible (editors can reorder or swap sections) while the frontend stays type-safe and predictable.

## Setup

```bash
npm install
```

Create `.env.local`:

```
CONTENTFUL_SPACE_ID=...
CONTENTFUL_ACCESS_TOKEN=...
```

Run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/campaign`.

## Tech Stack

- **Next.js 16** — App Router, Server Components, async `params`
- **Tailwind CSS v4** — via PostCSS plugin, using `@theme` tokens
- **Contentful** — headless CMS (free tier), Delivery + Management APIs
- **TypeScript** — strict mode

## Content Model

| Content Type                  | Purpose                                                   |
| ----------------------------- | --------------------------------------------------------- |
| **Page**                      | Slug, SEO reference, ordered list of section references   |
| **SEO**                       | Meta title, description, OG image — reusable across pages |
| **Component: Hero**           | Tagline, headline, subline, background image, CTAs        |
| **Component: Promotion Grid** | Headline, section CTA, list of promotion references       |
| **Component: Footer**         | Headline, text, primary CTA                               |
| **Call To Action**            | Label, URL, style variant — reusable across any section   |
| **Promotion**                 | Title, description, image, badge, link, date range        |

The schema is defined in `contentful/01_init_content_model.js` (Contentful Migration CLI format).
Demo content is seeded via `contentful/02_seed_content.js` (requires `CONTENTFUL_MANAGEMENT_TOKEN`).

### Shared Content

The "Shop Now" CTA entry is referenced by both the Hero and the Promotion Grid sections. Updating it in Contentful changes both places at once — no duplication.

## Key Decisions

- **Reusable CTA type.** CTAs are their own content type rather than inline fields, so the same button can appear in multiple sections.
- **Section-based composition.** Pages reference an ordered array of typed sections. Adding a new section type (e.g. a testimonial block) means creating one content type and one React component — no restructuring.
- **Manual TypeScript types.** I wrote interfaces by hand to keep the setup simple. For a production app, I'd generate them with `contentful-typescript-codegen`.
- **`include: 3` depth.** The content model is 3 levels deep at most (Page → Section → CTA), so there's no need for a higher resolve depth.

## Tradeoffs & Future Improvements

- Currently using manual TypeScript types for Contentful entries.
  In production, I would generate types via `contentful-typescript-codegen`.

- The seed script is not idempotent — running it twice creates duplicates.
  A real pipeline would upsert entries by `internalName`.

- No caching strategy beyond ISR (`revalidate = 60`).
  For production, I would add on-demand revalidation via Contentful webhooks.

- No test suite was added due to time constraints.
  I would start with integration tests for the fetch layer and snapshot tests for the section components.
