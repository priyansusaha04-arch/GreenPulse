import type React from "react"
import { I18nProvider } from "@/lib/i18n"
import { ThemeProvider } from "@/lib/theme"
import { AuthProvider } from "@/lib/auth"

export default function GreenPulseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <I18nProvider>
        <AuthProvider>{children}</AuthProvider>
      </I18nProvider>
    </ThemeProvider>
  )
}
