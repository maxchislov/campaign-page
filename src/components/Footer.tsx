import type { FooterSection } from "@/types"
import Cta from "./Cta"

export default function Footer({ data }: { data: FooterSection }) {
  const { headline, text, primaryCta } = data.fields

  return (
    <section className="w-full bg-[#F0F0F0] border-t border-[#E0E0E0]" aria-label="Footer CTA">
      <div className="max-w-3xl mx-auto px-4 py-12 md:py-14 text-center">
        {headline && (
          <h2 className="text-xl md:text-2xl font-semibold text-[#1D1D1D] mb-3">{headline}</h2>
        )}
        {text && <p className="text-[#1D1D1D] mb-6">{text}</p>}
        {primaryCta && (
          <div className="flex justify-center">
            <Cta cta={primaryCta} className="min-w-[160px]" />
          </div>
        )}
      </div>
    </section>
  )
}
