// Note: This script does not check for existing entries.
// In production, I would upsert instead of blindly creating.
import contentful from "contentful-management"

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT_ID || "master"

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error(
    "Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN. Copy .env.example to .env.local and set values."
  )
  process.exit(1)
}

async function main() {
  const client = contentful.createClient({
    accessToken: MANAGEMENT_TOKEN,
  })

  const space = await client.getSpace(SPACE_ID)
  const environment = await space.getEnvironment(ENVIRONMENT_ID)

  console.log("Creation of content...")

  //Promotions
  const washingPromo = await environment.createEntry("promotion", {
    fields: {
      internalName: { "en-US": "Washing Machine Promo" },
      title: { "en-US": "Washing Machine Promo" },
      description: { "en-US": "Save on selected washing machines" },
      badge: { "en-US": "20% OFF" },
      link: { "en-US": "/shop/washing-machines" },
    },
  })
  await washingPromo.publish()

  const coffeePromo = await environment.createEntry("promotion", {
    fields: {
      internalName: { "en-US": "Coffee Machine Bundle" },
      title: { "en-US": "Coffee Machine Bundle" },
      description: { "en-US": "Get a free accessory set" },
      badge: { "en-US": "NEW" },
      link: { "en-US": "/shop/coffee-machines" },
    },
  })
  await coffeePromo.publish()

  const vacuumPromo = await environment.createEntry("promotion", {
    fields: {
      internalName: { "en-US": "Vacuum Cleaner Deal" },
      title: { "en-US": "Vacuum Cleaner Deal" },
      description: { "en-US": "Premium models at special prices" },
      badge: { "en-US": "SALE" },
      link: { "en-US": "/shop/vacuums" },
    },
  })
  await vacuumPromo.publish()

  // CTAs
  const ctaShop = await environment.createEntry("callToAction", {
    fields: {
      label: { "en-US": "Shop Now" },
      url: { "en-US": "/shop" },
      style: { "en-US": "Primary" },
    },
  })
  await ctaShop.publish()

  const ctaDeals = await environment.createEntry("callToAction", {
    fields: {
      label: { "en-US": "View All Deals" },
      url: { "en-US": "/deals" },
      style: { "en-US": "Secondary" },
    },
  })
  await ctaDeals.publish()

  const ctaSubscribe = await environment.createEntry("callToAction", {
    fields: {
      label: { "en-US": "Subscribe Now" },
      url: { "en-US": "/subscribe" },
      style: { "en-US": "Primary" },
    },
  })
  await ctaSubscribe.publish()

  //Blocks
  const heroBlock = await environment.createEntry("componentHero", {
    fields: {
      internalName: { "en-US": "Home Hero" },
      tagline: { "en-US": "Limited Time Offers" },
      headline: { "en-US": "Summer Sale 2026" },
      subline: { "en-US": "Discover exclusive deals on premium appliances" },
      ctas: {
        "en-US": [
          { sys: { type: "Link", linkType: "Entry", id: ctaShop.sys.id } },
          { sys: { type: "Link", linkType: "Entry", id: ctaDeals.sys.id } },
        ],
      },
    },
  })
  await heroBlock.publish()

  const gridBlock = await environment.createEntry("componentPromotionGrid", {
    fields: {
      internalName: { "en-US": "Home Promotions" },
      headline: { "en-US": "Current Promotions" },
      cta: {
        "en-US": { sys: { type: "Link", linkType: "Entry", id: ctaShop.sys.id } },
      },
      promotions: {
        "en-US": [
          { sys: { type: "Link", linkType: "Entry", id: washingPromo.sys.id } },
          { sys: { type: "Link", linkType: "Entry", id: coffeePromo.sys.id } },
          { sys: { type: "Link", linkType: "Entry", id: vacuumPromo.sys.id } },
        ],
      },
    },
  })
  await gridBlock.publish()

  const footerBlock = await environment.createEntry("componentFooter", {
    fields: {
      internalName: { "en-US": "Home Footer" },
      headline: { "en-US": "Don't Miss Out" },
      text: { "en-US": "Sign up for exclusive offers and early access" },
      primaryCta: {
        "en-US": {
          sys: { type: "Link", linkType: "Entry", id: ctaSubscribe.sys.id },
        },
      },
    },
  })
  await footerBlock.publish()

  //SEO
  const seo = await environment.createEntry("seo", {
    fields: {
      metaTitle: { "en-US": "Summer Sale 2026 – Miele" },
      metaDescription: { "en-US": "Best deals on Miele premium appliances" },
    },
  })
  await seo.publish()

  //Page
  const page = await environment.createEntry("page", {
    fields: {
      slug: { "en-US": "campaign" },
      seo: {
        "en-US": { sys: { type: "Link", linkType: "Entry", id: seo.sys.id } },
      },
      sections: {
        "en-US": [
          { sys: { type: "Link", linkType: "Entry", id: heroBlock.sys.id } },
          { sys: { type: "Link", linkType: "Entry", id: gridBlock.sys.id } },
          { sys: { type: "Link", linkType: "Entry", id: footerBlock.sys.id } },
        ],
      },
    },
  })
  await page.publish()

  console.log("Content created & published!")
}

main().catch(console.error)
