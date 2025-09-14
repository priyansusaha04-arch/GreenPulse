"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Theme = "light" | "dark" | "system"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: "light" | "dark"
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light")
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    try {
      // Load theme from localStorage
      const savedTheme = localStorage.getItem("greenpulse-theme") as Theme
      if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
        setThemeState(savedTheme)
        console.log("[v0] Loaded theme from localStorage:", savedTheme)
      } else {
        console.log("[v0] No saved theme, using default: light")
      }
    } catch (error) {
      console.log("[v0] localStorage not available, using default theme")
    }
  }, [])

  useEffect(() => {
    const updateResolvedTheme = () => {
      let resolved: "light" | "dark" = "light"

      if (theme === "system") {
        resolved = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
        console.log("[v0] System theme detected:", resolved)
      } else {
        resolved = theme as "light" | "dark"
        console.log("[v0] Manual theme set:", resolved)
      }

      setResolvedTheme(resolved)

      // Apply theme to document
      document.documentElement.classList.remove("light", "dark")
      document.documentElement.classList.add(resolved)

      document.documentElement.setAttribute("data-theme", resolved)

      console.log("[v0] Applied theme to document:", resolved)
    }

    updateResolvedTheme()

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    mediaQuery.addEventListener("change", updateResolvedTheme)

    return () => mediaQuery.removeEventListener("change", updateResolvedTheme)
  }, [theme])

  const setTheme = (newTheme: Theme) => {
    console.log("[v0] Setting theme to:", newTheme)
    setThemeState(newTheme)
    try {
      localStorage.setItem("greenpulse-theme", newTheme)
      console.log("[v0] Saved theme to localStorage:", newTheme)
    } catch (error) {
      console.log("[v0] Could not save theme to localStorage")
    }
  }

  return <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
