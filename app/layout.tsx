import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "North Atlantic Software - AI Development Partner",
  description: "Develop Smarter. Grow Faster. With AI.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
