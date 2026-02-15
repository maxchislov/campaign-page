import type { PromotionGridSection } from "@/types"
import PromotionCard from "./PromotionCard"
import Cta from "./Cta"

export default function PromotionGrid({ data }: { data: PromotionGridSection }) {
  const { headline, cta, promotions } = data.fields
  if (!promotions?.length) return null

  return (
    <section className="w-full bg-white" aria-label="Promotions">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-12">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 md:mb-8">
          {headline && (
            <h2 className="text-xl md:text-2xl font-semibold text-[#1D1D1D]">{headline}</h2>
          )}
          {cta && <Cta cta={cta} className="shrink-0" />}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {promotions.map((promo) => (
            <PromotionCard key={promo.sys.id} promotion={promo} />
          ))}
        </div>
      </div>
    </section>
  )
}
