"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Droplets, BarChart3, Users, Globe, Sun, Moon, Monitor } from "lucide-react"
import Link from "next/link"
import { useI18n } from "@/lib/i18n"
import { useTheme } from "@/lib/theme"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function LandingPage() {
  console.log("[v0] LandingPage component rendering")

  const { t, language, setLanguage } = useI18n()
  const { theme, setTheme, resolvedTheme } = useTheme()

  console.log("[v0] Current language:", language)
  console.log("[v0] Current theme:", theme)
  console.log("[v0] Resolved theme:", resolvedTheme)

  const handleLanguageChange = (newLanguage: "en" | "hi" | "od") => {
    console.log("[v0] Changing language from", language, "to", newLanguage)
    setLanguage(newLanguage)
    console.log("[v0] Language changed successfully to:", newLanguage)
  }

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    console.log("[v0] Changing theme from", theme, "to", newTheme)
    setTheme(newTheme)
    console.log("[v0] Theme changed successfully to:", newTheme)
  }

  const features = [
    {
      icon: <Leaf className="h-8 w-8 text-secondary" />,
      title: t("dashboard.cropHealth.title") || "Crop Health Monitoring",
      description: "Real-time NDVI analysis and leaf wetness detection",
    },
    {
      icon: <Droplets className="h-8 w-8 text-secondary" />,
      title: "Smart Pesticide Management",
      description: "AI-powered recommendations for optimal pesticide usage",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-secondary" />,
      title: "Environmental Analytics",
      description: "Comprehensive soil and weather monitoring",
    },
    {
      icon: <Users className="h-8 w-8 text-secondary" />,
      title: "Multi-Role Support",
      description: "Tailored dashboards for farmers and government officials",
    },
  ]

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">{t("appName")}</h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="bg-background hover:bg-accent cursor-pointer">
                  <Globe className="h-4 w-4 mr-2" />
                  <span className="font-medium">{language === "en" ? "EN" : language === "hi" ? "हि" : "ଓଡ଼"}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => handleLanguageChange("en")}
                  className={`cursor-pointer hover:bg-accent ${language === "en" ? "bg-accent" : ""}`}
                >
                  <span className="font-medium">{t("language.english")}</span>
                  {language === "en" && <span className="ml-2 text-primary">✓</span>}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleLanguageChange("hi")}
                  className={`cursor-pointer hover:bg-accent ${language === "hi" ? "bg-accent" : ""}`}
                >
                  <span className="font-medium">{t("language.hindi")}</span>
                  {language === "hi" && <span className="ml-2 text-primary">✓</span>}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleLanguageChange("od")}
                  className={`cursor-pointer hover:bg-accent ${language === "od" ? "bg-accent" : ""}`}
                >
                  <span className="font-medium">{t("language.odia")}</span>
                  {language === "od" && <span className="ml-2 text-primary">✓</span>}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="bg-background hover:bg-accent cursor-pointer">
                  {resolvedTheme === "light" && <Sun className="h-4 w-4" />}
                  {resolvedTheme === "dark" && <Moon className="h-4 w-4" />}
                  <span className="ml-2 text-sm font-medium">
                    {theme === "light" && t("theme.light")}
                    {theme === "dark" && t("theme.dark")}
                    {theme === "system" && t("theme.system")}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => handleThemeChange("light")}
                  className={`cursor-pointer hover:bg-accent ${theme === "light" ? "bg-accent" : ""}`}
                >
                  <Sun className="h-4 w-4 mr-2" />
                  <span className="font-medium">{t("theme.light")}</span>
                  {theme === "light" && <span className="ml-2 text-primary">✓</span>}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleThemeChange("dark")}
                  className={`cursor-pointer hover:bg-accent ${theme === "dark" ? "bg-accent" : ""}`}
                >
                  <Moon className="h-4 w-4 mr-2" />
                  <span className="font-medium">{t("theme.dark")}</span>
                  {theme === "dark" && <span className="ml-2 text-primary">✓</span>}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleThemeChange("system")}
                  className={`cursor-pointer hover:bg-accent ${theme === "system" ? "bg-accent" : ""}`}
                >
                  <Monitor className="h-4 w-4 mr-2" />
                  <span className="font-medium">{t("theme.system")}</span>
                  {theme === "system" && <span className="ml-2 text-primary">✓</span>}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" className="bg-background hover:bg-accent cursor-pointer" asChild>
              <Link href="/greenpulse/login">{t("buttons.login")}</Link>
            </Button>
            <Button className="bg-primary hover:bg-primary/90 cursor-pointer" asChild>
              <Link href="/greenpulse/signup">{t("buttons.signup")}</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            Smart Agriculture Technology
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Smart Pesticide & Crop Health Management System
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Monitor crop health, optimize pesticide usage, and make data-driven agricultural decisions with our
            comprehensive management platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="w-full sm:w-auto cursor-pointer" asChild>
              <Link href="/greenpulse/signup">Get Started Today</Link>
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent cursor-pointer" asChild>
              <Link href="/greenpulse/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">About GreenPulse</h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Revolutionizing agriculture through intelligent technology and sustainable farming practices
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <h4 className="text-2xl font-semibold mb-3 text-primary">Our Mission</h4>
                <p className="text-muted-foreground">
                  To empower farmers with cutting-edge technology for crop health monitoring, disease detection, and
                  precision pesticide management, ultimately increasing yield while promoting sustainable farming
                  practices.
                </p>
              </div>

              <div>
                <h4 className="text-2xl font-semibold mb-3 text-primary">Why Choose GreenPulse?</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start space-x-2">
                    <Leaf className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span>AI-powered crop health analysis with 95% accuracy</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Droplets className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span>Reduce pesticide usage by up to 40% with smart recommendations</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <BarChart3 className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span>Real-time monitoring and predictive analytics</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Users className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span>Multi-language support for diverse farming communities</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4">
                <Button size="lg" variant="outline" className="bg-background cursor-pointer" asChild>
                  <Link href="/greenpulse/about">Learn More About Us</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
                    <div className="text-sm text-muted-foreground">Farmers Served</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">95%</div>
                    <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">40%</div>
                    <div className="text-sm text-muted-foreground">Pesticide Reduction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                    <div className="text-sm text-muted-foreground">Monitoring</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Comprehensive Agricultural Management</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4">{feature.icon}</div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">{t("appName")}</span>
          </div>
          <p className="text-muted-foreground mb-2">{t("about.contact")}</p>
          <p className="text-sm text-muted-foreground">{t("about.credit")}</p>
        </div>
      </footer>
    </div>
  )
}
