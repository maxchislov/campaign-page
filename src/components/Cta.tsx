import Link from "next/link"
import type { ICallToAction, ICallToActionFields } from "@/types"

const VARIANTS = {
  Primary: "bg-brand-red hover:bg-brand-red-dark text-white border border-brand-red",
  Secondary: "bg-white hover:bg-gray-50 text-brand-black border-2 border-brand-black",
  "Text Link":
    "bg-transparent text-brand-black underline hover:text-brand-red p-0 border-none min-h-0",
}

interface Props {
  cta: ICallToAction
  className?: string
}

export default function Cta({ cta, className }: Props) {
  const { label, url, style } = cta.fields as ICallToActionFields
  const variant = (style && VARIANTS[style]) || VARIANTS.Primary

  return (
    <Link
      href={url ?? "#"}
      className={[
        "inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-sm transition-colors min-h-[44px]",
        variant,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label}
    </Link>
  )
}
