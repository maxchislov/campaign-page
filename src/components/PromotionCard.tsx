import Link from "next/link"
import Image from "next/image"
import type { Promotion } from "@/types"

export default function PromotionCard({ promotion }: { promotion: Promotion }) {
  const { title, description, badge, link, image } = promotion.fields
  const rawUrl = image?.fields?.file?.url
  const imageUrl = rawUrl
    ? `${rawUrl.startsWith("http") ? rawUrl : `https:${rawUrl}`}?w=800&fm=webp&q=80`
    : null

  return (
    <article className="flex flex-col h-full bg-white border border-[#1D1D1D] overflow-hidden">
      <div className="relative w-full aspect-[4/3] bg-[#F0F0F0] shrink-0 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#999] text-sm">
            [Image]
          </div>
        )}
        {badge && (
          <div className="absolute top-3 left-3 bg-white border border-[#1D1D1D] px-2 py-1 z-10">
            <span className="text-xs font-bold uppercase tracking-wide text-[#1D1D1D]">
              {badge}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow p-4 md:p-5 border-t border-[#1D1D1D]">
        <h3 className="text-base font-semibold text-[#1D1D1D] mb-2 leading-tight">{title}</h3>
        {description && (
          <p className="text-sm text-[#1D1D1D] mb-4 flex-grow line-clamp-2">{description}</p>
        )}
        {link && (
          <Link
            href={link}
            className="inline-block w-full py-2.5 text-center border border-[#1D1D1D] text-sm font-medium text-[#1D1D1D] hover:bg-[#1D1D1D] hover:text-white transition-colors"
          >
            View Deal
          </Link>
        )}
      </div>
    </article>
  )
}
