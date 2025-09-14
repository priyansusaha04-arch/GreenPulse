"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

import enTranslations from "../locales/en.json"
import hiTranslations from "../locales/hi.json"
import odTranslations from "../locales/od.json"

type Language = "en" | "hi" | "od"

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, params?: Record<string, string | number>) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const translations: Record<Language, any> = {
  en: enTranslations,
  hi: hiTranslations,
  od: odTranslations,
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  useEffect(() => {
    try {
      // Load language from localStorage or browser locale
      const savedLang = localStorage.getItem("greenpulse-language") as Language
      if (savedLang && ["en", "hi", "od"].includes(savedLang)) {
        console.log("[v0] Loading saved language:", savedLang)
        setLanguageState(savedLang)
      } else {
        // Detect browser language
        const browserLang = navigator.language.toLowerCase()
        if (browserLang.startsWith("hi")) {
          console.log("[v0] Detected Hindi browser language")
          setLanguageState("hi")
        } else if (browserLang.startsWith("or")) {
          console.log("[v0] Detected Odia browser language")
          setLanguageState("od")
        } else {
          console.log("[v0] Using default English language")
        }
      }
    } catch (error) {
      console.log("[v0] localStorage not available, using default language")
    }
  }, [])

  const setLanguage = (lang: Language) => {
    console.log("[v0] Setting language to:", lang)
    setLanguageState(lang)
    try {
      localStorage.setItem("greenpulse-language", lang)
      console.log("[v0] Saved language to localStorage:", lang)
    } catch (error) {
      console.log("[v0] Could not save language to localStorage")
    }
    // window.location.reload()
  }

  const t = (key: string, params?: Record<string, string | number>): string => {
    try {
      const keys = key.split(".")
      let value = translations[language]

      for (const k of keys) {
        value = value?.[k]
      }

      if (typeof value !== "string") {
        console.log(`[v0] Translation not found for key: ${key}`)
        return key // Return key if translation not found
      }

      // Replace parameters
      if (params) {
        return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
          return params[paramKey]?.toString() || match
        })
      }

      return value
    } catch (error) {
      console.log(`[v0] Error translating key: ${key}`, error)
      return key
    }
  }

  return <I18nContext.Provider value={{ language, setLanguage, t }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
