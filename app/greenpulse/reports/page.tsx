"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Download,
  FileText,
  BarChart3,
  TrendingUp,
  CalendarIcon,
  Eye,
  Share2,
  Printer,
  FileSpreadsheet,
  PieChart,
  LineChart,
  Activity,
} from "lucide-react"
import { format } from "date-fns"

interface Report {
  id: string
  title: string
  type: "Crop Health" | "Pesticide Usage" | "Yield Analysis" | "Financial" | "Environmental"
  description: string
  generatedDate: Date
  period: string
  format: "PDF" | "CSV" | "Excel"
  size: string
  status: "Ready" | "Generating" | "Scheduled"
  insights: string[]
}

const mockReports: Report[] = [
  {
    id: "1",
    title: "Monthly Crop Health Summary",
    type: "Crop Health",
    description: "Comprehensive analysis of crop health metrics, disease incidents, and treatment effectiveness",
    generatedDate: new Date("2024-01-15"),
    period: "December 2023",
    format: "PDF",
    size: "2.4 MB",
    status: "Ready",
    insights: [
      "15% improvement in overall crop health",
      "3 disease outbreaks detected early",
      "Fungicide effectiveness: 92%",
    ],
  },
  {
    id: "2",
    title: "Pesticide Application Report",
    type: "Pesticide Usage",
    description: "Detailed log of all pesticide applications, dosages, and compliance tracking",
    generatedDate: new Date("2024-01-10"),
    period: "Q4 2023",
    format: "Excel",
    size: "1.8 MB",
    status: "Ready",
    insights: ["25% reduction in pesticide usage", "Cost savings: ₹12,000", "100% compliance maintained"],
  },
  {
    id: "3",
    title: "Yield Prediction Analysis",
    type: "Yield Analysis",
    description: "AI-powered yield forecasting based on current crop conditions and historical data",
    generatedDate: new Date("2024-01-12"),
    period: "Rabi Season 2023-24",
    format: "PDF",
    size: "3.1 MB",
    status: "Ready",
    insights: ["Expected yield: 4.2 tons/hectare", "8% increase from last season", "Optimal harvest window: Feb 15-25"],
  },
  {
    id: "4",
    title: "Financial Performance Dashboard",
    type: "Financial",
    description: "Revenue, expenses, and profitability analysis with cost-benefit breakdown",
    generatedDate: new Date("2024-01-08"),
    period: "FY 2023-24",
    format: "PDF",
    size: "1.5 MB",
    status: "Ready",
    insights: ["ROI improved by 18%", "Input costs reduced by 12%", "Net profit: ₹2,45,000"],
  },
  {
    id: "5",
    title: "Environmental Impact Assessment",
    type: "Environmental",
    description: "Sustainability metrics, carbon footprint, and environmental compliance report",
    generatedDate: new Date(),
    period: "January 2024",
    format: "PDF",
    size: "Generating...",
    status: "Generating",
    insights: [],
  },
]

