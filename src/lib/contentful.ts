import { createClient } from "contentful"
import type { IPage, IPageFields } from "@/types"

type PageSkeleton = {
  contentTypeId: "page"
  fields: IPageFields
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
})

export async function fetchPage(slug: string): Promise<IPage | null> {
  const res = await client.getEntries<PageSkeleton>({
    content_type: "page",
    // @ts-expect-error Contentful SDK typings omit dotted keys, but this is valid
    "fields.slug": slug,
    include: 3, // Page -> Section -> CTA/Promotion; depth 3 is sufficient for this model
    locale: "en-US",
  })

  const entry = res.items[0]
  if (!entry) return null
  return entry as unknown as IPage
}
