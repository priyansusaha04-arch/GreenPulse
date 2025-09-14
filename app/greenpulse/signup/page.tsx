"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Leaf, Loader2, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useI18n } from "@/lib/i18n"
import { useAuth, type UserRole, type FarmerType, type SignupData } from "@/lib/auth"

export default function SignupPage() {
  const { t, language } = useI18n()
  const { signup, isLoading } = useAuth()
  const router = useRouter()

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<SignupData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    role: "farmer",
    language: language,
    acceptTerms: false,
  })
  const [error, setError] = useState("")

  const cropOptions = ["Rice", "Wheat", "Maize", "Sugarcane", "Cotton", "Soybean", "Groundnut", "Pulses"]
  const infrastructureOptions = ["Tractor", "Trolley", "Drip Irrigation", "Sprinkler", "Harvester"]
  const irrigationTypes = ["Flood", "Drip", "Sprinkler", "Rain-fed"]

  const handleNext = () => {
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
        setError("Please fill in all required fields")
        return
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match")
        return
      }
    }
    setError("")
    setStep(step + 1)
  }

  const handleBack = () => {
    setError("")
    setStep(step - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.acceptTerms) {
      setError("Please accept the terms and conditions")
      return
    }

    const result = await signup(formData)
    if (result.success) {
      router.push("/greenpulse/dashboard")
    } else {
      setError(result.error || "Signup failed. Please try again.")
    }
  }

  const updateFormData = (updates: Partial<SignupData>) => {
    setFormData({ ...formData, ...updates })
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">{t("appName")}</span>
          </div>
          <CardTitle className="text-2xl">{t("buttons.signup")}</CardTitle>
          <CardDescription>Create your account to start managing your agricultural data</CardDescription>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`w-3 h-3 rounded-full ${i <= step ? "bg-primary" : "bg-muted"}`} />
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>{t("auth.role")}</Label>
                <RadioGroup
                  value={formData.role}
                  onValueChange={(value: UserRole) => updateFormData({ role: value })}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="farmer" id="farmer" />
                    <Label htmlFor="farmer">{t("auth.farmer")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="government" id="government" />
                    <Label htmlFor="government">{t("auth.government")}</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">{t("auth.fullName")}</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => updateFormData({ fullName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("auth.email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData({ email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">{t("auth.phoneNumber")}</Label>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
                    placeholder="+91 9876543210"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">{t("auth.dateOfBirth")}</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => updateFormData({ dateOfBirth: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">{t("auth.password")}</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => updateFormData({ password: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t("auth.confirmPassword")}</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => updateFormData({ confirmPassword: e.target.value })}
                    required
                  />
                </div>
              </div>

              <Button onClick={handleNext} className="w-full">
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {step === 2 && formData.role === "farmer" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>{t("auth.farmerType")}</Label>
                <Select
                  value={formData.farmerType}
                  onValueChange={(value: FarmerType) => updateFormData({ farmerType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select farmer type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small-scale">{t("auth.smallScale")}</SelectItem>
                    <SelectItem value="medium-scale">{t("auth.mediumScale")}</SelectItem>
                    <SelectItem value="large-scale">{t("auth.largeScale")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{t("auth.cropsGrown")}</Label>
                <div className="grid grid-cols-2 gap-2">
                  {cropOptions.map((crop) => (
                    <div key={crop} className="flex items-center space-x-2">
                      <Checkbox
                        id={crop}
                        checked={formData.cropsGrown?.includes(crop) || false}
                        onCheckedChange={(checked) => {
                          const current = formData.cropsGrown || []
                          if (checked) {
                            updateFormData({ cropsGrown: [...current, crop] })
                          } else {
                            updateFormData({ cropsGrown: current.filter((c) => c !== crop) })
                          }
                        }}
                      />
                      <Label htmlFor={crop} className="text-sm">
                        {crop}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fieldArea">{t("auth.fieldArea")}</Label>
                  <Input
                    id="fieldArea"
                    type="number"
                    value={formData.fieldArea || ""}
                    onChange={(e) => updateFormData({ fieldArea: Number.parseFloat(e.target.value) })}
                    placeholder="25"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Irrigation Type</Label>
                  <Select
                    value={formData.irrigationType}
                    onValueChange={(value) => updateFormData({ irrigationType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select irrigation type" />
                    </SelectTrigger>
                    <SelectContent>
                      {irrigationTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleBack} className="flex-1 bg-transparent">
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={handleNext} className="flex-1">
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && formData.role === "government" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Input
                    id="designation"
                    value={formData.designation || ""}
                    onChange={(e) => updateFormData({ designation: e.target.value })}
                    placeholder="Agricultural Officer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={formData.department || ""}
                    onChange={(e) => updateFormData({ department: e.target.value })}
                    placeholder="Department of Agriculture"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="regionScope">Region Scope</Label>
                  <Input
                    id="regionScope"
                    value={formData.regionScope || ""}
                    onChange={(e) => updateFormData({ regionScope: e.target.value })}
                    placeholder="Cuttack District"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="officialEmail">Official Email (Optional)</Label>
                  <Input
                    id="officialEmail"
                    type="email"
                    value={formData.officialEmail || ""}
                    onChange={(e) => updateFormData({ officialEmail: e.target.value })}
                    placeholder="officer@gov.in"
                  />
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleBack} className="flex-1 bg-transparent">
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={handleNext} className="flex-1">
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Review & Confirm</h3>

                <div className="bg-muted p-4 rounded-lg space-y-2">
                  <p>
                    <strong>Name:</strong> {formData.fullName}
                  </p>
                  <p>
                    <strong>Email:</strong> {formData.email}
                  </p>
                  <p>
                    <strong>Role:</strong> {t(`auth.${formData.role}`)}
                  </p>
                  {formData.role === "farmer" && formData.farmerType && (
                    <p>
                      <strong>Farmer Type:</strong> {t(`auth.${formData.farmerType.replace("-", "")}`)}
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="acceptTerms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => updateFormData({ acceptTerms: !!checked })}
                  />
                  <Label htmlFor="acceptTerms" className="text-sm">
                    {t("auth.acceptTerms")}
                  </Label>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button type="button" variant="outline" onClick={handleBack} className="flex-1 bg-transparent">
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Account
                </Button>
              </div>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/greenpulse/login" className="text-primary hover:underline">
                {t("buttons.login")}
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
