"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { useI18n } from "@/lib/i18n"
import { useAuth } from "@/lib/auth"
import {
  MapPin,
  Users,
  AlertTriangle,
  TrendingUp,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  Shield,
} from "lucide-react"

export default function GovernmentDashboard() {
  const { t } = useI18n()
  const { user } = useAuth()

  // Mock data - in real app this would come from API
  const [regionData] = useState({
    totalFarmers: 1247,
    activeFarmers: 892,
    totalArea: 15420, // acres
    monitoredArea: 12350,
    alerts: {
      critical: 3,
      warning: 12,
      info: 8,
    },
    pesticideUsage: {
      thisMonth: 2450, // liters
      lastMonth: 2180,
      approved: 156,
      pending: 23,
      rejected: 8,
    },
    cropHealth: {
      healthy: 78,
      moderate: 18,
      poor: 4,
    },
  })

  const [recentAlerts] = useState([
    {
      id: 1,
      type: "critical",
      message: "High infection risk detected in Sector 7",
      location: "Cuttack District",
      time: "2 hours ago",
      farmers: 15,
    },
    {
      id: 2,
      type: "warning",
      message: "Excessive pesticide usage reported",
      location: "Bhubaneswar Block",
      time: "4 hours ago",
      farmers: 3,
    },
    {
      id: 3,
      type: "info",
      message: "Weather alert: Heavy rain expected",
      location: "Regional",
      time: "6 hours ago",
      farmers: 892,
    },
  ])

  const [pendingApprovals] = useState([
    {
      id: 1,
      farmer: "Rajesh Kumar",
      pesticide: "Chlorpyrifos 20% EC",
      quantity: "25L",
      reason: "Bollworm infestation",
      submitted: "2 days ago",
      urgency: "high",
    },
    {
      id: 2,
      farmer: "Priya Sharma",
      pesticide: "Imidacloprid 17.8% SL",
      quantity: "10L",
      reason: "Aphid control",
      submitted: "1 day ago",
      urgency: "medium",
    },
    {
      id: 3,
      farmer: "Mohan Das",
      pesticide: "Mancozeb 75% WP",
      quantity: "5kg",
      reason: "Fungal prevention",
      submitted: "3 hours ago",
      urgency: "low",
    },
  ])

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical":
        return "text-red-600 bg-red-100 dark:bg-red-900/20"
      case "warning":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20"
      case "info":
        return "text-blue-600 bg-blue-100 dark:bg-blue-900/20"
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20"
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "text-red-600 bg-red-100 dark:bg-red-900/20"
      case "medium":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20"
      case "low":
        return "text-green-600 bg-green-100 dark:bg-green-900/20"
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20"
    }
  }

  return (
    <DashboardLayout title={`${t("nav.dashboard")} - ${t("auth.government")}`}>
      <div className="space-y-6">
        {/* Overview Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Farmers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{regionData.totalFarmers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{regionData.activeFarmers}</span> active this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monitored Area</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{regionData.monitoredArea.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">of {regionData.totalArea.toLocaleString()} total acres</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{regionData.alerts.critical}</div>
              <p className="text-xs text-muted-foreground">
                {regionData.alerts.warning} warnings, {regionData.alerts.info} info
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pesticide Usage</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{regionData.pesticideUsage.thisMonth}L</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12%</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Regional Health Map */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-secondary" />
                <span>{t("nav.regionOverview")}</span>
              </CardTitle>
              <CardDescription>Real-time crop health across monitored regions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg h-80 flex items-center justify-center mb-4">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Interactive regional map would be displayed here</p>
                </div>
              </div>

              {/* Health Distribution */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Healthy Crops</span>
                  <span className="text-green-600">{regionData.cropHealth.healthy}%</span>
                </div>
                <Progress value={regionData.cropHealth.healthy} className="h-2" />

                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <div className="text-lg font-semibold text-green-600">{regionData.cropHealth.healthy}%</div>
                    <div className="text-muted-foreground">Healthy</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-yellow-600">{regionData.cropHealth.moderate}%</div>
                    <div className="text-muted-foreground">Moderate</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-red-600">{regionData.cropHealth.poor}%</div>
                    <div className="text-muted-foreground">Poor</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-secondary" />
                <span>{t("nav.alerts")}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="border rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge className={getAlertColor(alert.type)} variant="secondary">
                        {alert.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{alert.time}</span>
                    </div>
                    <p className="text-sm font-medium">{alert.message}</p>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{alert.location}</span>
                      <span>{alert.farmers} farmers affected</span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                View All Alerts
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Pesticide Approvals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-secondary" />
              <span>{t("nav.pesticideApprovals")}</span>
            </CardTitle>
            <CardDescription>Pending pesticide usage requests requiring approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApprovals.map((approval) => (
                <div key={approval.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{approval.farmer}</h4>
                      <p className="text-sm text-muted-foreground">{approval.pesticide}</p>
                    </div>
                    <Badge className={getUrgencyColor(approval.urgency)} variant="secondary">
                      {approval.urgency} priority
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-muted-foreground">Quantity:</span>
                      <div className="font-medium">{approval.quantity}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Reason:</span>
                      <div className="font-medium">{approval.reason}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Submitted:</span>
                      <div className="font-medium">{approval.submitted}</div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                    <Button size="sm" variant="outline" className="bg-transparent">
                      <Clock className="mr-2 h-4 w-4" />
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Analytics Summary */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-secondary" />
                <span>{t("nav.usageAnalytics")}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Approved Requests</span>
                  <span className="text-2xl font-bold text-green-600">{regionData.pesticideUsage.approved}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Pending Requests</span>
                  <span className="text-2xl font-bold text-yellow-600">{regionData.pesticideUsage.pending}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Rejected Requests</span>
                  <span className="text-2xl font-bold text-red-600">{regionData.pesticideUsage.rejected}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-secondary" />
                <span>Monthly Trends</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Pesticide Usage Efficiency</span>
                    <span>+12%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Farmer Compliance</span>
                    <span>94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Response Time</span>
                    <span>2.3 hrs avg</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
