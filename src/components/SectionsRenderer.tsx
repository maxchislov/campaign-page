import Hero from "./Hero"
import PromotionGrid from "./PromotionGrid"
import Footer from "./Footer"
import type { IComponentFooter, IComponentHero, IComponentPromotionGrid } from "@/types"

type Section = IComponentHero | IComponentPromotionGrid | IComponentFooter

export default function SectionsRenderer({ sections }: { sections: Section[] }) {
  return (
    <div className="flex flex-col w-full">
      {sections.map((section, i) => {
        const key = section.sys.id ?? i
        // Map Contentful content type IDs to React components
        switch (section.sys.contentType.sys.id) {
          case "componentHero":
            return <Hero key={key} data={section as IComponentHero} />
          case "componentPromotionGrid":
            return <PromotionGrid key={key} data={section as IComponentPromotionGrid} />
          case "componentFooter":
            return <Footer key={key} data={section as IComponentFooter} />
          default:
            return null
        }
      })}
    </div>
  )
}
