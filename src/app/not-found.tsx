import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-2xl font-semibold text-brand-black mb-2">Page not found</h1>
      <p className="text-brand-black mb-6">The page you are looking for does not exist.</p>
      <Link
        href="/campaign"
        className="inline-flex items-center px-5 py-2.5 bg-brand-red text-white text-sm font-medium rounded-sm hover:bg-brand-red-dark transition-colors"
      >
        Back to Campaign
      </Link>
    </div>
  )
}
