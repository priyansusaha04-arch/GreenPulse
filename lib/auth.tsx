"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type UserRole = "farmer" | "government"
export type FarmerType = "small-scale" | "medium-scale" | "large-scale"

export interface User {
  id: string
  email: string
  fullName: string
  phoneNumber: string
  role: UserRole
  farmerType?: FarmerType
  language: "en" | "hi" | "od"
  theme: "light" | "dark" | "system"
  // Farmer-specific fields
  cropsGrown?: string[]
  fieldArea?: number
  location?: {
    country: string
    state: string
    district: string
    village: string
  }
  gpsCoordinate?: string
  preferredPesticideBrands?: string[]
  farmInfrastructure?: string[]
  irrigationType?: string
  certifications?: string[]
  // Government-specific fields
  designation?: string
  department?: string
  regionScope?: string
  officialEmail?: string
  // Profile completion
  profileComplete: boolean
  lastLogin?: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: UserRole) => Promise<{ success: boolean; error?: string }>
  signup: (userData: SignupData) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateProfile: (updates: Partial<User>) => Promise<boolean>
  isLoading: boolean
  isAuthenticated: boolean
}

export interface SignupData {
  fullName: string
  email: string
  phoneNumber: string
  password: string
  confirmPassword: string
  dateOfBirth: string
  role: UserRole
  language: "en" | "hi" | "od"
  acceptTerms: boolean
  // Farmer-specific
  farmerType?: FarmerType
  cropsGrown?: string[]
  fieldArea?: number
  location?: {
    country: string
    state: string
    district: string
    village: string
  }
  gpsCoordinate?: string
  preferredPesticideBrands?: string[]
  farmInfrastructure?: string[]
  irrigationType?: string
  certifications?: string[]
  // Government-specific
  designation?: string
  department?: string
  regionScope?: string
  officialEmail?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user database for demonstration
const mockUsers: Record<string, User> = {
  "farmer@test.com": {
    id: "1",
    email: "farmer@test.com",
    fullName: "Rajesh Kumar",
    phoneNumber: "+91 9876543210",
    role: "farmer",
    farmerType: "medium-scale",
    language: "en",
    theme: "system",
    cropsGrown: ["Rice", "Wheat", "Sugarcane"],
    fieldArea: 25,
    location: {
      country: "India",
      state: "Odisha",
      district: "Cuttack",
      village: "Salipur",
    },
    gpsCoordinate: "20.4625, 85.9189",
    irrigationType: "Drip",
    farmInfrastructure: ["Tractor", "Drip Irrigation"],
    profileComplete: true,
    createdAt: "2024-01-15T10:30:00Z",
    lastLogin: new Date().toISOString(),
  },
  "gov@test.com": {
    id: "2",
    email: "gov@test.com",
    fullName: "Dr. Priya Sharma",
    phoneNumber: "+91 9876543211",
    role: "government",
    language: "en",
    theme: "system",
    designation: "Agricultural Officer",
    department: "Department of Agriculture",
    regionScope: "Cuttack District",
    officialEmail: "priya.sharma@gov.od.in",
    profileComplete: true,
    createdAt: "2024-01-10T09:15:00Z",
    lastLogin: new Date().toISOString(),
  },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("greenpulse-user")
    const sessionToken = localStorage.getItem("greenpulse-session")

    if (savedUser && sessionToken) {
      try {
        const userData = JSON.parse(savedUser)
        // Validate session token (in real app, verify with backend)
        const tokenData = JSON.parse(atob(sessionToken))
        if (tokenData.exp > Date.now()) {
          setUser(userData)
        } else {
          // Session expired
          localStorage.removeItem("greenpulse-user")
          localStorage.removeItem("greenpulse-session")
        }
      } catch (error) {
        console.error("Error parsing saved user:", error)
        localStorage.removeItem("greenpulse-user")
        localStorage.removeItem("greenpulse-session")
      }
    }
    setIsLoading(false)
  }, [])

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string): { valid: boolean; message?: string } => {
    if (password.length < 8) {
      return { valid: false, message: "Password must be at least 8 characters long" }
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return { valid: false, message: "Password must contain uppercase, lowercase, and number" }
    }
    return { valid: true }
  }

  const login = async (
    email: string,
    password: string,
    role: UserRole,
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (!validateEmail(email)) {
        return { success: false, error: "Please enter a valid email address" }
      }

      // Check mock users
      const mockUser = mockUsers[email.toLowerCase()]
      if (!mockUser || mockUser.role !== role) {
        return { success: false, error: "Invalid email, password, or role" }
      }

      // In real app, verify password hash
      if (password !== "password123") {
        return { success: false, error: "Invalid email, password, or role" }
      }

      // Update last login
      const updatedUser = { ...mockUser, lastLogin: new Date().toISOString() }

      // Create session token (in real app, get from backend)
      const sessionToken = btoa(
        JSON.stringify({
          userId: updatedUser.id,
          exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        }),
      )

      setUser(updatedUser)
      localStorage.setItem("greenpulse-user", JSON.stringify(updatedUser))
      localStorage.setItem("greenpulse-session", sessionToken)

      return { success: true }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, error: "Login failed. Please try again." }
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (userData: SignupData): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Validation
      if (!validateEmail(userData.email)) {
        return { success: false, error: "Please enter a valid email address" }
      }

      const passwordValidation = validatePassword(userData.password)
      if (!passwordValidation.valid) {
        return { success: false, error: passwordValidation.message }
      }

      if (userData.password !== userData.confirmPassword) {
        return { success: false, error: "Passwords do not match" }
      }

      if (!userData.acceptTerms) {
        return { success: false, error: "Please accept the terms and conditions" }
      }

      // Check if email already exists
      if (mockUsers[userData.email.toLowerCase()]) {
        return { success: false, error: "An account with this email already exists" }
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        fullName: userData.fullName,
        phoneNumber: userData.phoneNumber,
        role: userData.role,
        farmerType: userData.farmerType,
        language: userData.language,
        theme: "system",
        cropsGrown: userData.cropsGrown,
        fieldArea: userData.fieldArea,
        location: userData.location,
        gpsCoordinate: userData.gpsCoordinate,
        preferredPesticideBrands: userData.preferredPesticideBrands,
        farmInfrastructure: userData.farmInfrastructure,
        irrigationType: userData.irrigationType,
        certifications: userData.certifications,
        designation: userData.designation,
        department: userData.department,
        regionScope: userData.regionScope,
        officialEmail: userData.officialEmail,
        profileComplete: !!(userData.role === "farmer"
          ? userData.farmerType && userData.cropsGrown?.length
          : userData.designation && userData.department),
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      }

      // Create session token
      const sessionToken = btoa(
        JSON.stringify({
          userId: newUser.id,
          exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        }),
      )

      setUser(newUser)
      localStorage.setItem("greenpulse-user", JSON.stringify(newUser))
      localStorage.setItem("greenpulse-session", sessionToken)

      return { success: true }
    } catch (error) {
      console.error("Signup error:", error)
      return { success: false, error: "Signup failed. Please try again." }
    } finally {
      setIsLoading(false)
    }
  }

  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    if (!user) return false

    try {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem("greenpulse-user", JSON.stringify(updatedUser))
      return true
    } catch (error) {
      console.error("Profile update error:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("greenpulse-user")
    localStorage.removeItem("greenpulse-session")
  }

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        updateProfile,
        isLoading,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
