import Hero from "./Hero"
import PromotionGrid from "./PromotionGrid"
import Footer from "./Footer"
import type { Section, HeroSection, PromotionGridSection, FooterSection } from "@/types"

export default function SectionsRenderer({ sections }: { sections: Section[] }) {
  return (
    <div className="flex flex-col w-full">
      {sections.map((section, i) => {
        const key = section.sys.id ?? i
        switch (section.sys.contentType.sys.id) {
          case "componentHero":
            return <Hero key={key} data={section as HeroSection} />
          case "componentPromotionGrid":
            return <PromotionGrid key={key} data={section as PromotionGridSection} />
          case "componentFooter":
            return <Footer key={key} data={section as FooterSection} />
          default:
            return null
        }
      })}
    </div>
  )
}
