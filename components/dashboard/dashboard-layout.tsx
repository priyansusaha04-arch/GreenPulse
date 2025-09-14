"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Menu,
  Home,
  BarChart3,
  Leaf,
  FileText,
  AlertTriangle,
  Settings,
  HelpCircle,
  LogOut,
  Bell,
  Globe,
  Sun,
  Moon,
  Monitor,
  User,
  MapPin,
  Users,
  CheckCircle,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useI18n } from "@/lib/i18n"
import { useTheme } from "@/lib/theme"
import { useAuth } from "@/lib/auth"

interface DashboardLayoutProps {
  children: React.ReactNode
  title: string
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const { t, language, setLanguage } = useI18n()
  const { theme, setTheme } = useTheme()
  const { user, logout } = useAuth()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push("/greenpulse")
  }

  const navigationItems = [
    {
      href: user?.role === "government" ? "/greenpulse/dashboard/government" : "/greenpulse/dashboard/farmer",
      icon: Home,
      label: t("nav.dashboard"),
    },
    { href: "/greenpulse/crop-details", icon: Leaf, label: t("nav.cropDetails") },
    { href: "/greenpulse/leaf-analysis", icon: BarChart3, label: t("nav.leafAnalysis") },
    { href: "/greenpulse/pesticide-suggestions", icon: Leaf, label: t("nav.pesticides") },
    { href: "/greenpulse/reports", icon: FileText, label: t("nav.reports") },
    { href: "/greenpulse/alerts", icon: AlertTriangle, label: t("nav.alerts") },
  ]

  if (user?.role === "government") {
    navigationItems.splice(
      2,
      0,
      { href: "/greenpulse/region-details", icon: MapPin, label: "Region Details" },
      { href: "/greenpulse/farmer-details", icon: Users, label: "Farmer Details" },
      { href: "/greenpulse/pesticide-approvals", icon: CheckCircle, label: "Pesticide Approvals" },
      { href: "/greenpulse/usage-analytics", icon: TrendingUp, label: "Usage Analytics" },
    )
  }

  const Sidebar = ({ mobile = false }) => (
    <div className={`flex flex-col h-full ${mobile ? "p-4" : "p-6"}`}>
      <div className="flex items-center space-x-2 mb-8">
        <Leaf className="h-8 w-8 text-primary" />
        <span className="text-xl font-bold text-primary">{t("appName")}</span>
      </div>

      <nav className="flex-1 space-y-2">
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
            onClick={() => mobile && setSidebarOpen(false)}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="space-y-2 pt-4 border-t border-border">
        <Link
          href="/greenpulse/settings"
          className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
          onClick={() => mobile && setSidebarOpen(false)}
        >
          <Settings className="h-5 w-5" />
          <span>{t("nav.settings")}</span>
        </Link>
        <Link
          href="/greenpulse/help"
          className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
          onClick={() => mobile && setSidebarOpen(false)}
        >
          <HelpCircle className="h-5 w-5" />
          <span>{t("nav.help")}</span>
        </Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-border bg-sidebar">
          <Sidebar />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <Sidebar mobile />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Top Header */}
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:gap-x-6 sm:px-6 lg:px-8">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden bg-transparent">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
          </Sheet>

          <div className="flex flex-1 items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">{title}</h1>
              {user && (
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="outline">{t(`auth.${user.role}`)}</Badge>
                  {user.farmerType && <Badge variant="secondary">{user.farmerType}</Badge>}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Button variant="outline" size="icon" className="bg-background hover:bg-accent">
                <Bell className="h-4 w-4" />
              </Button>

              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="bg-background hover:bg-accent">
                    <Globe className="h-4 w-4 mr-2" />
                    {language === "en" ? "EN" : language === "hi" ? "हि" : "ଓଡ଼"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setLanguage("en")} className="cursor-pointer">
                    {t("language.english")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage("hi")} className="cursor-pointer">
                    {t("language.hindi")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage("od")} className="cursor-pointer">
                    {t("language.odia")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Theme Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="bg-background hover:bg-accent">
                    {theme === "light" && <Sun className="h-4 w-4" />}
                    {theme === "dark" && <Moon className="h-4 w-4" />}
                    {theme === "system" && <Monitor className="h-4 w-4" />}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer">
                    <Sun className="h-4 w-4 mr-2" />
                    {t("theme.light")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer">
                    <Moon className="h-4 w-4 mr-2" />
                    {t("theme.dark")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer">
                    <Monitor className="h-4 w-4 mr-2" />
                    {t("theme.system")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="bg-background hover:bg-accent">
                    <User className="h-4 w-4 mr-2" />
                    {user?.fullName}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="py-6 px-4 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}
