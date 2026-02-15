# Promotional Campaign Page

CMS-driven promotional campaign page using **Next.js 16**, **Tailwind CSS v4**, and **Contentful**. Pages are ordered lists of sections; each section type maps to a React component so editors can reorder without code changes.

## Setup

```bash
npm install
```

Create `.env.local` (or copy from `.env.example`) with:

```
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_delivery_token          # required to run
CONTENTFUL_PREVIEW_TOKEN=your_preview_token          # optional, for preview usage
CONTENTFUL_MANAGEMENT_TOKEN=your_management_token    # required for codegen/seed scripts only
CONTENTFUL_ENVIRONMENT=master                        # defaults to master if unset
```

Run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/campaign`.

## Tech Stack

- Next.js 16 (App Router)
- Tailwind CSS v4 (`@theme` tokens)
- Contentful (Delivery + Management APIs)
- TypeScript

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

## Notes

- CTAs are reusable entries; the same CTA is used in hero and promotion grid to prove reuse.
- Pages compose ordered sections; adding a new section means one content type + one React component.
- API fetch uses `include: 3` (Page → Section → CTA/Promotion), which is sufficient for this model.

## Type Generation (Contentful)

- Run `npm run codegen` to regenerate `src/types/contentful.d.ts` from the current Contentful space using `contentful-typescript-codegen`.
- Requires `CONTENTFUL_SPACE_ID`, `CONTENTFUL_MANAGEMENT_TOKEN`, and optional `CONTENTFUL_ENVIRONMENT` (falls back to `master`). Uses `getContentfulEnvironment.js` to resolve the environment.
- Rationale: keeping the generated types in sync with the CMS schema gives end-to-end type safety in the React components and catches schema drift early, reducing runtime content-shape errors.

## Tradeoffs / Next Steps

- Seed script is not idempotent; a real pipeline would upsert by `internalName`.
- ISR is set to 60s; production would use webhook-driven revalidation.
- Tests are minimal; would add fetch-layer and render coverage next.
