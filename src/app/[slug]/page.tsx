import { fetchPage } from "@/lib/contentful"
import SectionsRenderer from "@/components/SectionsRenderer"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await fetchPage(slug)
  if (!page) return { title: slug }

  const seo = page.fields.seo?.fields
  return {
    title: seo?.metaTitle ?? slug,
    description: seo?.metaDescription,
    openGraph: seo?.ogImage?.fields?.file?.url
      ? { images: [{ url: seo.ogImage.fields.file.url }] }
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
