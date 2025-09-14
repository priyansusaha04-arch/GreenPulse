"use client"

import type React from "react"

import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "farmer" | "government"
  redirectTo?: string
}

export function ProtectedRoute({ children, requiredRole, redirectTo = "/greenpulse/login" }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push(redirectTo)
        return
      }

      if (requiredRole && user.role !== requiredRole) {
        // Redirect to appropriate dashboard based on user role
        const dashboardPath = user.role === "farmer" ? "/greenpulse/dashboard" : "/greenpulse/government/dashboard"
        router.push(dashboardPath)
        return
      }
    }
  }, [user, isLoading, requiredRole, router, redirectTo])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    )
  }

  if (!user || (requiredRole && user.role !== requiredRole)) {
    return null
  }

  return <>{children}</>
}
