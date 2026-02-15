export default function Loading() {
  return (
    <main className="min-h-screen bg-white animate-pulse" role="status" aria-live="polite">
      <header className="w-full h-[380px] bg-brand-gray-200" />
      <section className="max-w-6xl mx-auto px-4 py-10" aria-label="Promotions">
        <div className="h-7 w-48 bg-brand-gray-200 rounded mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <article key={n} className="h-72 bg-brand-gray-200 rounded" />
          ))}
        </div>
      </section>
    </main>
  )
}
