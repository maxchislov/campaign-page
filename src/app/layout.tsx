import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Miele X Campaign",
  description: "Exclusive Offers",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased text-[#1D1D1D] bg-white`}>
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  )
}
