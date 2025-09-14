"use client"

import type React from "react"

import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  redirectAuthenticated?: string
}

export function AuthGuard({ children, requireAuth = false, redirectAuthenticated }: AuthGuardProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !user) {
        router.push("/greenpulse/login")
        return
      }

      if (redirectAuthenticated && user) {
        const dashboardPath = user.role === "farmer" ? "/greenpulse/dashboard" : "/greenpulse/government/dashboard"
        router.push(dashboardPath)
        return
      }
    }
  }, [user, isLoading, requireAuth, redirectAuthenticated, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    )
  }

  if (requireAuth && !user) {
    return null
  }

  if (redirectAuthenticated && user) {
    return null
  }

  return <>{children}</>
}
