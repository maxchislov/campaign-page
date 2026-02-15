module.exports = function (migration) {
  // Call To Action
  const cta = migration
    .createContentType("callToAction")
    .name("Call To Action")
    .description("A reusable button or link wrapper")
    .displayField("label")

  cta.createField("label").name("Label").type("Symbol").required(true)

  cta
    .createField("url")
    .name("URL")
    .type("Symbol")
    .required(true)
    .validations([{ regexp: { pattern: "^(http|https|/)" } }])

  cta
    .createField("style")
    .name("Style")
    .type("Symbol")
    .validations([{ in: ["Primary", "Secondary", "Text Link"] }])
    .defaultValue({ "en-US": "Primary" })

  // Promotion
  const promotion = migration
    .createContentType("promotion")
    .name("Promotion Card")
    .description("Reusable promotion data (e.g. Washing Machine Promo)")
    .displayField("title")

  promotion.createField("internalName").name("Internal Name").type("Symbol").required(true)

  promotion.createField("title").name("Title").type("Symbol").required(true)

  promotion.createField("description").name("Description").type("Text")

  promotion.createField("image").name("Image").type("Link").linkType("Asset")

  promotion.createField("badge").name("Badge").type("Symbol") // "20% OFF", "NEW"

  promotion.createField("link").name("Link URL").type("Symbol")

  promotion.createField("startDate").name("Start Date").type("Date")
  promotion.createField("endDate").name("End Date").type("Date")

  // Hero
  const hero = migration
    .createContentType("componentHero")
    .name("Component: Hero")
    .description("Hero section with background image and CTAs")
    .displayField("internalName")

  hero.createField("internalName").name("Internal Name").type("Symbol").required(true)

  hero.createField("tagline").name("Tagline").type("Symbol") // e.g. "Limited Time Offers"
  hero.createField("headline").name("Headline").type("Symbol").required(true)
  hero.createField("subline").name("Subline").type("Text") // paragraph below headline
  hero.createField("backgroundImage").name("Background Image").type("Link").linkType("Asset")

  hero
    .createField("ctas")
    .name("Call To Actions")
    .type("Array")
    .items({
      type: "Link",
      linkType: "Entry",
      validations: [{ linkContentType: ["callToAction"] }],
    })

  // Promotion grid
  const grid = migration
    .createContentType("componentPromotionGrid")
    .name("Component: Promotion Grid")
    .description("Grid layout for promotions")
    .displayField("internalName")

  grid.createField("internalName").name("Internal Name").type("Symbol").required(true)

  grid.createField("headline").name("Headline").type("Symbol")

  grid
    .createField("cta")
    .name("Section CTA")
    .type("Link")
    .linkType("Entry")
    .validations([{ linkContentType: ["callToAction"] }])

  grid
    .createField("promotions")
    .name("Promotions")
    .type("Array")
    .items({
      type: "Link",
      linkType: "Entry",
      validations: [{ linkContentType: ["promotion"] }],
    }) // This enforces reusability of Promotion entries

  // Footer
  const footer = migration
    .createContentType("componentFooter")
    .name("Component: Footer")
    .description("Footer section with CTA")
    .displayField("internalName")

  footer.createField("internalName").name("Internal Name").type("Symbol").required(true)

  footer.createField("headline").name("Headline").type("Symbol")
  footer.createField("text").name("Text").type("Text")
  footer
    .createField("primaryCta")
    .name("Primary CTA")
    .type("Link")
    .linkType("Entry")
    .validations([{ linkContentType: ["callToAction"] }])

  // SEO
  const seo = migration
    .createContentType("seo")
    .name("SEO")
    .description("Reusable SEO metadata for any page")
    .displayField("metaTitle")

  seo.createField("metaTitle").name("Meta Title").type("Symbol").required(true)
  seo.createField("metaDescription").name("Meta Description").type("Text")
  seo.createField("ogImage").name("OG Image").type("Link").linkType("Asset")

  // Page
  const page = migration
    .createContentType("page")
    .name("Page")
    .description("A landing page composed of sections")
    .displayField("slug")

  page
    .createField("slug")
    .name("Slug")
    .type("Symbol")
    .required(true)
    .validations([{ unique: true }])

  page
    .createField("seo")
    .name("SEO")
    .type("Link")
    .linkType("Entry")
    .validations([{ linkContentType: ["seo"] }])

  page
    .createField("sections")
    .name("Sections")
    .type("Array")
    .items({
      type: "Link",
      linkType: "Entry",
      validations: [
        {
          linkContentType: ["componentHero", "componentPromotionGrid", "componentFooter"],
        },
      ],
    })
}
