"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { useI18n } from "@/lib/i18n"
import { Search, Eye, TrendingUp, Leaf, Calendar } from "lucide-react"

export default function CropDetailsPage() {
  const { t } = useI18n()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCrop, setFilterCrop] = useState("all")
  const [selectedCrop, setSelectedCrop] = useState<any>(null)

  // Mock crop data
  const crops = [
    {
      id: 1,
      name: "Rice",
      variety: "Basmati",
      area: 15.5,
      plantingDate: "2024-06-15",
      ndvi: 78,
      health: "good",
      infectionRate: 5,
      lastInspection: "2024-01-10",
      images: 12,
    },
    {
      id: 2,
      name: "Wheat",
      variety: "Durum",
      area: 8.2,
      plantingDate: "2024-11-20",
      ndvi: 65,
      health: "moderate",
      infectionRate: 12,
      lastInspection: "2024-01-08",
      images: 8,
    },
    {
      id: 3,
      name: "Maize",
      variety: "Sweet Corn",
      area: 6.8,
      plantingDate: "2024-07-01",
      ndvi: 82,
      health: "excellent",
      infectionRate: 2,
      lastInspection: "2024-01-12",
      images: 15,
    },
  ]

  const getHealthColor = (health: string) => {
    switch (health) {
      case "excellent":
        return "text-green-600 bg-green-100 dark:bg-green-900/20"
      case "good":
        return "text-blue-600 bg-blue-100 dark:bg-blue-900/20"
      case "moderate":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20"
      case "poor":
        return "text-red-600 bg-red-100 dark:bg-red-900/20"
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20"
    }
  }

  const filteredCrops = crops.filter((crop) => {
    const matchesSearch =
      crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.variety.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterCrop === "all" || crop.name.toLowerCase() === filterCrop.toLowerCase()
    return matchesSearch && matchesFilter
  })

  return (
    <DashboardLayout title={t("nav.cropDetails")}>
      <div className="space-y-6">
        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Crop Overview</CardTitle>
            <CardDescription>Monitor and analyze your crop health data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search crops..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterCrop} onValueChange={setFilterCrop}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by crop" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Crops</SelectItem>
                  <SelectItem value="rice">Rice</SelectItem>
                  <SelectItem value="wheat">Wheat</SelectItem>
                  <SelectItem value="maize">Maize</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Crop Table */}
        <Card>
          <CardHeader>
            <CardTitle>Crop Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Crop</TableHead>
                  <TableHead>Area (acres)</TableHead>
                  <TableHead>NDVI Score</TableHead>
                  <TableHead>Health Status</TableHead>
                  <TableHead>Infection Rate</TableHead>
                  <TableHead>Last Inspection</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCrops.map((crop) => (
                  <TableRow key={crop.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{crop.name}</div>
                        <div className="text-sm text-muted-foreground">{crop.variety}</div>
                      </div>
                    </TableCell>
                    <TableCell>{crop.area}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{crop.ndvi}</span>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getHealthColor(crop.health)} variant="outline">
                        {crop.health}
                      </Badge>
                    </TableCell>
                    <TableCell>{crop.infectionRate}%</TableCell>
                    <TableCell>{crop.lastInspection}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" onClick={() => setSelectedCrop(crop)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Detailed View Modal/Card */}
        {selectedCrop && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>
                  {selectedCrop.name} - {selectedCrop.variety}
                </span>
                <Button variant="outline" onClick={() => setSelectedCrop(null)}>
                  Close
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Area</div>
                      <div className="text-lg font-semibold">{selectedCrop.area} acres</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Planting Date</div>
                      <div className="text-lg font-semibold">{selectedCrop.plantingDate}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">NDVI Trend (Last 7 days)</div>
                    <div className="bg-muted rounded-lg h-32 flex items-center justify-center">
                      <div className="text-center">
                        <TrendingUp className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">NDVI chart would be displayed here</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Recent Images ({selectedCrop.images})</div>
                    <div className="grid grid-cols-3 gap-2">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="bg-muted rounded-lg aspect-square flex items-center justify-center">
                          <Leaf className="h-6 w-6 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Inspection
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      View History
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
