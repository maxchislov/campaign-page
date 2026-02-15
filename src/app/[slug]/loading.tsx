export default function Loading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      <div className="w-full h-[380px] bg-[#E8E8E8]" />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="h-7 w-48 bg-[#E8E8E8] rounded mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-72 bg-[#E8E8E8] rounded" />
          ))}
        </div>
      </div>
    </div>
  )
}
