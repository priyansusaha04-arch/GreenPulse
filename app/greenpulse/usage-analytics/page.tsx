"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { useI18n } from "@/lib/i18n"
import { ArrowLeft, TrendingUp, BarChart3, PieChart, Download } from "lucide-react"
import Link from "next/link"

export default function UsageAnalyticsPage() {
  const { t } = useI18n()

  const [analyticsData] = useState({
    totalPesticideUsage: 2847,
    monthlyGrowth: 12.5,
    topPesticides: [
      { name: "Chlorpyrifos 20% EC", usage: 45, percentage: 32 },
      { name: "Imidacloprid 17.8% SL", usage: 38, percentage: 27 },
      { name: "Cypermethrin 10% EC", usage: 28, percentage: 20 },
      { name: "Carbendazim 50% WP", usage: 30, percentage: 21 },
    ],
    regionUsage: [
      { region: "Cuttack", usage: 890, farmers: 245, avgPerFarmer: 3.6 },
      { region: "Bhubaneswar", usage: 756, farmers: 198, avgPerFarmer: 3.8 },
      { region: "Puri", usage: 1201, farmers: 312, avgPerFarmer: 3.9 },
    ],
    monthlyTrend: [
      { month: "Jan", usage: 2100, applications: 156 },
      { month: "Feb", usage: 2350, applications: 178 },
      { month: "Mar", usage: 2847, applications: 203 },
    ],
  })

  return (
    <DashboardLayout title="Usage Analytics - Regional Patterns">
      <div className="space-y-6">
        {/* Back Navigation */}
        <Link href="/greenpulse/dashboard/gov">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.totalPesticideUsage}L</div>
              <p className="text-xs text-green-600">+{analyticsData.monthlyGrowth}% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Regions</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.regionUsage.length}</div>
              <p className="text-xs text-muted-foreground">Regions monitored</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Usage/Farmer</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.8L</div>
              <p className="text-xs text-muted-foreground">Per farmer this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Applications</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">203</div>
              <p className="text-xs text-green-600">+14% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Usage Trends Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Monthly Usage Trends</span>
              <Button size="sm" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
            </CardTitle>
            <CardDescription>Pesticide usage and application trends over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Interactive usage trend chart would be displayed here</p>
                <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                  {analyticsData.monthlyTrend.map((month) => (
                    <div key={month.month} className="text-center">
                      <div className="font-medium">{month.month}</div>
                      <div className="text-muted-foreground">{month.usage}L</div>
                      <div className="text-xs text-muted-foreground">{month.applications} apps</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Regional Usage Breakdown */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Regional Usage Distribution</CardTitle>
              <CardDescription>Pesticide usage by region</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.regionUsage.map((region) => (
                  <div key={region.region} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{region.region}</div>
                      <div className="text-sm text-muted-foreground">{region.farmers} farmers</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{region.usage}L</div>
                      <div className="text-sm text-muted-foreground">{region.avgPerFarmer}L avg</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Pesticides Used</CardTitle>
              <CardDescription>Most commonly used pesticides</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.topPesticides.map((pesticide) => (
                  <div key={pesticide.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{pesticide.name}</span>
                      <span>{pesticide.percentage}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: `${pesticide.percentage}%` }} />
                    </div>
                    <div className="text-xs text-muted-foreground">{pesticide.usage} applications</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Environmental Impact Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Environmental Impact Analysis</CardTitle>
            <CardDescription>Sustainability metrics and environmental considerations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">78%</div>
                <div className="text-sm text-muted-foreground">Eco-friendly pesticides</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">-12%</div>
                <div className="text-sm text-muted-foreground">Reduction in usage</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">92%</div>
                <div className="text-sm text-muted-foreground">Proper disposal rate</div>
              </div>
            </div>
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
