import Link from "next/link"
import type { CallToAction } from "@/types"

const VARIANTS = {
  Primary: "bg-[#8C0014] hover:bg-[#60000E] text-white border border-[#8C0014]",
  Secondary: "bg-white hover:bg-gray-50 text-[#1D1D1D] border-2 border-[#1D1D1D]",
  "Text Link":
    "bg-transparent text-[#1D1D1D] underline hover:text-[#8C0014] p-0 border-none min-h-0",
}

interface Props {
  cta: CallToAction
  className?: string
}

export default function Cta({ cta, className }: Props) {
  const { label, url, style } = cta.fields

  return (
    <Link
      href={url ?? "#"}
      className={[
        "inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-sm transition-colors min-h-[44px]",
        VARIANTS[style] ?? VARIANTS.Primary,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label}
    </Link>
  )
}
