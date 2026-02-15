import type { IComponentHero, IComponentHeroFields } from "@/types"
import Cta from "./Cta"

export default function Hero({ data }: { data: IComponentHero }) {
  const { tagline, headline, subline, backgroundImage, ctas } = data.fields as IComponentHeroFields
  const file = backgroundImage?.fields?.file
  const rawUrl = typeof file === "string" ? file : file?.url
  const bgUrl =
    typeof rawUrl === "string"
      ? `${rawUrl.startsWith("http") ? rawUrl : `https:${rawUrl}`}?w=1600&fm=webp&q=80`
      : null

  return (
    <section
      className="relative w-full min-h-[380px] md:min-h-[460px] flex flex-col items-center justify-center text-center overflow-hidden bg-brand-gray-200"
      aria-label="Hero"
    >
      {bgUrl && (
        <>
          <div
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgUrl})` }}
          />
          <div className="absolute inset-0 z-[1] bg-black/35" />
        </>
      )}

      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 py-10 md:py-14 flex flex-col items-center gap-4">
        {tagline && (
          <span className="block text-white font-medium tracking-widest text-sm uppercase">
            {tagline}
          </span>
        )}

        <h1 className="text-3xl md:text-5xl font-semibold text-white tracking-tight drop-shadow-md">
          {headline}
        </h1>

        {subline && <p className="text-base md:text-lg text-white/95 max-w-xl">{subline}</p>}

        {ctas && ctas.length > 0 && (
          <div className="flex flex-wrap gap-4 justify-center mt-2">
            {ctas.map((cta) => (
              <Cta key={cta.sys.id} cta={cta} className="min-w-[140px]" />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
