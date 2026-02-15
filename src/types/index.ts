// Types mirror the Contentful content model manually.
// In production, I would generate these via contentful-typescript-codegen.

export interface ContentfulImage {
  fields: {
    file: { url: string }
    title?: string
  }
}

export interface CallToAction {
  sys: { id: string; contentType: { sys: { id: string } } }
  fields: {
    label: string
    url: string
    style: "Primary" | "Secondary" | "Text Link"
  }
}

export interface Promotion {
  sys: { id: string; contentType: { sys: { id: string } } }
  fields: {
    title: string
    description: string
    image: ContentfulImage
    badge?: string
    link?: string
  }
}

export interface HeroSection {
  sys: { id: string; contentType: { sys: { id: string } } }
  fields: {
    tagline?: string
    headline: string
    subline?: string
    backgroundImage: ContentfulImage
    ctas?: CallToAction[]
  }
}

export interface PromotionGridSection {
  sys: { id: string; contentType: { sys: { id: string } } }
  fields: {
    headline?: string
    cta?: CallToAction
    promotions: Promotion[]
  }
}

export interface FooterSection {
  sys: { id: string; contentType: { sys: { id: string } } }
  fields: {
    headline?: string
    text?: string
    primaryCta?: CallToAction
  }
}

export type Section = HeroSection | PromotionGridSection | FooterSection

export interface Seo {
  fields: {
    metaTitle: string
    metaDescription?: string
    ogImage?: ContentfulImage
  }
}

export interface Page {
  sys: { id: string }
  fields: {
    slug: string
    seo?: Seo
    sections: Section[]
  }
}
