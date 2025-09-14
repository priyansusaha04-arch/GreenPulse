"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Droplets, Activity, Leaf, TrendingUp } from "lucide-react"
import { useI18n } from "@/lib/i18n"

interface CropHealthData {
  leafWetness: {
    status: "dry" | "moderate" | "wet"
    lastMeasurement: string
  }
  ndvi: {
    score: number
    trend: number[]
  }
  pri: number
  chlorophyllIndex: "low" | "normal" | "high"
  infectionRisk: {
    level: "low" | "moderate" | "high"
    confidence: number
  }
}

interface CropHealthWidgetProps {
  data: CropHealthData
  onViewDetails: () => void
}

export function CropHealthWidget({ data, onViewDetails }: CropHealthWidgetProps) {
  const { t } = useI18n()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "dry":
      case "low":
        return "bg-yellow-500"
      case "moderate":
      case "normal":
        return "bg-green-500"
      case "wet":
      case "high":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getRiskColor = (level: string) => {
    switch (level) {
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
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Leaf className="h-5 w-5 text-secondary" />
          <span>{t("dashboard.cropHealth.title")}</span>
        </CardTitle>
        <CardDescription>{t("dashboard.cropHealth.leafWetnessStatus")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Leaf Wetness */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Droplets className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{t("labels.leafWetness")}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(data.leafWetness.status)}`} />
            <Badge variant="outline" className="capitalize">
              {t(`status.${data.leafWetness.status}`)}
            </Badge>
          </div>
        </div>

        {/* NDVI Gauge */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{t("labels.ndvi")}</span>
            </div>
            <span className="text-2xl font-bold text-secondary">{data.ndvi.score}</span>
          </div>
          <Progress value={data.ndvi.score} className="h-2" />
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <TrendingUp className="h-3 w-3" />
            <span>7-day trend: {data.ndvi.trend.join(", ")}</span>
          </div>
        </div>

        {/* PRI */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">{t("labels.pri")}</span>
          <span className="text-lg font-semibold">{data.pri.toFixed(2)}</span>
        </div>

        {/* Chlorophyll Index */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">{t("labels.chlorophyllIndex")}</span>
          <Badge variant="outline" className="capitalize">
            {t(`status.${data.chlorophyllIndex}`)}
          </Badge>
        </div>

        {/* Infection Risk */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{t("labels.infectionRisk")}</span>
            <Badge className={getRiskColor(data.infectionRisk.level)}>{t(`status.${data.infectionRisk.level}`)}</Badge>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Confidence</span>
              <span>{data.infectionRisk.confidence}%</span>
            </div>
            <Progress value={data.infectionRisk.confidence} className="h-1" />
          </div>
        </div>

        <Button onClick={onViewDetails} variant="outline" className="w-full bg-transparent">
          {t("buttons.viewDetails")}
        </Button>
      </CardContent>
    </Card>
  )
}
