"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Search, Leaf, Bug, Droplets, AlertTriangle, CheckCircle, Clock, Shield, Zap, Heart } from "lucide-react"

interface Pesticide {
  id: string
  name: string
  type: "Insecticide" | "Fungicide" | "Herbicide" | "Bactericide"
  targetPests: string[]
  crops: string[]
  activeIngredient: string
  dosage: string
  applicationMethod: string
  safetyLevel: "Low" | "Medium" | "High"
  ecoFriendly: boolean
  price: number
  effectiveness: number
  residualEffect: string
  preHarvestInterval: string
  warnings: string[]
  benefits: string[]
}

const mockPesticides: Pesticide[] = [
  {
    id: "1",
    name: "BioShield Pro",
    type: "Insecticide",
    targetPests: ["Aphids", "Thrips", "Whiteflies"],
    crops: ["Tomato", "Cotton", "Chili"],
    activeIngredient: "Imidacloprid 17.8% SL",
    dosage: "0.5-1.0 ml/L",
    applicationMethod: "Foliar Spray",
    safetyLevel: "Low",
    ecoFriendly: true,
    price: 450,
    effectiveness: 92,
    residualEffect: "15-20 days",
    preHarvestInterval: "7 days",
    warnings: ["Avoid spraying during flowering", "Use protective equipment"],
    benefits: ["Quick knockdown effect", "Systemic action", "Rain-fast formula"],
  },
  {
    id: "2",
    name: "FungGuard Max",
    type: "Fungicide",
    targetPests: ["Late Blight", "Powdery Mildew", "Rust"],
    crops: ["Potato", "Wheat", "Grapes"],
    activeIngredient: "Mancozeb 75% WP",
    dosage: "2-3 g/L",
    applicationMethod: "Foliar Spray",
    safetyLevel: "Medium",
    ecoFriendly: false,
    price: 320,
    effectiveness: 88,
    residualEffect: "10-14 days",
    preHarvestInterval: "14 days",
    warnings: ["Toxic to aquatic life", "Avoid drift to water bodies"],
    benefits: ["Broad spectrum control", "Preventive action", "Cost effective"],
  },
  {
    id: "3",
    name: "WeedOut Organic",
    type: "Herbicide",
    targetPests: ["Broadleaf weeds", "Grassy weeds"],
    crops: ["Rice", "Wheat", "Maize"],
    activeIngredient: "Glyphosate 41% SL",
    dosage: "2-4 ml/L",
    applicationMethod: "Directed Spray",
    safetyLevel: "High",
    ecoFriendly: false,
    price: 280,
    effectiveness: 85,
    residualEffect: "30-45 days",
    preHarvestInterval: "21 days",
    warnings: ["Non-selective herbicide", "Avoid contact with crop"],
    benefits: ["Systemic action", "Long-lasting control", "Wide spectrum"],
  },
]