export default function ReportsPage() {
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedPeriod, setSelectedPeriod] = useState<string>("all")
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })

  const filteredReports = mockReports.filter((report) => {
    const matchesType = selectedType === "all" || report.type === selectedType
    const matchesPeriod =
      selectedPeriod === "all" ||
      (selectedPeriod === "current-month" && report.generatedDate.getMonth() === new Date().getMonth()) ||
      (selectedPeriod === "last-quarter" && report.generatedDate >= new Date(Date.now() - 90 * 24 * 60 * 60 * 1000))

    return matchesType && matchesPeriod
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready":
        return "bg-green-100 text-green-800"
      case "Generating":
        return "bg-yellow-100 text-yellow-800"
      case "Scheduled":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Crop Health":
        return <Activity className="h-4 w-4" />
      case "Pesticide Usage":
        return <BarChart3 className="h-4 w-4" />
      case "Yield Analysis":
        return <TrendingUp className="h-4 w-4" />
      case "Financial":
        return <PieChart className="h-4 w-4" />
      case "Environmental":
        return <LineChart className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const handleDownload = (report: Report) => {
    // Mock download functionality
    console.log(`Downloading ${report.title}`)
  }

  const handleGenerateReport = () => {
    // Mock report generation
    console.log("Generating new report...")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h1>
            <p className="text-gray-600 dark:text-gray-400">Download and analyze your farming data</p>
          </div>
          <Button onClick={handleGenerateReport} className="bg-green-600 hover:bg-green-700">
            <FileText className="h-4 w-4 mr-2" />
            Generate New Report
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Crop Health">Crop Health</SelectItem>
              <SelectItem value="Pesticide Usage">Pesticide Usage</SelectItem>
              <SelectItem value="Yield Analysis">Yield Analysis</SelectItem>
              <SelectItem value="Financial">Financial</SelectItem>
              <SelectItem value="Environmental">Environmental</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Periods</SelectItem>
              <SelectItem value="current-month">Current Month</SelectItem>
              <SelectItem value="last-quarter">Last Quarter</SelectItem>
              <SelectItem value="current-year">Current Year</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Custom Range
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="range" selected={dateRange} onSelect={setDateRange} numberOfMonths={2} />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Reports</p>
                <p className="text-2xl font-bold">{filteredReports.length}</p>
              </div>
              <FileText className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Ready to Download</p>
                <p className="text-2xl font-bold">{filteredReports.filter((r) => r.status === "Ready").length}</p>
              </div>
              <Download className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">This Month</p>
                <p className="text-2xl font-bold">
                  {filteredReports.filter((r) => r.generatedDate.getMonth() === new Date().getMonth()).length}
                </p>
              </div>
              <CalendarIcon className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Size</p>
                <p className="text-2xl font-bold">12.8 MB</p>
              </div>
              <FileSpreadsheet className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <Card key={report.id} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900">{getTypeIcon(report.type)}</div>
                  <div>
                    <CardTitle className="text-xl">{report.title}</CardTitle>
                    <CardDescription className="mt-1">{report.description}</CardDescription>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <span>Period: {report.period}</span>
                      <span>•</span>
                      <span>Generated: {format(report.generatedDate, "MMM dd, yyyy")}</span>
                      <span>•</span>
                      <span>Size: {report.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                  <Badge variant="outline">{report.format}</Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Key Insights */}
              {report.insights.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Key Insights</h4>
                  <ul className="space-y-1">
                    {report.insights.map((insight, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                {report.status === "Ready" ? (
                  <>
                    <Button onClick={() => handleDownload(report)} className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Download {report.format}
                    </Button>
                    <Button variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button variant="outline">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline">
                      <Printer className="h-4 w-4 mr-2" />
                      Print
                    </Button>
                  </>
                ) : report.status === "Generating" ? (
                  <Button disabled className="flex-1">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating Report...
                  </Button>
                ) : (
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Scheduled for Generation
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Custom Report</CardTitle>
          <CardDescription>Create a new report with specific parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="crop-health" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="crop-health">Crop Health</TabsTrigger>
              <TabsTrigger value="pesticide">Pesticide</TabsTrigger>
              <TabsTrigger value="yield">Yield</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="environmental">Environmental</TabsTrigger>
            </TabsList>

            <TabsContent value="crop-health" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Crop Health Analysis</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Comprehensive health metrics, disease tracking, and treatment effectiveness
                  </p>
                  <Button className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Crop Health Report
                  </Button>
                </div>
                <div className="space-y-2">
                  <h5 className="text-sm font-medium">Includes:</h5>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• NDVI and health index trends</li>
                    <li>• Disease incident reports</li>
                    <li>• Treatment effectiveness analysis</li>
                    <li>• Crop growth stage tracking</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="pesticide" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Pesticide Usage Report</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Detailed application logs, compliance tracking, and cost analysis
                  </p>
                  <Button className="w-full">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Generate Pesticide Report
                  </Button>
                </div>
                <div className="space-y-2">
                  <h5 className="text-sm font-medium">Includes:</h5>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Application timeline and dosages</li>
                    <li>• Compliance with regulations</li>
                    <li>• Cost breakdown and savings</li>
                    <li>• Effectiveness measurements</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="yield" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Yield Analysis Report</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Harvest predictions, historical comparisons, and optimization insights
                  </p>
                  <Button className="w-full">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Generate Yield Report
                  </Button>
                </div>
                <div className="space-y-2">
                  <h5 className="text-sm font-medium">Includes:</h5>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Yield predictions and forecasts</li>
                    <li>• Historical yield comparisons</li>
                    <li>• Optimal harvest timing</li>
                    <li>• Quality grade estimations</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="financial" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Financial Performance Report</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Revenue analysis, cost tracking, and profitability insights
                  </p>
                  <Button className="w-full">
                    <PieChart className="h-4 w-4 mr-2" />
                    Generate Financial Report
                  </Button>
                </div>
                <div className="space-y-2">
                  <h5 className="text-sm font-medium">Includes:</h5>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Revenue and expense breakdown</li>
                    <li>• ROI and profitability analysis</li>
                    <li>• Cost per hectare calculations</li>
                    <li>• Budget vs actual comparisons</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="environmental" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Environmental Impact Report</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Sustainability metrics, carbon footprint, and compliance tracking
                  </p>
                  <Button className="w-full">
                    <LineChart className="h-4 w-4 mr-2" />
                    Generate Environmental Report
                  </Button>
                </div>
                <div className="space-y-2">
                  <h5 className="text-sm font-medium">Includes:</h5>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Carbon footprint calculations</li>
                    <li>• Water usage efficiency</li>
                    <li>• Soil health indicators</li>
                    <li>• Biodiversity impact assessment</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {filteredReports.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No reports found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters or generate a new report.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
