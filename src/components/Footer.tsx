import type { IComponentFooter, IComponentFooterFields } from "@/types"
import Cta from "./Cta"

export default function Footer({ data }: { data: IComponentFooter }) {
  const { headline, text, primaryCta } = data.fields as IComponentFooterFields

  return (
    <section className="w-full bg-brand-gray-100 border-t border-brand-gray-300" aria-label="Footer CTA">
      <div className="max-w-3xl mx-auto px-4 py-12 md:py-14 text-center">
        {headline && (
          <h2 className="text-xl md:text-2xl font-semibold text-brand-black mb-3">{headline}</h2>
        )}
        {text && <p className="text-brand-black mb-6">{text}</p>}
        {primaryCta && (
          <div className="flex justify-center">
            <Cta cta={primaryCta} className="min-w-[160px]" />
          </div>
        )}
      </div>
    </section>
  )
}
