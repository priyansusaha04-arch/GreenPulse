"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { useI18n } from "@/lib/i18n"
import { Upload, Camera, FileImage, AlertTriangle, CheckCircle, Loader2 } from "lucide-react"

export default function LeafAnalysisPage() {
  const { t } = useI18n()
  const [dragActive, setDragActive] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file")
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // Simulate AI analysis
    setAnalyzing(true)
    setResults(null)

    setTimeout(() => {
      setResults({
        infectionPercentage: 15,
        diseaseLabel: "Leaf Blight",
        confidence: 87,
        severity: "moderate",
        recommendations: [
          "Apply copper-based fungicide",
          "Improve air circulation",
          "Reduce leaf wetness duration",
          "Monitor closely for spread",
        ],
        pesticideRecommendation: {
          name: "Copper Oxychloride 50% WP",
          dosage: "2-3 grams per liter",
          applicationMethod: "Foliar spray",
          frequency: "Every 7-10 days",
          ecoRating: "Moderate",
        },
      })
      setAnalyzing(false)
    }, 3000)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "text-green-600 bg-green-100 dark:bg-green-900/20"
      case "moderate":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20"
      case "high":
        return "text-red-600 bg-red-100 dark:bg-red-900/20"
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20"
    }
  }

  return (
    <DashboardLayout title={t("nav.leafAnalysis")}>
      <div className="space-y-6">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Camera className="h-5 w-5 text-secondary" />
              <span>AI-Powered Leaf Analysis</span>
            </CardTitle>
            <CardDescription>
              Upload leaf images for instant disease detection and treatment recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="space-y-4">
                <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                  <Upload className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-lg font-medium">Drop leaf images here</p>
                  <p className="text-sm text-muted-foreground">or click to browse files</p>
                </div>
                <div className="flex justify-center space-x-2">
                  <Button asChild>
                    <label className="cursor-pointer">
                      <FileImage className="mr-2 h-4 w-4" />
                      Choose File
                      <input type="file" accept="image/*" onChange={handleFileInput} className="hidden" />
                    </label>
                  </Button>
                  <Button variant="outline">
                    <Camera className="mr-2 h-4 w-4" />
                    Take Photo
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Supported formats: JPG, PNG, WebP (Max 10MB)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Progress */}
        {analyzing && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                <div>
                  <p className="font-medium">Analyzing leaf image...</p>
                  <p className="text-sm text-muted-foreground">AI is processing your image for disease detection</p>
                </div>
                <Progress value={65} className="w-full max-w-md mx-auto" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {results && uploadedImage && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Uploaded Image */}
            <Card>
              <CardHeader>
                <CardTitle>Uploaded Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <img
                    src={uploadedImage || "/placeholder.svg"}
                    alt="Uploaded leaf"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Analysis Time:</span>
                      <div className="font-medium">2.3 seconds</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Image Quality:</span>
                      <div className="font-medium">Excellent</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Analysis Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {results.infectionPercentage > 20 ? (
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                  <span>Analysis Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{results.infectionPercentage}%</div>
                    <div className="text-sm text-muted-foreground">Infection Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-secondary">{results.confidence}%</div>
                    <div className="text-sm text-muted-foreground">Confidence</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Disease Detected:</span>
                    <span>{results.diseaseLabel}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Severity:</span>
                    <Badge className={getSeverityColor(results.severity)} variant="outline">
                      {results.severity}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Confidence Level</div>
                  <Progress value={results.confidence} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Recommendations */}
        {results && (
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Treatment Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {results.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pesticide Recommendation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="font-medium">{results.pesticideRecommendation.name}</div>
                  <div className="text-sm text-muted-foreground">Recommended Treatment</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Dosage:</span>
                    <div className="font-medium">{results.pesticideRecommendation.dosage}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Method:</span>
                    <div className="font-medium">{results.pesticideRecommendation.applicationMethod}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Frequency:</span>
                    <div className="font-medium">{results.pesticideRecommendation.frequency}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Eco Rating:</span>
                    <Badge variant="outline">{results.pesticideRecommendation.ecoRating}</Badge>
                  </div>
                </div>
                <Button className="w-full">View Full Pesticide Details</Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Recent Analyses */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Analyses</CardTitle>
            <CardDescription>Your previous leaf analysis results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { date: "2024-01-12", disease: "Leaf Blight", infection: 15, confidence: 87 },
                { date: "2024-01-10", disease: "Healthy", infection: 0, confidence: 95 },
                { date: "2024-01-08", disease: "Rust", infection: 8, confidence: 78 },
              ].map((analysis, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      <FileImage className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="font-medium">{analysis.disease}</div>
                      <div className="text-sm text-muted-foreground">{analysis.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{analysis.infection}% infection</div>
                    <div className="text-sm text-muted-foreground">{analysis.confidence}% confidence</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
