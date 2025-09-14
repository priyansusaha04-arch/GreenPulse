"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Thermometer, Droplets, Battery, Beaker, CloudRain } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { useAuth } from "@/lib/auth"

interface EnvironmentData {
  soilMoisture: number
  soilTemperature: number
  airTemperature: number
  humidity: number
  sprayingSafety: "safe" | "caution" | "unsafe"
  rainForecast: {
    hours: number
    probability: number
  }
  batteryLevel: number
  pesticideVolume: number
}

interface EnvironmentWidgetProps {
  data: EnvironmentData
  onDelaySpray: () => void
  onProceedSpray: () => void
}

export function EnvironmentWidget({ data, onDelaySpray, onProceedSpray }: EnvironmentWidgetProps) {
  const { t } = useI18n()
  const { user } = useAuth()

  const getSprayColor = (safety: string) => {
    switch (safety) {
      case "safe":
        return "text-green-600 bg-green-100 dark:bg-green-900/20"
      case "caution":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20"
      case "unsafe":
        return "text-red-600 bg-red-100 dark:bg-red-900/20"
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20"
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Thermometer className="h-5 w-5 text-secondary" />
          <span>{t("dashboard.environment.title")}</span>
        </CardTitle>
        <CardDescription>{t("dashboard.environment.soilConditions")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Soil Conditions */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Droplets className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">{t("labels.soilMoisture")}</span>
            </div>
            <div className="text-2xl font-bold">{data.soilMoisture}%</div>
            <Progress value={data.soilMoisture} className="h-2" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Thermometer className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">{t("labels.soilTemperature")}</span>
            </div>
            <div className="text-2xl font-bold">{data.soilTemperature}°C</div>
          </div>
        </div>

        {/* Weather Conditions */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-sm font-medium">{t("labels.airTemperature")}</span>
            <div className="text-lg font-semibold">{data.airTemperature}°C</div>
          </div>
          <div className="space-y-1">
            <span className="text-sm font-medium">{t("labels.humidity")}</span>
            <div className="text-lg font-semibold">{data.humidity}%</div>
          </div>
        </div>

        {/* Spray Safety Status */}
        <div className="space-y-2">
          <Badge className={getSprayColor(data.sprayingSafety)} variant="outline">
            Spraying: {data.sprayingSafety}
          </Badge>
        </div>

        {/* Rain Forecast */}
        {data.rainForecast.hours > 0 && (
          <div className="flex items-center space-x-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <CloudRain className="h-4 w-4 text-blue-500" />
            <span className="text-sm">
              {t("alerts.rainForecast", { hours: data.rainForecast.hours })} ({data.rainForecast.probability}%)
            </span>
          </div>
        )}

        {/* Operational Status */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Battery className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">{t("labels.batteryLevel")}</span>
            </div>
            <div className="text-lg font-semibold">{data.batteryLevel}%</div>
            <Progress value={data.batteryLevel} className="h-1" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Beaker className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">{t("labels.pesticideVolume")}</span>
            </div>
            <div className="text-lg font-semibold">{data.pesticideVolume}L</div>
          </div>
        </div>

        {user?.role === "farmer" && (
          <div className="flex space-x-2">
            <Button
              onClick={onDelaySpray}
              variant="outline"
              className="flex-1 bg-transparent"
              disabled={data.sprayingSafety === "safe"}
            >
              {t("buttons.delaySpray")}
            </Button>
            <Button onClick={onProceedSpray} className="flex-1" disabled={data.sprayingSafety === "unsafe"}>
              {t("buttons.proceedSpray")}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
