"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Search,
  HelpCircle,
  BookOpen,
  Video,
  MessageCircle,
  Phone,
  Mail,
  FileText,
  Users,
  Lightbulb,
  ChevronRight,
  ExternalLink,
  Download,
  Play,
  Clock,
  Star,
} from "lucide-react"

interface FAQ {
  id: string
  question: string
  answer: string
  category: "Getting Started" | "Crop Management" | "Pesticides" | "Reports" | "Technical" | "Billing"
  helpful: number
}

interface Tutorial {
  id: string
  title: string
  description: string
  duration: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  type: "Video" | "Article" | "Interactive"
  category: string
  views: number
  rating: number
}

const mockFAQs: FAQ[] = [
  {
    id: "1",
    question: "How do I add a new crop to my dashboard?",
    answer:
      'To add a new crop, go to your dashboard and click the "Add Crop" button. Fill in the crop details including type, planting date, field area, and location. The system will automatically start monitoring your crop health.',
    category: "Getting Started",
    helpful: 45,
  },
  {
    id: "2",
    question: "What does the NDVI value mean for my crops?",
    answer:
      "NDVI (Normalized Difference Vegetation Index) measures crop health on a scale of -1 to 1. Values above 0.3 indicate healthy vegetation, 0.2-0.3 shows moderate health, and below 0.2 suggests stress or disease. Higher values mean healthier, more vigorous crops.",
    category: "Crop Management",
    helpful: 38,
  },
  {
    id: "3",
    question: "How accurate are the pesticide recommendations?",
    answer:
      "Our AI-powered recommendations are based on real-time crop health data, weather conditions, and pest identification with 92% accuracy. However, always consult with local agricultural experts and follow label instructions for pesticide application.",
    category: "Pesticides",
    helpful: 52,
  },
  {
    id: "4",
    question: "Can I export my reports in different formats?",
    answer:
      "Yes, you can download reports in PDF, Excel, and CSV formats. Go to the Reports section, select your desired report, and choose your preferred format from the download options.",
    category: "Reports",
    helpful: 29,
  },
  {
    id: "5",
    question: "Why is my leaf analysis taking so long?",
    answer:
      "Leaf analysis typically takes 30-60 seconds. Delays can occur due to image quality, file size, or server load. Ensure your images are clear, well-lit, and under 10MB. If issues persist, try refreshing the page.",
    category: "Technical",
    helpful: 33,
  },
]

