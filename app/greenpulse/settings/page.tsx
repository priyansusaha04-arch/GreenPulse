"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { useI18n } from "@/lib/i18n"
import { useTheme } from "@/lib/theme"
import { useAuth } from "@/lib/auth"
import { User, Globe, Palette, Bell, Smartphone, Save } from "lucide-react"

export default function SettingsPage() {
  const { t, language, setLanguage } = useI18n()
  const { theme, setTheme } = useTheme()
  const { user } = useAuth()

  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    location: user?.location || {
      country: "",
      state: "",
      district: "",
      village: "",
    },
  })

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    pushNotifications: true,
    weatherAlerts: true,
    diseaseAlerts: true,
    equipmentAlerts: false,
  })

  const [devices, setDevices] = useState([
    { id: 1, name: "Sensor Station A-1", type: "Environmental", status: "Connected", battery: 85 },
    { id: 2, name: "Handheld Scanner", type: "Leaf Analysis", status: "Connected", battery: 92 },
    { id: 3, name: "Drone Controller", type: "Aerial Survey", status: "Offline", battery: 0 },
  ])

  const handleSaveProfile = () => {
    // Save profile changes
    console.log("Saving profile:", profileData)
  }

  const handleSaveNotifications = () => {
    // Save notification preferences
    console.log("Saving notifications:", notifications)
  }

  return (
    <DashboardLayout title={t("nav.settings")}>
      <div className="space-y-6">
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Profile Information</span>
                </CardTitle>
                <CardDescription>Update your personal information and account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">{t("auth.fullName")}</Label>
                    <Input
                      id="fullName"
                      value={profileData.fullName}
                      onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("auth.email")}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">{t("auth.phoneNumber")}</Label>
                    <Input
                      id="phoneNumber"
                      value={profileData.phoneNumber}
                      onChange={(e) => setProfileData({ ...profileData, phoneNumber: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Input value={user?.role || ""} disabled />
                  </div>
                </div>

                {user?.role === "farmer" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Farm Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Farmer Type</Label>
                        <Input value={user?.farmerType || ""} disabled />
                      </div>
                      <div className="space-y-2">
                        <Label>Field Area</Label>
                        <Input value={`${user?.fieldArea || 0} acres`} disabled />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>State</Label>
                        <Input
                          value={profileData.location.state}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              location: { ...profileData.location, state: e.target.value },
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>District</Label>
                        <Input
                          value={profileData.location.district}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              location: { ...profileData.location, district: e.target.value },
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}

                <Button onClick={handleSaveProfile}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences */}
          <TabsContent value="preferences">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="h-5 w-5" />
                    <span>Language & Region</span>
                  </CardTitle>
                  <CardDescription>Choose your preferred language and regional settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">{t("language.english")}</SelectItem>
                        <SelectItem value="hi">{t("language.hindi")}</SelectItem>
                        <SelectItem value="od">{t("language.odia")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Palette className="h-5 w-5" />
                    <span>Appearance</span>
                  </CardTitle>
                  <CardDescription>Customize the look and feel of the application</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <Select value={theme} onValueChange={setTheme}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">{t("theme.light")}</SelectItem>
                        <SelectItem value="dark">{t("theme.dark")}</SelectItem>
                        <SelectItem value="system">{t("theme.system")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Notification Preferences</span>
                </CardTitle>
                <CardDescription>Configure how you want to receive alerts and updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Delivery Methods</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Email Alerts</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch
                        checked={notifications.emailAlerts}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, emailAlerts: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>SMS Alerts</Label>
                        <p className="text-sm text-muted-foreground">Receive critical alerts via SMS</p>
                      </div>
                      <Switch
                        checked={notifications.smsAlerts}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, smsAlerts: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Browser and mobile notifications</p>
                      </div>
                      <Switch
                        checked={notifications.pushNotifications}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, pushNotifications: checked })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Alert Types</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Weather Alerts</Label>
                        <p className="text-sm text-muted-foreground">Rain, wind, and weather warnings</p>
                      </div>
                      <Switch
                        checked={notifications.weatherAlerts}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, weatherAlerts: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Disease Alerts</Label>
                        <p className="text-sm text-muted-foreground">Crop disease and infection warnings</p>
                      </div>
                      <Switch
                        checked={notifications.diseaseAlerts}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, diseaseAlerts: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Equipment Alerts</Label>
                        <p className="text-sm text-muted-foreground">Battery and maintenance notifications</p>
                      </div>
                      <Switch
                        checked={notifications.equipmentAlerts}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, equipmentAlerts: checked })}
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={handleSaveNotifications}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Device Management */}
          <TabsContent value="devices">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Smartphone className="h-5 w-5" />
                  <span>Connected Devices</span>
                </CardTitle>
                <CardDescription>Manage your sensors, scanners, and other agricultural devices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {devices.map((device) => (
                    <div key={device.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                          <Smartphone className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="font-medium">{device.name}</h3>
                          <p className="text-sm text-muted-foreground">{device.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div
                            className={`text-sm font-medium ${
                              device.status === "Connected" ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {device.status}
                          </div>
                          {device.battery > 0 && (
                            <div className="text-xs text-muted-foreground">Battery: {device.battery}%</div>
                          )}
                        </div>
                        <Button size="sm" variant="outline">
                          Configure
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <Button>
                    <Smartphone className="mr-2 h-4 w-4" />
                    Add New Device
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
