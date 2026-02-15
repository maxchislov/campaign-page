import Link from "next/link"
import Image from "next/image"
import type { IPromotion, IPromotionFields } from "@/types"

export default function PromotionCard({ promotion }: { promotion: IPromotion }) {
  const { title, description, badge, link, image } = promotion.fields as IPromotionFields
  const file = image?.fields?.file
  const rawUrl = typeof file === "string" ? file : file?.url
  const imageUrl =
    typeof rawUrl === "string"
      ? `${rawUrl.startsWith("http") ? rawUrl : `https:${rawUrl}`}?w=800&fm=webp&q=80`
      : null

  return (
    <article className="flex flex-col h-full bg-white border border-brand-black overflow-hidden">
      <figure className="relative w-full aspect-[4/3] bg-brand-gray-100 shrink-0 overflow-hidden">
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
          <div className="absolute top-3 left-3 bg-white border border-brand-black px-2 py-1 z-10">
            <span className="text-xs font-bold uppercase tracking-wide text-brand-black">
              {badge}
            </span>
          </div>
        )}
      </figure>

      <div className="flex flex-col flex-grow p-4 md:p-5 border-t border-brand-black">
        <h3 className="text-base font-semibold text-brand-black mb-2 leading-tight">{title}</h3>
        {description && (
          <p className="text-sm text-brand-black mb-4 flex-grow line-clamp-2">{description}</p>
        )}
        {link && (
          <Link
            href={link}
            className="inline-block w-full py-2.5 text-center border border-brand-black text-sm font-medium text-brand-black hover:bg-brand-black hover:text-white transition-colors"
          >
            View Deal
          </Link>
        )}
      </div>
    </article>
  )
}