const mockTutorials: Tutorial[] = [
  {
    id: "1",
    title: "Getting Started with GreenPulse",
    description: "Complete walkthrough of setting up your account, adding crops, and navigating the dashboard",
    duration: "8 min",
    difficulty: "Beginner",
    type: "Video",
    category: "Getting Started",
    views: 1250,
    rating: 4.8,
  },
  {
    id: "2",
    title: "Understanding Crop Health Metrics",
    description: "Learn how to interpret NDVI values, health indicators, and environmental parameters",
    duration: "12 min",
    difficulty: "Intermediate",
    type: "Video",
    category: "Crop Management",
    views: 890,
    rating: 4.6,
  },
  {
    id: "3",
    title: "Effective Pesticide Management",
    description: "Best practices for pesticide selection, application timing, and safety protocols",
    duration: "15 min",
    difficulty: "Advanced",
    type: "Article",
    category: "Pesticides",
    views: 567,
    rating: 4.9,
  },
  {
    id: "4",
    title: "Leaf Disease Identification Guide",
    description: "Interactive guide to identifying common crop diseases using our AI analysis tool",
    duration: "20 min",
    difficulty: "Intermediate",
    type: "Interactive",
    category: "Disease Management",
    views: 723,
    rating: 4.7,
  },
]

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const filteredFAQs = mockFAQs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const filteredTutorials = mockTutorials.filter((tutorial) => {
    const matchesSearch =
      tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutorial.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Contact form submitted:", contactForm)
    // Reset form
    setContactForm({ name: "", email: "", subject: "", message: "" })
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Video":
        return <Video className="h-4 w-4" />
      case "Article":
        return <FileText className="h-4 w-4" />
      case "Interactive":
        return <Lightbulb className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Help & Support</h1>
          <p className="text-gray-600 dark:text-gray-400">Find answers, tutorials, and get support for GreenPulse</p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto w-full">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search for help articles, tutorials, or FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg"
            />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Video className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-medium mb-1">Video Tutorials</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Step-by-step guides</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <HelpCircle className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-medium mb-1">FAQs</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Common questions</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <MessageCircle className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-medium mb-1">Live Chat</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Instant support</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Phone className="h-8 w-8 text-orange-600 mx-auto mb-3" />
            <h3 className="font-medium mb-1">Call Support</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">+91 1800-123-4567</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="faq">FAQs</TabsTrigger>
          <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          <TabsTrigger value="guides">User Guides</TabsTrigger>
          <TabsTrigger value="contact">Contact Us</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
            >
              All Categories
            </Button>
            {["Getting Started", "Crop Management", "Pesticides", "Reports", "Technical", "Billing"].map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          <Accordion type="single" collapsible className="w-full">
            {filteredFAQs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="text-xs">
                      {faq.category}
                    </Badge>
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Users className="h-4 w-4" />
                        {faq.helpful} people found this helpful
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          👍 Helpful
                        </Button>
                        <Button variant="outline" size="sm">
                          👎 Not helpful
                        </Button>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {filteredFAQs.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No FAQs found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search or browse different categories.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="tutorials" className="space-y-6">
          <div className="grid gap-4">
            {filteredTutorials.map((tutorial) => (
              <Card key={tutorial.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900">{getTypeIcon(tutorial.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-medium">{tutorial.title}</h3>
                          <Badge className={getDifficultyColor(tutorial.difficulty)}>{tutorial.difficulty}</Badge>
                          <Badge variant="outline">{tutorial.type}</Badge>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">{tutorial.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {tutorial.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {tutorial.views} views
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            {tutorial.rating}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button>
                        <Play className="h-4 w-4 mr-2" />
                        Start Tutorial
                      </Button>
                      <Button variant="outline">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="guides" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  User Manual
                </CardTitle>
                <CardDescription>Comprehensive guide covering all features and functionalities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Complete User Manual (PDF)</span>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Quick Start Guide (PDF)</span>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Documentation</span>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Online
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Video Library
                </CardTitle>
                <CardDescription>Watch detailed tutorials and feature demonstrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Dashboard Overview (5 min)</span>
                    <Button variant="outline" size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      Watch
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Crop Management (12 min)</span>
                    <Button variant="outline" size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      Watch
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Advanced Features (18 min)</span>
                    <Button variant="outline" size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      Watch
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Best Practices
                </CardTitle>
                <CardDescription>Tips and recommendations for optimal results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Crop Health Monitoring</span>
                    <Button variant="outline" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Pesticide Application</span>
                    <Button variant="outline" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Data Analysis & Reports</span>
                    <Button variant="outline" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Community Forum
                </CardTitle>
                <CardDescription>Connect with other farmers and share experiences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">General Discussion</span>
                    <Badge variant="secondary">245 posts</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Crop Management Tips</span>
                    <Badge variant="secondary">189 posts</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Technical Support</span>
                    <Badge variant="secondary">67 posts</Badge>
                  </div>
                  <Button className="w-full mt-4">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Forum
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Get in touch with our support team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">Phone Support</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">+91 1800-123-4567</p>
                    <p className="text-xs text-gray-500">Mon-Fri, 9 AM - 6 PM IST</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">support@greenpulse.com</p>
                    <p className="text-xs text-gray-500">Response within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium">Live Chat</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Available 24/7</p>
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                      Start Chat
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>We'll get back to you as soon as possible</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Name</label>
                      <Input
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <Input
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Subject</label>
                    <Input
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      placeholder="How can we help?"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Message</label>
                    <Textarea
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Describe your issue or question..."
                      rows={4}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
