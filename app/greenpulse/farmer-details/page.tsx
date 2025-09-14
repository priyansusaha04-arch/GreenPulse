"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { useI18n } from "@/lib/i18n"
import { ArrowLeft, Users, Search, Filter, Download, Eye } from "lucide-react"
import Link from "next/link"

export default function FarmerDetailsPage() {
  const { t } = useI18n()
  const [searchTerm, setSearchTerm] = useState("")

  const [farmers] = useState([
    {
      id: "F001",
      name: "Rajesh Kumar",
      type: "Small-scale",
      location: "Cuttack",
      crops: ["Rice", "Wheat"],
      fieldArea: 2.5,
      registrationDate: "2024-01-15",
      lastActive: "2 hours ago",
      status: "active",
      phone: "+91 9876543210",
      infectionRate: 8,
    },
    {
      id: "F002",
      name: "Priya Sharma",
      type: "Medium-scale",
      location: "Bhubaneswar",
      crops: ["Rice", "Sugarcane", "Vegetables"],
      fieldArea: 15.0,
      registrationDate: "2024-02-20",
      lastActive: "1 day ago",
      status: "active",
      phone: "+91 9876543211",
      infectionRate: 12,
    },
    {
      id: "F003",
      name: "Suresh Patel",
      type: "Large-scale",
      location: "Puri",
      crops: ["Rice", "Cotton", "Pulses"],
      fieldArea: 45.0,
      registrationDate: "2024-01-10",
      lastActive: "3 hours ago",
      status: "active",
      phone: "+91 9876543212",
      infectionRate: 18,
    },
    {
      id: "F004",
      name: "Meera Devi",
      type: "Small-scale",
      location: "Khurda",
      crops: ["Vegetables", "Fruits"],
      fieldArea: 1.8,
      registrationDate: "2024-03-05",
      lastActive: "1 week ago",
      status: "inactive",
      phone: "+91 9876543213",
      infectionRate: 5,
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-100 dark:bg-green-900/20"
      case "inactive":
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20"
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Small-scale":
        return "text-blue-600 bg-blue-100 dark:bg-blue-900/20"
      case "Medium-scale":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20"
      case "Large-scale":
        return "text-purple-600 bg-purple-100 dark:bg-purple-900/20"
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20"
    }
  }

  const filteredFarmers = farmers.filter(
    (farmer) =>
      farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <DashboardLayout title="Farmer Details - Registration Management">
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
              <CardTitle className="text-sm font-medium">Total Farmers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{farmers.length}</div>
              <p className="text-xs text-muted-foreground">Registered farmers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Farmers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{farmers.filter((f) => f.status === "active").length}</div>
              <p className="text-xs text-green-600">Currently active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Field Area</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{farmers.reduce((sum, f) => sum + f.fieldArea, 0)} acres</div>
              <p className="text-xs text-muted-foreground">Under management</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Infection Rate</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(farmers.reduce((sum, f) => sum + f.infectionRate, 0) / farmers.length).toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">Across all farms</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Farmer Management</CardTitle>
            <CardDescription>Search and manage farmer registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, location, or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Farmer ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Crops</TableHead>
                  <TableHead>Field Area</TableHead>
                  <TableHead>Infection Rate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFarmers.map((farmer) => (
                  <TableRow key={farmer.id}>
                    <TableCell className="font-medium">{farmer.id}</TableCell>
                    <TableCell>{farmer.name}</TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(farmer.type)} variant="outline">
                        {farmer.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{farmer.location}</TableCell>
                    <TableCell>{farmer.crops.join(", ")}</TableCell>
                    <TableCell>{farmer.fieldArea} acres</TableCell>
                    <TableCell>
                      <span
                        className={
                          farmer.infectionRate > 15
                            ? "text-red-600"
                            : farmer.infectionRate > 10
                              ? "text-yellow-600"
                              : "text-green-600"
                        }
                      >
                        {farmer.infectionRate}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(farmer.status)} variant="outline">
                        {farmer.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
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
