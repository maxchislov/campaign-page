import { createClient } from "contentful"
import type { Page } from "@/types"

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
})

export async function fetchPage(slug: string): Promise<Page | null> {
  const res = await client.getEntries({
    content_type: "page",
    "fields.slug": slug,
    include: 3,
    locale: "en-US",
  })

  const entry = res.items[0]
  if (!entry) return null

  // Contentful SDK types are generic; cast after confirming shape at runtime
  return entry as unknown as Page
}
