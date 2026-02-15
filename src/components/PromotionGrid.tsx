import type { IComponentPromotionGrid, IComponentPromotionGridFields } from "@/types"
import PromotionCard from "./PromotionCard"
import Cta from "./Cta"

export default function PromotionGrid({ data }: { data: IComponentPromotionGrid }) {
  const { headline, cta, promotions } = data.fields as IComponentPromotionGridFields
  if (!promotions?.length) return null

  return (
    <section className="w-full bg-white" aria-label="Promotions">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-12">
        <header className="flex flex-wrap items-center justify-between gap-4 mb-6 md:mb-8">
          {headline && (
            <h2 className="text-xl md:text-2xl font-semibold text-brand-black">{headline}</h2>
          )}
          {cta && <Cta cta={cta} className="shrink-0" />}
        </header>

        <ul role="list" className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {promotions.map((promo) => (
            <li key={promo.sys.id} className="h-full">
              <PromotionCard promotion={promo} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
