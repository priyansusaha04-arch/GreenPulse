"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { useI18n } from "@/lib/i18n"
import { useAuth } from "@/lib/auth"
import { MapPin, TrendingUp, Download, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function RegionDetailsPage() {
  const { t } = useI18n()
  const { user } = useAuth()

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "text-green-600 bg-green-100 dark:bg-green-900/20"
      case "normal":
        return "text-blue-600 bg-blue-100 dark:bg-blue-900/20"
      case "attention":
        return "text-red-600 bg-red-100 dark:bg-red-900/20"
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20"
    }
  }

  return (
    <DashboardLayout title="Region Details - Comprehensive Analysis">
      <div className="space-y-6">
        {/* Back Navigation */}
        <Link href="/greenpulse/dashboard/gov">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>

        {/* Regional Map and Statistics */}
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-secondary" />
                <span>Detailed Regional Map</span>
              </CardTitle>
              <CardDescription>Interactive map with crop field infection levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg h-80 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 500 400" className="w-full h-full">
                    {/* Background regions */}
                    <rect
                      x="50"
                      y="50"
                      width="400"
                      height="300"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-border"
                    />

                    {/* Crop fields with infection indicators */}
                    <g>
                      {/* Good health fields (Green) */}
                      <rect
                        x="80"
                        y="80"
                        width="60"
                        height="40"
                        fill="#22c55e"
                        opacity="0.7"
                        className="cursor-pointer hover:opacity-90"
                      />
                      <rect
                        x="160"
                        y="120"
                        width="50"
                        height="50"
                        fill="#22c55e"
                        opacity="0.7"
                        className="cursor-pointer hover:opacity-90"
                      />
                      <rect
                        x="280"
                        y="90"
                        width="70"
                        height="45"
                        fill="#22c55e"
                        opacity="0.7"
                        className="cursor-pointer hover:opacity-90"
                      />

                      {/* Moderate infection (Yellow) */}
                      <rect
                        x="220"
                        y="180"
                        width="55"
                        height="60"
                        fill="#eab308"
                        opacity="0.7"
                        className="cursor-pointer hover:opacity-90"
                      />
                      <rect
                        x="120"
                        y="200"
                        width="45"
                        height="35"
                        fill="#eab308"
                        opacity="0.7"
                        className="cursor-pointer hover:opacity-90"
                      />

                      {/* High infection (Red) */}
                      <rect
                        x="350"
                        y="160"
                        width="80"
                        height="55"
                        fill="#ef4444"
                        opacity="0.7"
                        className="cursor-pointer hover:opacity-90"
                      />
                      <rect
                        x="300"
                        y="250"
                        width="60"
                        height="40"
                        fill="#ef4444"
                        opacity="0.7"
                        className="cursor-pointer hover:opacity-90"
                      />
                    </g>

                    {/* District labels */}
                    <text x="110" y="105" textAnchor="middle" className="text-xs fill-current font-medium">
                      Bhubaneswar
                    </text>
                    <text x="185" y="145" textAnchor="middle" className="text-xs fill-current font-medium">
                      Cuttack
                    </text>
                    <text x="390" y="190" textAnchor="middle" className="text-xs fill-current font-medium">
                      Puri
                    </text>
                  </svg>
                </div>

                {/* Enhanced Legend */}
                <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-sm rounded-lg p-4 border">
                  <div className="text-sm font-medium mb-3">Field Health Status</div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-3 bg-green-500 rounded" />
                      <span className="text-xs">Healthy (0-5% infection)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-3 bg-yellow-500 rounded" />
                      <span className="text-xs">Moderate (5-15% infection)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-3 bg-red-500 rounded" />
                      <span className="text-xs">Critical (15%+ infection)</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-secondary" />
                <span>Regional Statistics</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Fields</span>
                  <span className="font-medium">247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Healthy Fields</span>
                  <span className="font-medium text-green-600">189 (76%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Moderate Risk</span>
                  <span className="font-medium text-yellow-600">38 (15%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Critical Risk</span>
                  <span className="font-medium text-red-600">20 (9%)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* District Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>District Overview</span>
              <Button size="sm" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            </CardTitle>
            <CardDescription>Detailed statistics by district</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>District</TableHead>
                  <TableHead>Villages</TableHead>
                  <TableHead>Infection Rate</TableHead>
                  <TableHead>Avg NDVI</TableHead>
                  <TableHead>Soil Moisture</TableHead>
                  <TableHead>Last Report</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {regionalData.map((district) => (
                  <TableRow key={district.district}>
                    <TableCell className="font-medium">{district.district}</TableCell>
                    <TableCell>{district.villages}</TableCell>
                    <TableCell>{district.infectionRate}%</TableCell>
                    <TableCell>{district.avgNDVI}</TableCell>
                    <TableCell>{district.soilMoisture}%</TableCell>
                    <TableCell>{district.lastReport}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(district.status)} variant="outline">
                        {district.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
