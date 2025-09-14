import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { AuthProvider } from "@/lib/auth"
import { I18nProvider } from "@/lib/i18n"
import { ThemeProvider } from "@/lib/theme"
import "./globals.css"

export const metadata: Metadata = {
  title: "GreenPulse - Smart Pesticide & Crop Health Management",
  description:
    "Smart agricultural management system for farmers and government officials. Monitor crop health, manage pesticides, and track environmental data.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
      <body className="font-sans">
        <ThemeProvider>
          <I18nProvider>
            <AuthProvider>
              <Suspense fallback={null}>{children}</Suspense>
            </AuthProvider>
          </I18nProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
