"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { useI18n } from "@/lib/i18n"
import { Leaf, Mail, Users, Target, Award, Globe } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const { t } = useI18n()

  const features = [
    {
      icon: <Leaf className="h-8 w-8 text-secondary" />,
      title: "Smart Crop Monitoring",
      description: "Real-time NDVI analysis and health assessment using advanced satellite imagery and IoT sensors.",
    },
    {
      icon: <Target className="h-8 w-8 text-secondary" />,
      title: "Precision Agriculture",
      description:
        "Variable rate application technology for optimized pesticide usage and reduced environmental impact.",
    },
    {
      icon: <Users className="h-8 w-8 text-secondary" />,
      title: "Multi-Scale Support",
      description:
        "Tailored solutions for small-scale farmers to large agricultural enterprises and government agencies.",
    },
    {
      icon: <Globe className="h-8 w-8 text-secondary" />,
      title: "Multilingual Platform",
      description: "Available in English, Hindi, and Odia to serve diverse farming communities across India.",
    },
  ]

  const teamMembers = [
    { name: "Dr. Rajesh Kumar", role: "Agricultural Scientist", expertise: "Crop Disease Management" },
    { name: "Priya Sharma", role: "AI/ML Engineer", expertise: "Computer Vision & Deep Learning" },
    { name: "Amit Patel", role: "IoT Specialist", expertise: "Sensor Networks & Data Analytics" },
    { name: "Sunita Jena", role: "Regional Coordinator", expertise: "Farmer Outreach & Training" },
  ]

  return (
    <DashboardLayout title={t("nav.about")}>
      <div className="space-y-8">
        {/* Hero Section */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Leaf className="h-12 w-12 text-primary" />
                <h1 className="text-4xl font-bold text-primary">{t("appName")}</h1>
              </div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Empowering farmers and agricultural officials with intelligent crop health management and precision
                pesticide application technology.
              </p>
              <div className="flex justify-center space-x-2">
                <Badge variant="secondary">Smart Agriculture</Badge>
                <Badge variant="secondary">AI-Powered</Badge>
                <Badge variant="secondary">Sustainable Farming</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-secondary" />
                <span>Our Mission</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To revolutionize agricultural practices by providing farmers with cutting-edge technology for crop
                health monitoring, disease detection, and precision pesticide management, ultimately increasing yield
                while promoting sustainable farming practices.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-secondary" />
                <span>Our Vision</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To create a world where every farmer, regardless of scale, has access to intelligent agricultural tools
                that maximize productivity, minimize environmental impact, and ensure food security for future
                generations.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Key Features */}
        <Card>
          <CardHeader>
            <CardTitle>Key Features</CardTitle>
            <CardDescription>Comprehensive agricultural management capabilities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex space-x-4">
                  <div className="flex-shrink-0">{feature.icon}</div>
                  <div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Technology Stack */}
        <Card>
          <CardHeader>
            <CardTitle>Technology & Innovation</CardTitle>
            <CardDescription>Powered by cutting-edge agricultural technology</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Leaf className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">AI & Machine Learning</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced computer vision models for disease detection and crop health assessment
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Globe className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Satellite Imagery</h3>
                <p className="text-sm text-muted-foreground">
                  Real-time NDVI and spectral analysis using high-resolution satellite data
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">IoT Sensors</h3>
                <p className="text-sm text-muted-foreground">
                  Network of environmental sensors for soil, weather, and crop monitoring
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team */}
        <Card>
          <CardHeader>
            <CardTitle>Meet Our Team</CardTitle>
            <CardDescription>Experts in agriculture, technology, and sustainability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center p-4 border rounded-lg">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-primary">{member.role}</p>
                  <p className="text-xs text-muted-foreground mt-1">{member.expertise}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-secondary" />
              <span>Contact Us</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Get in Touch</h3>
                  <p className="text-muted-foreground mb-4">
                    Have questions about GreenPulse or need support? We're here to help farmers and agricultural
                    professionals succeed.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{t("about.contact")}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{t("about.credit")}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button asChild>
                    <Link href="mailto:verdantix@gmail.com">
                      <Mail className="mr-2 h-4 w-4" />
                      Send Email
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Support Areas</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Technical support and troubleshooting</li>
                    <li>• Farmer training and onboarding</li>
                    <li>• Government partnership programs</li>
                    <li>• Custom integration solutions</li>
                    <li>• Research collaboration opportunities</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
