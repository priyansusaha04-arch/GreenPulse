"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { CropHealthWidget } from "@/components/dashboard/crop-health-widget"
import { EnvironmentWidget } from "@/components/dashboard/environment-widget"
import { useI18n } from "@/lib/i18n"
import { useAuth } from "@/lib/auth"
import { Activity, MapPin, Upload, Zap, Tractor, Droplets } from "lucide-react"

export default function FarmerDashboard() {
  const { t } = useI18n()
  const { user } = useAuth()

  // Mock data - in real app this would come from API
  const [cropHealthData] = useState({
    leafWetness: {
      status: "moderate" as const,
      lastMeasurement: "2 hours ago",
    },
    ndvi: {
      score: 78,
      trend: [72, 74, 76, 78, 79, 78, 78],
    },
    pri: 0.65,
    chlorophyllIndex: "normal" as const,
    infectionRisk: {
      level: "low" as const,
      confidence: 85,
    },
  })

  const [environmentData] = useState({
    soilMoisture: 65,
    soilTemperature: 24,
    airTemperature: 28,
    humidity: 72,
    windSpeed: 8,
    sprayingSafety: "safe" as const,
    rainForecast: {
      hours: 6,
      probability: 30,
    },
    batteryLevel: 85,
    pesticideVolume: 45,
  })

  const handleViewDetails = () => {
    // Navigate to crop details page
  }

  const handleDelaySpray = () => {
    // Handle delay spray action
  }

  const handleProceedSpray = () => {
    // Handle proceed spray action
  }

  const renderSmallScaleFarmer = () => (
    <div className="space-y-6">
      {/* Two-section widget requirement */}
      <div className="grid lg:grid-cols-2 gap-6">
        <CropHealthWidget data={cropHealthData} onViewDetails={handleViewDetails} />
        <EnvironmentWidget data={environmentData} onDelaySpray={handleDelaySpray} onProceedSpray={handleProceedSpray} />
      </div>

      {/* Small farmer specific features */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="h-5 w-5 text-secondary" />
              <span>Leaf Analysis</span>
            </CardTitle>
            <CardDescription>Upload leaf images for AI analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <div className="text-2xl font-bold text-secondary mb-2">3</div>
              <div className="text-sm text-muted-foreground">Images analyzed today</div>
            </div>
            <Button className="w-full">
              <Upload className="mr-2 h-4 w-4" />
              {t("buttons.upload")} Image
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-secondary" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Droplets className="mr-2 h-4 w-4" />
              {t("buttons.spotSpray")}
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Activity className="mr-2 h-4 w-4" />
              {t("buttons.scheduleIrrigation")}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Sprayed 2.5L pesticide</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span>Irrigation completed</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                <span>Battery charged to 85%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderMediumScaleFarmer = () => (
    <div className="space-y-6">
      {/* Two-section widget requirement */}
      <div className="grid lg:grid-cols-2 gap-6">
        <CropHealthWidget data={cropHealthData} onViewDetails={handleViewDetails} />
        <EnvironmentWidget data={environmentData} onDelaySpray={handleDelaySpray} onProceedSpray={handleProceedSpray} />
      </div>

      {/* Medium farmer specific features */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-secondary" />
              <span>Field Map</span>
            </CardTitle>
            <CardDescription>Interactive NDVI and infection zones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Interactive field map would be displayed here</p>
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <Button size="sm">Upload Scouting Data</Button>
              <Button size="sm" variant="outline">
                Plan Spray Route
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sectional Spray</CardTitle>
            <CardDescription>Boom section control</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm">
                <div className="flex justify-between mb-1">
                  <span>Infected Zones</span>
                  <span>15%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: "15%" }} />
                </div>
              </div>
              <div className="text-sm">
                <div className="flex justify-between mb-1">
                  <span>Pesticide Needed</span>
                  <span>12.5L</span>
                </div>
              </div>
              <Button className="w-full" size="sm">
                Generate VRS File
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderLargeScaleFarmer = () => (
    <div className="space-y-6">
      {/* Two-section widget requirement */}
      <div className="grid lg:grid-cols-2 gap-6">
        <CropHealthWidget data={cropHealthData} onViewDetails={handleViewDetails} />
        <EnvironmentWidget data={environmentData} onDelaySpray={handleDelaySpray} onProceedSpray={handleProceedSpray} />
      </div>

      {/* Large farmer specific features */}
      <div className="grid lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-secondary" />
              <span>Regional Health Map</span>
            </CardTitle>
            <CardDescription>Multi-field NDVI analysis with drone overlay</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted rounded-lg h-80 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Regional drone survey map would be displayed here</p>
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <Button size="sm">Import Drone Survey</Button>
              <Button size="sm" variant="outline">
                Export VRS
              </Button>
              <Button size="sm" variant="outline">
                Fleet Control
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Tractor className="h-5 w-5 text-secondary" />
              <span>Fleet Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Active Tractors</span>
                <Badge variant="secondary">3/5</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Area Covered</span>
                <span>245 acres</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Pesticide Used</span>
                <span>180L</span>
              </div>
            </div>
            <Button className="w-full" size="sm">
              View Fleet Logs
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Predictive Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Predictive Analytics</CardTitle>
          <CardDescription>AI-powered disease spread predictions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">15%</div>
              <div className="text-sm text-muted-foreground">Predicted infection spread (7 days)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">₹45,000</div>
              <div className="text-sm text-muted-foreground">Estimated cost savings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">320L</div>
              <div className="text-sm text-muted-foreground">Optimized pesticide usage</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderDashboardContent = () => {
    switch (user?.farmerType) {
      case "small-scale":
        return renderSmallScaleFarmer()
      case "medium-scale":
        return renderMediumScaleFarmer()
      case "large-scale":
        return renderLargeScaleFarmer()
      default:
        return renderMediumScaleFarmer()
    }
  }

  return (
    <DashboardLayout
      title={`${t("nav.dashboard")} - ${user?.farmerType ? t(`auth.${user.farmerType.replace("-", "")}`) : ""} ${t("auth.farmer")}`}
    >
      {renderDashboardContent()}
    </DashboardLayout>
  )
}
