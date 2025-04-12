import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "About Us | STARNOVA",
  description: "Learn more about STARNOVA, our mission, projects, and how to contact us.",
}

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/10 dark:bg-slate-800/20 z-0"></div>
        <div
          className="absolute inset-0 z-0 opacity-30"
          style={{
            backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(2px)",
          }}
        ></div>
        <div className="container relative z-10 mx-auto py-20 px-4 md:px-6 text-center">
          
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-emerald-600 dark:from-teal-400 dark:to-emerald-500">
            Welcome to STARNOVA
          </h1>
          <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto mb-8">
            Pioneering sustainable biological solutions for a healthier planet and future generations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
          <a href="#our-mission">
             <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white">Our Mission 
                <ArrowRight className="ml-2 h-4 w-4" /></Button>
                </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto py-12 px-4 md:px-6">
        <Tabs defaultValue="company" className="w-full max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-12 bg-slate-100 dark:bg-slate-800 p-1 rounded-full">
            <TabsTrigger
              value="company"
              className="rounded-full data-[state=active]:bg-teal-500 data-[state=active]:text-white py-3"
            >
              Our Company
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="rounded-full data-[state=active]:bg-teal-500 data-[state=active]:text-white py-3"
            >
              Our Projects
            </TabsTrigger>
            <TabsTrigger
              value="contact"
              className="rounded-full data-[state=active]:bg-teal-500 data-[state=active]:text-white py-3"
              >
              Contact Us
            </TabsTrigger>
          </TabsList>

          {/* Company Tab */}
          <TabsContent value="company" className="space-y-16">
            <section id="our-mission" className="scroll-mt-20 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                  <Badge className="mb-4 bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300">
                    Our Story
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
                    Transforming the Future Through Innovation
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300 mb-6 text-lg leading-relaxed">
                    At STARNOVA, we're dedicated to developing innovative biological solutions that address global
                    challenges in healthcare, agriculture, and environmental conservation. Our mission is to harness the
                    power of nature to create sustainable products that improve lives while protecting our planet.
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
                    Founded in 2015, we've grown from a small research team to a leading biotechnology company with
                    partners across the globe. Our commitment to scientific excellence, ethical practices, and
                    environmental stewardship guides everything we do.
                  </p>
                </div>
                <div className="order-1 md:order-2 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                  <img
                    src="/placeholder.svg?height=600&width=800"
                    alt="STARNOVA laboratory"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </section>

            <section className="space-y-8 py-12 px-6 bg-white dark:bg-slate-800 rounded-3xl shadow-lg">
              <div className="text-center max-w-3xl mx-auto">
                <Badge className="mb-4 bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300">Our Values</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
                  Principles That Guide Us
                </h2>
                <p className="text-slate-700 dark:text-slate-300 mb-8 text-lg">
                  Our core values shape our approach to research, product development, and business relationships.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Innovation",
                    description:
                      "We push the boundaries of science to develop groundbreaking solutions for complex challenges.",
                    icon: "✨",
                  },
                  {
                    title: "Sustainability",
                    description:
                      "We create products and processes that minimize environmental impact and promote ecological balance.",
                    icon: "🌱",
                  },
                  {
                    title: "Integrity",
                    description:
                      "We uphold the highest ethical standards in our research, development, and business practices.",
                    icon: "🛡️",
                  },
                  {
                    title: "Collaboration",
                    description:
                      "We foster partnerships with researchers, organizations, and communities to amplify our positive impact.",
                    icon: "🤝",
                  },
                  {
                    title: "Excellence",
                    description:
                      "We strive for the highest quality in everything we do, from research to customer service.",
                    icon: "🏆",
                  },
                  {
                    title: "Accessibility",
                    description:
                      "We work to make our solutions available to those who need them most, regardless of location or resources.",
                    icon: "🌍",
                  },
                ].map((value, index) => (
                  <Card
                    key={index}
                    className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-slate-50 dark:bg-slate-900"
                  >
                    <CardHeader className="pb-2">
                      <div className="text-4xl mb-4">{value.icon}</div>
                      <CardTitle className="text-xl text-teal-600 dark:text-teal-400">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700 dark:text-slate-300">{value.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="space-y-8">
              <div className="text-center max-w-3xl mx-auto">
                <Badge className="mb-4 bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300">Our Team</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
                  Meet the Visionaries
                </h2>
                <p className="text-slate-700 dark:text-slate-300 mb-8 text-lg">
                  Our leadership team brings together expertise from various fields to create innovative solutions to
                  complex problems.
                </p>
              </div>

              {/* Centered Team Cards - Only 2 Visionaries */}
              <div className="max-w-4xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {[
                    {
                      name: "Dr. Sarah Chen",
                      role: "Chief Scientific Officer",
                      bio: "Ph.D. in Molecular Biology with 15+ years of research experience in sustainable biotechnology. Dr. Chen leads our research initiatives and has pioneered several breakthrough technologies.",
                      image: "/placeholder.svg?height=400&width=400",
                    },
                    {
                      name: "Michael Rodriguez",
                      role: "CEO",
                      bio: "Former environmental consultant with a passion for bringing sustainable solutions to market. Under his leadership, STARNOVA has expanded into global markets and secured key partnerships.",
                      image: "/placeholder.svg?height=400&width=400",
                    },
                  ].map((member, index) => (
                    <Card
                      key={index}
                      className="overflow-hidden rounded-xl border-none shadow-xl hover:shadow-2xl transition-all duration-300 group bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900"
                    >
                      <div className="relative">
                        <img
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          className="w-full h-[260px] object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-teal-900/70 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-500 flex items-end">
                          <div className="p-6 text-white">
                            <p className="font-medium">{member.bio}</p>
                          </div>
                        </div>
                        <div className="absolute top-4 right-4">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-teal-500 text-white">
                            {index + 1}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                          {member.name}
                        </h3>
                        <p className="text-teal-600 dark:text-teal-400 font-medium mb-4">{member.role}</p>
                        <div className="flex justify-between items-center">

                          <div className="flex space-x-2">
                            <Link
                              href="#"
                              className="text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                            >
                              <Linkedin className="h-4 w-4" />
                              <span className="sr-only">LinkedIn</span>
                            </Link>
                            <Link
                              href="#"
                              className="text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                            >
                              <Twitter className="h-4 w-4" />
                              <span className="sr-only">Twitter</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-16">
            <section>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                  <img
                    src="/placeholder.svg?height=600&width=800"
                    alt="STARNOVA flagship project"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div>
                  <Badge className="mb-4 bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300">
                    Flagship Project
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">BioRegenerate™</h2>
                  <p className="text-slate-700 dark:text-slate-300 mb-6 text-lg leading-relaxed">
                    Our revolutionary BioRegenerate™ technology represents a breakthrough in sustainable agriculture.
                    This innovative solution enhances soil health, increases crop yields, and reduces the need for
                    chemical fertilizers by leveraging beneficial microorganisms.
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 mb-8 text-lg leading-relaxed">
                    Developed over five years of intensive research, BioRegenerate™ has been successfully implemented in
                    over 20 countries, helping farmers transition to more sustainable practices while improving their
                    livelihoods.
                  </p>
                  <div className="flex flex-wrap gap-4 mb-8">
                    <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full">
                      <span className="font-semibold text-teal-600 dark:text-teal-400">20+</span> Countries
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full">
                      <span className="font-semibold text-teal-600 dark:text-teal-400">40%</span> Yield Increase
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full">
                      <span className="font-semibold text-teal-600 dark:text-teal-400">5</span> Years Research
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-16 px-8 bg-white dark:bg-slate-800 rounded-3xl shadow-lg">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <Badge className="mb-4 bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300">
                  Innovation Portfolio
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
                  Our Notable Projects
                </h2>
                <p className="text-slate-700 dark:text-slate-300 text-lg">
                  Discover our diverse range of innovative solutions addressing global challenges.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "AquaPure",
                    description:
                      "A biological water filtration system that removes contaminants using natural enzymes and microorganisms.",
                    image: "/placeholder.svg?height=400&width=600",
                    category: "Water Purification",
                  },
                  {
                    title: "EcoPackage",
                    description: "Fully biodegradable packaging materials made from agricultural waste and mycelium.",
                    image: "/placeholder.svg?height=400&width=600",
                    category: "Sustainable Materials",
                  },
                  {
                    title: "BioSensor",
                    description:
                      "Portable biosensors for rapid detection of pathogens in food, water, and clinical samples.",
                    image: "/placeholder.svg?height=400&width=600",
                    category: "Diagnostics",
                  },
                  {
                    title: "GreenEnzyme",
                    description:
                      "Industrial enzymes that enable manufacturing processes to operate at lower temperatures, saving energy.",
                    image: "/placeholder.svg?height=400&width=600",
                    category: "Industrial Biotechnology",
                  },
                  {
                    title: "ReLeaf",
                    description:
                      "Accelerated reforestation technology using symbiotic fungi and specialized soil amendments.",
                    image: "/placeholder.svg?height=400&width=600",
                    category: "Environmental Restoration",
                  },
                  {
                    title: "MediGrow",
                    description:
                      "Controlled environment systems for growing medicinal plants with consistent bioactive compounds.",
                    image: "/placeholder.svg?height=400&width=600",
                    category: "Pharmaceutical",
                  },
                ].map((project, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                      <Badge className="absolute top-3 left-3 bg-teal-500 text-white">{project.category}</Badge>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl text-slate-900 dark:text-white">{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700 dark:text-slate-300">{project.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="ghost"
                        className="text-teal-600 dark:text-teal-400 p-0 hover:bg-transparent hover:text-teal-700 dark:hover:text-teal-300"
                      >
                        View Project <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>

            <section className="py-16 px-8 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-3xl shadow-lg text-white">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <Badge className="mb-4 bg-white/20 text-white">Partnerships</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Research Collaborations</h2>
                <p className="text-white/80 text-lg mb-12">
                  We collaborate with leading universities, research institutions, and industry partners to accelerate
                  innovation and expand our impact.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                  {[
                    "University of California",
                    "Max Planck Institute",
                    "Singapore Biotechnology Center",
                    "Global Sustainability Alliance",
                    "European Research Consortium",
                  ].map((partner, index) => (
                    <div
                      key={index}
                      className="bg-white/10 backdrop-blur-sm p-4 rounded-xl shadow-lg hover:bg-white/20 transition-colors duration-300 flex items-center justify-center h-24"
                    >
                      <p className="font-medium text-center">{partner}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center mt-12">
                <Button className="bg-white text-teal-600 hover:bg-white/90">Become a Partner</Button>
              </div>
            </section>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-16">
            <section id="contact" className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <Badge className="mb-4 bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300">
                  Get in Touch
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
                  We'd Love to Hear From You
                </h2>
                <p className="text-slate-700 dark:text-slate-300 mb-8 text-lg leading-relaxed">
                  Whether you're interested in our products, looking to collaborate, or have questions about our
                  research, our team is ready to assist you.
                </p>

                <div className="space-y-8">
                  <div className="flex items-start gap-6">
                    <div className="bg-teal-100 dark:bg-teal-900 p-3 rounded-full">
                      <Phone className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl mb-2 text-slate-900 dark:text-white">Phone</h3>
                      <p className="text-slate-700 dark:text-slate-300 mb-1">Main Office: +1 (555) 123-4567</p>
                      <p className="text-slate-700 dark:text-slate-300">Customer Support: +1 (555) 987-6543</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-6">
                    <div className="bg-teal-100 dark:bg-teal-900 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                      
                      <h3 className="font-semibold text-xl mb-2 text-slate-900 dark:text-white">Email</h3>
                      <p className="text-slate-700 dark:text-slate-300 mb-1">General Inquiries: info@starnova.com</p>
                      <p className="text-slate-700 dark:text-slate-300 mb-1">Support: support@starnova.com</p>
                      <p className="text-slate-700 dark:text-slate-300">Partnerships: partners@starnova.com</p>
                     
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-6">
                    <div className="bg-teal-100 dark:bg-teal-900 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl mb-2 text-slate-900 dark:text-white">Locations</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">Headquarters</p>
                          <p className="text-slate-700 dark:text-slate-300">123 Innovation Way</p>
                          <p className="text-slate-700 dark:text-slate-300">San Francisco, CA 94107</p>
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">Research Center</p>
                          <p className="text-slate-700 dark:text-slate-300">456 Science Park</p>
                          <p className="text-slate-700 dark:text-slate-300">Boston, MA 02210</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <h3 className="font-semibold text-xl mb-4 text-slate-900 dark:text-white">Connect With Us</h3>
                  <div className="flex gap-4">
                    <Link
                      href="https://twitter.com"
                      className="bg-slate-100 dark:bg-slate-800 hover:bg-teal-100 dark:hover:bg-teal-900 p-3 rounded-full transition-colors"
                    >
                      <Twitter className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                      <span className="sr-only">Twitter</span>
                    </Link>
                    <Link
                      href="https://linkedin.com"
                      className="bg-slate-100 dark:bg-slate-800 hover:bg-teal-100 dark:hover:bg-teal-900 p-3 rounded-full transition-colors"
                    >
                      <Linkedin className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                      <span className="sr-only">LinkedIn</span>
                    </Link>
                    <Link
                      href="https://facebook.com"
                      className="bg-slate-100 dark:bg-slate-800 hover:bg-teal-100 dark:hover:bg-teal-900 p-3 rounded-full transition-colors"
                    >
                      <Facebook className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                      <span className="sr-only">Facebook</span>
                    </Link>
                    <Link
                      href="https://instagram.com"
                      className="bg-slate-100 dark:bg-slate-800 hover:bg-teal-100 dark:hover:bg-teal-900 p-3 rounded-full transition-colors"
                    >
                      <Instagram className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                      <span className="sr-only">Instagram</span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl">
                <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Send Us a Message</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Full Name
                      </label>
                      <input
                        id="name"
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Subject
                    </label>
                    <input
                      id="subject"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                      placeholder="What is your message about?"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                      placeholder="How can we help you today?"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        id="privacy"
                        type="checkbox"
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded"
                      />
                      <label htmlFor="privacy" className="ml-2 block text-sm text-slate-700 dark:text-slate-300">
                        I agree to the{" "}
                        <Link href="#" className="text-teal-600 hover:underline">
                          privacy policy
                        </Link>
                      </label>
                    </div>
                  </div>
                  <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 text-lg">Send Message</Button>
                </form>
              </div>
            </section>

            <section>
              <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl overflow-hidden">
                <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Visit Our Headquarters</h3>
                <div className="aspect-video bg-slate-100 dark:bg-slate-900 rounded-xl overflow-hidden">
                  {/* This would be replaced with an actual map */}
                  <div className="h-full w-full flex items-center justify-center p-8 relative">
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: "url('/placeholder.svg?height=600&width=1200')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                    <div className="relative z-10 text-center">
                      <p className="text-slate-700 dark:text-slate-300 mb-4">Interactive map would be displayed here</p>
                      <Button
                        variant="outline"
                        className="border-teal-500 text-teal-500 hover:bg-teal-50 dark:hover:bg-teal-950"
                      >
                        Open in Google Maps
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl">
                    <h4 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white">Business Hours</h4>
                    <p className="text-slate-700 dark:text-slate-300">Monday - Friday: 9AM - 6PM</p>
                    <p className="text-slate-700 dark:text-slate-300">Saturday: 10AM - 4PM</p>
                    <p className="text-slate-700 dark:text-slate-300">Sunday: Closed</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl">
                    <h4 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white">Parking</h4>
                    <p className="text-slate-700 dark:text-slate-300">
                      Free visitor parking available in the main lot.
                    </p>
                    <p className="text-slate-700 dark:text-slate-300">Electric vehicle charging stations available.</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl">
                    <h4 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white">Public Transport</h4>
                    <p className="text-slate-700 dark:text-slate-300">Bus routes 42 and 108 stop directly outside.</p>
                    <p className="text-slate-700 dark:text-slate-300">10 minute walk from Central Station.</p>
                  </div>
                </div>
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