export default function PesticideSuggestionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedCrop, setSelectedCrop] = useState<string>("all")
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const filteredPesticides = mockPesticides.filter((pesticide) => {
    const matchesSearch =
      pesticide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pesticide.targetPests.some((pest) => pest.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = selectedType === "all" || pesticide.type === selectedType
    const matchesCrop = selectedCrop === "all" || pesticide.crops.includes(selectedCrop)

    return matchesSearch && matchesType && matchesCrop
  })

  const getSafetyColor = (level: string) => {
    switch (level) {
      case "Low":
        return "text-green-600 bg-green-50"
      case "Medium":
        return "text-yellow-600 bg-yellow-50"
      case "High":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Insecticide":
        return <Bug className="h-4 w-4" />
      case "Fungicide":
        return <Leaf className="h-4 w-4" />
      case "Herbicide":
        return <Zap className="h-4 w-4" />
      case "Bactericide":
        return <Shield className="h-4 w-4" />
      default:
        return <Droplets className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Pesticide Suggestions</h1>
            <p className="text-gray-600 dark:text-gray-400">AI-powered recommendations for crop protection</p>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            {filteredPesticides.length} Products Available
          </Badge>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search pesticides or target pests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Insecticide">Insecticide</SelectItem>
              <SelectItem value="Fungicide">Fungicide</SelectItem>
              <SelectItem value="Herbicide">Herbicide</SelectItem>
              <SelectItem value="Bactericide">Bactericide</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedCrop} onValueChange={setSelectedCrop}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by crop" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Crops</SelectItem>
              <SelectItem value="Tomato">Tomato</SelectItem>
              <SelectItem value="Cotton">Cotton</SelectItem>
              <SelectItem value="Rice">Rice</SelectItem>
              <SelectItem value="Wheat">Wheat</SelectItem>
              <SelectItem value="Potato">Potato</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* AI Recommendation Alert */}
      <Alert className="border-green-200 bg-green-50 dark:bg-green-950">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800 dark:text-green-200">
          Based on your recent crop health data, we recommend focusing on fungicide treatments for the next 2 weeks due
          to high humidity levels.
        </AlertDescription>
      </Alert>

      {/* Pesticide Cards */}
      <div className="grid gap-6">
        {filteredPesticides.map((pesticide) => (
          <Card key={pesticide.id} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900">{getTypeIcon(pesticide.type)}</div>
                  <div>
                    <CardTitle className="text-xl">{pesticide.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{pesticide.type}</Badge>
                      {pesticide.ecoFriendly && (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                          <Heart className="h-3 w-3 mr-1" />
                          Eco-Friendly
                        </Badge>
                      )}
                    </CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">₹{pesticide.price}</div>
                  <div className="text-sm text-gray-500">per 500ml</div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Quick Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{pesticide.effectiveness}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Effectiveness</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-sm font-medium">{pesticide.residualEffect}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Residual Effect</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Badge className={getSafetyColor(pesticide.safetyLevel)}>{pesticide.safetyLevel} Risk</Badge>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Safety Level</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-sm font-medium">{pesticide.preHarvestInterval}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Pre-harvest</div>
                </div>
              </div>

              {/* Target Pests */}
              <div>
                <h4 className="font-medium mb-2">Target Pests</h4>
                <div className="flex flex-wrap gap-2">
                  {pesticide.targetPests.map((pest, index) => (
                    <Badge key={index} variant="secondary">
                      {pest}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Suitable Crops */}
              <div>
                <h4 className="font-medium mb-2">Suitable Crops</h4>
                <div className="flex flex-wrap gap-2">
                  {pesticide.crops.map((crop, index) => (
                    <Badge key={index} variant="outline">
                      {crop}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Expandable Details */}
              <Button
                variant="outline"
                onClick={() => setExpandedCard(expandedCard === pesticide.id ? null : pesticide.id)}
                className="w-full"
              >
                {expandedCard === pesticide.id ? "Hide Details" : "View Details"}
              </Button>

              {expandedCard === pesticide.id && (
                <Tabs defaultValue="usage" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="usage">Usage</TabsTrigger>
                    <TabsTrigger value="safety">Safety</TabsTrigger>
                    <TabsTrigger value="benefits">Benefits</TabsTrigger>
                  </TabsList>

                  <TabsContent value="usage" className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium mb-2">Active Ingredient</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{pesticide.activeIngredient}</p>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">Dosage</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{pesticide.dosage}</p>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">Application Method</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{pesticide.applicationMethod}</p>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">Pre-harvest Interval</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{pesticide.preHarvestInterval}</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="safety" className="space-y-4">
                    <div>
                      <h5 className="font-medium mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        Safety Warnings
                      </h5>
                      <ul className="space-y-1">
                        {pesticide.warnings.map((warning, index) => (
                          <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                            <span className="text-yellow-500 mt-1">•</span>
                            {warning}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>

                  <TabsContent value="benefits" className="space-y-4">
                    <div>
                      <h5 className="font-medium mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Key Benefits
                      </h5>
                      <ul className="space-y-1">
                        {pesticide.benefits.map((benefit, index) => (
                          <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                            <span className="text-green-500 mt-1">•</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                </Tabs>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <Button className="flex-1">
                  <Droplets className="h-4 w-4 mr-2" />
                  Add to Spray Plan
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Clock className="h-4 w-4 mr-2" />
                  Schedule Application
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPesticides.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Bug className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No pesticides found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your search criteria or filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
