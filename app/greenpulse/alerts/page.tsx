"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { useI18n } from "@/lib/i18n"
import { AlertTriangle, Bell, Clock, CheckCircle, X, Filter } from "lucide-react"

export default function AlertsPage() {
  const { t } = useI18n()
  const [filterSeverity, setFilterSeverity] = useState("all")
  const [filterType, setFilterType] = useState("all")

  // Mock alerts data
  const alerts = [
    {
      id: 1,
      type: "disease",
      severity: "high",
      title: "High Infection Rate Detected",
      description: "Leaf blight infection rate has increased to 18% in Field A-3",
      location: "Field A-3, Rice Crop",
      timestamp: "2024-01-12 14:30",
      status: "active",
      actionRequired: true,
    },
    {
      id: 2,
      type: "weather",
      severity: "medium",
      title: "Heavy Rain Forecast",
      description: "Heavy rainfall expected in next 6 hours. Consider delaying pesticide application.",
      location: "Regional Weather Alert",
      timestamp: "2024-01-12 12:15",
      status: "active",
      actionRequired: true,
    },
    {
      id: 3,
      type: "equipment",
      severity: "low",
      title: "Low Battery Warning",
      description: "Sensor battery level is below 20% in monitoring station MS-05",
      location: "Monitoring Station MS-05",
      timestamp: "2024-01-12 10:45",
      status: "acknowledged",
      actionRequired: false,
    },
    {
      id: 4,
      type: "soil",
      severity: "medium",
      title: "Low Soil Moisture",
      description: "Soil moisture levels have dropped below optimal range in multiple zones",
      location: "Fields B-1, B-2, C-4",
      timestamp: "2024-01-12 08:20",
      status: "resolved",
      actionRequired: false,
    },
    {
      id: 5,
      type: "pesticide",
      severity: "high",
      title: "Pesticide Stock Low",
      description: "Copper Oxychloride stock is running low. Only 15L remaining.",
      location: "Storage Unit A",
      timestamp: "2024-01-11 16:30",
      status: "active",
      actionRequired: true,
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-600 bg-red-100 dark:bg-red-900/20"
      case "medium":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20"
      case "low":
        return "text-blue-600 bg-blue-100 dark:bg-blue-900/20"
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-red-600 bg-red-100 dark:bg-red-900/20"
      case "acknowledged":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20"
      case "resolved":
        return "text-green-600 bg-green-100 dark:bg-green-900/20"
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "disease":
        return <AlertTriangle className="h-4 w-4" />
      case "weather":
        return <Bell className="h-4 w-4" />
      case "equipment":
        return <Clock className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSeverity = filterSeverity === "all" || alert.severity === filterSeverity
    const matchesType = filterType === "all" || alert.type === filterType
    return matchesSeverity && matchesType
  })

  const activeAlerts = filteredAlerts.filter((alert) => alert.status === "active")
  const acknowledgedAlerts = filteredAlerts.filter((alert) => alert.status === "acknowledged")
  const resolvedAlerts = filteredAlerts.filter((alert) => alert.status === "resolved")

  const AlertCard = ({ alert }: { alert: any }) => (
    <Card className="mb-4">
      <CardContent className="pt-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <div className={`p-2 rounded-full ${getSeverityColor(alert.severity)}`}>{getTypeIcon(alert.type)}</div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold">{alert.title}</h3>
                <Badge className={getSeverityColor(alert.severity)} variant="outline">
                  {alert.severity}
                </Badge>
                <Badge className={getStatusColor(alert.status)} variant="outline">
                  {alert.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span>{alert.location}</span>
                <span>{alert.timestamp}</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            {alert.status === "active" && (
              <>
                <Button size="sm" variant="outline">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Acknowledge
                </Button>
                <Button size="sm">Resolve</Button>
              </>
            )}
            {alert.status === "acknowledged" && <Button size="sm">Resolve</Button>}
            <Button size="sm" variant="outline">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <DashboardLayout title={t("nav.alerts")}>
      <div className="space-y-6">
        {/* Alert Summary */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Alerts</p>
                  <p className="text-2xl font-bold text-red-600">{activeAlerts.length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Acknowledged</p>
                  <p className="text-2xl font-bold text-yellow-600">{acknowledgedAlerts.length}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Resolved Today</p>
                  <p className="text-2xl font-bold text-green-600">{resolvedAlerts.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Action Required</p>
                  <p className="text-2xl font-bold text-primary">{alerts.filter((a) => a.actionRequired).length}</p>
                </div>
                <Bell className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filter Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="disease">Disease</SelectItem>
                  <SelectItem value="weather">Weather</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                  <SelectItem value="soil">Soil</SelectItem>
                  <SelectItem value="pesticide">Pesticide</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Alerts Tabs */}
        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">Active ({activeAlerts.length})</TabsTrigger>
            <TabsTrigger value="acknowledged">Acknowledged ({acknowledgedAlerts.length})</TabsTrigger>
            <TabsTrigger value="resolved">Resolved ({resolvedAlerts.length})</TabsTrigger>
            <TabsTrigger value="all">All Alerts ({filteredAlerts.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <div>
              {activeAlerts.length > 0 ? (
                activeAlerts.map((alert) => <AlertCard key={alert.id} alert={alert} />)
              ) : (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <p className="text-muted-foreground">No active alerts</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="acknowledged">
            <div>
              {acknowledgedAlerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resolved">
            <div>
              {resolvedAlerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="all">
            <div>
              {filteredAlerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
