"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { useI18n } from "@/lib/i18n"
import { ArrowLeft, CheckCircle, XCircle, Clock, AlertTriangle, FileText } from "lucide-react"
import Link from "next/link"

export default function PesticideApprovalsPage() {
  const { t } = useI18n()

  const [applications] = useState([
    {
      id: "PA001",
      farmerName: "Rajesh Kumar",
      farmerId: "F001",
      pesticide: "Chlorpyrifos 20% EC",
      cropType: "Rice",
      applicationDate: "2024-03-15",
      requestedQuantity: "5 liters",
      infectionLevel: "Moderate",
      urgency: "Medium",
      status: "pending",
      submittedDate: "2024-03-14",
      location: "Cuttack",
    },
    {
      id: "PA002",
      farmerName: "Priya Sharma",
      farmerId: "F002",
      pesticide: "Imidacloprid 17.8% SL",
      cropType: "Sugarcane",
      applicationDate: "2024-03-16",
      requestedQuantity: "3 liters",
      infectionLevel: "High",
      urgency: "High",
      status: "approved",
      submittedDate: "2024-03-13",
      location: "Bhubaneswar",
      approvedDate: "2024-03-14",
    },
    {
      id: "PA003",
      farmerName: "Suresh Patel",
      farmerId: "F003",
      pesticide: "Cypermethrin 10% EC",
      cropType: "Cotton",
      applicationDate: "2024-03-17",
      requestedQuantity: "8 liters",
      infectionLevel: "Low",
      urgency: "Low",
      status: "rejected",
      submittedDate: "2024-03-12",
      location: "Puri",
      rejectedDate: "2024-03-13",
      rejectionReason: "Infection level too low for pesticide application",
    },
    {
      id: "PA004",
      farmerName: "Meera Devi",
      farmerId: "F004",
      pesticide: "Carbendazim 50% WP",
      cropType: "Vegetables",
      applicationDate: "2024-03-18",
      requestedQuantity: "2 kg",
      infectionLevel: "High",
      urgency: "High",
      status: "pending",
      submittedDate: "2024-03-15",
      location: "Khurda",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-600 bg-green-100 dark:bg-green-900/20"
      case "rejected":
        return "text-red-600 bg-red-100 dark:bg-red-900/20"
      case "pending":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20"
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20"
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "High":
        return "text-red-600 bg-red-100 dark:bg-red-900/20"
      case "Medium":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20"
      case "Low":
        return "text-green-600 bg-green-100 dark:bg-green-900/20"
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20"
    }
  }

  const handleApprove = (id: string) => {
    // Handle approval logic
    console.log("Approving application:", id)
  }

  const handleReject = (id: string) => {
    // Handle rejection logic
    console.log("Rejecting application:", id)
  }

  const pendingApplications = applications.filter((app) => app.status === "pending")
  const approvedApplications = applications.filter((app) => app.status === "approved")
  const rejectedApplications = applications.filter((app) => app.status === "rejected")

  return (
    <DashboardLayout title="Pesticide Approvals - Application Management">
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
              <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingApplications.length}</div>
              <p className="text-xs text-yellow-600">Awaiting review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvedApplications.length}</div>
              <p className="text-xs text-green-600">Applications approved</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Priority</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {applications.filter((app) => app.urgency === "High" && app.status === "pending").length}
              </div>
              <p className="text-xs text-red-600">Urgent applications</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{applications.length}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Pending Applications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              <span>Pending Applications</span>
            </CardTitle>
            <CardDescription>Applications awaiting approval or rejection</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Application ID</TableHead>
                  <TableHead>Farmer</TableHead>
                  <TableHead>Pesticide</TableHead>
                  <TableHead>Crop</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Urgency</TableHead>
                  <TableHead>Infection Level</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingApplications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{app.farmerName}</div>
                        <div className="text-sm text-muted-foreground">{app.location}</div>
                      </div>
                    </TableCell>
                    <TableCell>{app.pesticide}</TableCell>
                    <TableCell>{app.cropType}</TableCell>
                    <TableCell>{app.requestedQuantity}</TableCell>
                    <TableCell>
                      <Badge className={getUrgencyColor(app.urgency)} variant="outline">
                        {app.urgency}
                      </Badge>
                    </TableCell>
                    <TableCell>{app.infectionLevel}</TableCell>
                    <TableCell>{app.submittedDate}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={() => handleApprove(app.id)}>
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleReject(app.id)}>
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Decisions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Decisions</CardTitle>
            <CardDescription>Recently approved and rejected applications</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Application ID</TableHead>
                  <TableHead>Farmer</TableHead>
                  <TableHead>Pesticide</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Decision Date</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...approvedApplications, ...rejectedApplications].map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.id}</TableCell>
                    <TableCell>{app.farmerName}</TableCell>
                    <TableCell>{app.pesticide}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(app.status)} variant="outline">
                        {app.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{app.status === "approved" ? app.approvedDate : app.rejectedDate}</TableCell>
                    <TableCell>{app.status === "rejected" ? app.rejectionReason : "Application approved"}</TableCell>
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
