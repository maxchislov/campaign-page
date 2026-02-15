import { fetchPage } from "@/lib/contentful"
import SectionsRenderer from "@/components/SectionsRenderer"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

// ISR is set to 60 seconds to balance performance and content freshness.
// In a production setup, I would use on-demand revalidation triggered by Contentful webhooks.
export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await fetchPage(slug)
  if (!page) return { title: slug }

  const seo = page.fields.seo?.fields
  const ogUrl = seo?.ogImage?.fields?.file?.url
    ? `https:${seo.ogImage.fields.file.url}`
    : undefined

  return {
    title: seo?.metaTitle ?? slug,
    description: seo?.metaDescription,
    openGraph: ogUrl
      ? { images: [{ url: ogUrl }] }
      : undefined,
  }
}

export default async function CampaignPage({ params }: Props) {
  const { slug } = await params
  const page = await fetchPage(slug)

  if (!page) notFound()

  return (
    <main className="min-h-screen bg-white">
      <SectionsRenderer sections={page.fields.sections} />
    </main>
  )
}
