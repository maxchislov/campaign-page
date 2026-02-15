import { fetchPage } from "@/lib/contentful"
import SectionsRenderer from "@/components/SectionsRenderer"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import type { IPageFields } from "@/types"

// ISR is set to 60 seconds as a middle ground for freshness and cost.
// In production, prefer on-demand revalidation via Contentful webhooks.
export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await fetchPage(slug)
  if (!page) return { title: slug }

  const fields = page.fields as IPageFields & {
    seo?: {
      fields?: {
        metaTitle?: string
        metaDescription?: string
        ogImage?: { fields?: { file?: { url?: string } } }
      }
    }
  }

  const seo = fields.seo?.fields
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
  const fields = page.fields as IPageFields

  return (
    <main className="min-h-screen bg-white">
      <SectionsRenderer sections={fields.sections ?? []} />
    </main>
  )
}
