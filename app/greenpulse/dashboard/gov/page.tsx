"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { useI18n } from "@/lib/i18n"
import { useAuth } from "@/lib/auth"
import { MapPin, Users, AlertTriangle, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function GovernmentDashboard() {
  const { t } = useI18n()
  const { user } = useAuth()

  // Mock data - in real app this would come from API
  const [regionalData] = useState([
    {
      district: "Cuttack",
      villages: 45,
      infectionRate: 12,
      avgNDVI: 75,
      soilMoisture: 62,
      lastReport: "2 hours ago",
      status: "normal",
    },
    {
      district: "Bhubaneswar",
      villages: 38,
      infectionRate: 8,
      avgNDVI: 82,
      soilMoisture: 58,
      lastReport: "1 hour ago",
      status: "good",
    },
    {
      district: "Puri",
      villages: 52,
      infectionRate: 18,
      avgNDVI: 68,
      soilMoisture: 45,
      lastReport: "3 hours ago",
      status: "attention",
    },
  ])

  return (
    <DashboardLayout title={`${t("nav.dashboard")} - ${user?.regionScope || "Regional Overview"}`}>
      <div className="space-y-6">
        {/* Regional Overview Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Districts</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 new this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Farmers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
              <p className="text-xs text-muted-foreground">+180 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Infection Rate</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.8%</div>
              <p className="text-xs text-green-600">-2.1% from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Soil Health</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">75.2</div>
              <p className="text-xs text-green-600">+1.2% from last week</p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Cards to Different Dashboards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/greenpulse/region-details">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Region Details</CardTitle>
                <CardDescription>View detailed regional analysis</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/greenpulse/farmer-details">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Farmer Details</CardTitle>
                <CardDescription>Manage farmer registrations</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/greenpulse/pesticide-approvals">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <AlertTriangle className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Pesticide Approvals</CardTitle>
                <CardDescription>Review pesticide applications</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/greenpulse/usage-analytics">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Usage Analytics</CardTitle>
                <CardDescription>Regional usage patterns</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* Interactive Regional Map */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-secondary" />
              <span>Interactive Regional Map</span>
            </CardTitle>
            <CardDescription>Click on regions to view detailed information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted rounded-lg h-96 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 400 300" className="w-full h-full">
                  {/* Background map outline */}
                  <rect
                    x="50"
                    y="50"
                    width="300"
                    height="200"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-border"
                  />

                  {/* Region 1 - Good (Green) */}
                  <circle cx="120" cy="120" r="15" fill="#22c55e" className="cursor-pointer hover:opacity-80" />
                  <text x="120" y="145" textAnchor="middle" className="text-xs fill-current">
                    Bhubaneswar
                  </text>

                  {/* Region 2 - Moderate (Yellow) */}
                  <circle cx="200" cy="100" r="15" fill="#eab308" className="cursor-pointer hover:opacity-80" />
                  <text x="200" y="125" textAnchor="middle" className="text-xs fill-current">
                    Cuttack
                  </text>

                  {/* Region 3 - High Risk (Red) */}
                  <circle cx="280" cy="160" r="15" fill="#ef4444" className="cursor-pointer hover:opacity-80" />
                  <text x="280" y="185" textAnchor="middle" className="text-xs fill-current">
                    Puri
                  </text>

                  {/* Additional regions */}
                  <circle cx="150" cy="180" r="12" fill="#22c55e" className="cursor-pointer hover:opacity-80" />
                  <circle cx="250" cy="120" r="12" fill="#eab308" className="cursor-pointer hover:opacity-80" />
                  <circle cx="180" cy="140" r="10" fill="#22c55e" className="cursor-pointer hover:opacity-80" />
                </svg>
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 border">
                <div className="text-sm font-medium mb-2">Infection Levels</div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span className="text-xs">Low (0-10%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <span className="text-xs">Moderate (10-15%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <span className="text-xs">High (15%+)</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-secondary" />
              <span>Active Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                <div className="text-sm">
                  <div className="font-medium">High infection in Puri</div>
                  <div className="text-muted-foreground">18% infection rate detected</div>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
                <div className="text-sm">
                  <div className="font-medium">Low soil moisture</div>
                  <div className="text-muted-foreground">3 districts below threshold</div>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                <div className="text-sm">
                  <div className="font-medium">Heavy rain forecast</div>
                  <div className="text-muted-foreground">Next 12 hours</div>
                </div>
              </div>
            </div>
            <Link href="/greenpulse/alerts">
              <Button className="w-full" size="sm">
                View All Alerts
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* About Us Section */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-primary">About GreenPulse</h3>
              <p className="text-muted-foreground">
                Smart Pesticide & Crop Health Management System developed by Team Verdantix
              </p>
              <p className="text-sm text-muted-foreground">
                Contact us at verdantix@gmail.com for support and inquiries
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
