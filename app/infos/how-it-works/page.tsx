import Link from "next/link"
import { ArrowRight, CheckCircle, TrendingUp, Users, Leaf } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import FarmerTestimonialCard from "@/components/infos/farmer-testimonial-card"

export default function InfoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-emerald-700 py-20 text-white md:py-32">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600&text=Farm+Background')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-emerald-700/80"></div>
        <div className="container relative px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Bringing Farmers Closer to the Market
            </h1>
            <p className="mb-8 text-lg text-emerald-100 md:text-xl">
              MerrBio is revolutionizing the agricultural supply chain by connecting local farmers directly with
              consumers, eliminating middlemen and creating a sustainable food ecosystem.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="rounded-full bg-white px-8 text-emerald-700 hover:bg-gray-100">
                <Link href="/shop">Explore Products</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-white px-8 text-emerald-700 hover:bg-gray-100"
              >
                <Link href="/auth/signup">
                  Join as a Farmer <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="container px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-block rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-800">
            Our Mission
          </div>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Empowering Farmers, Nourishing Communities
          </h2>
          <p className="mb-8 text-lg text-gray-600">
            At MerrBio, we believe in a world where farmers receive fair compensation for their hard work, and consumers
            have access to fresh, locally-grown produce. Our platform eliminates unnecessary intermediaries, creating a
            direct connection that benefits both farmers and consumers.
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                <TrendingUp className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="mb-2 text-xl font-medium text-gray-900">Increased Profits</h3>
              <p className="text-center text-gray-600">
                Farmers earn up to 40% more by selling directly to consumers through our platform.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="mb-2 text-xl font-medium text-gray-900">Community Building</h3>
              <p className="text-center text-gray-600">
                Creating meaningful connections between those who grow food and those who consume it.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                <Leaf className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="mb-2 text-xl font-medium text-gray-900">Sustainability</h3>
              <p className="text-center text-gray-600">
                Reducing food miles and supporting environmentally responsible farming practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-emerald-600 py-16 text-white">
        <div className="container px-4">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-8 md:grid-cols-4">
              <div className="text-center">
                <p className="text-4xl font-bold">500+</p>
                <p className="text-emerald-100">Local Farmers</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold">40%</p>
                <p className="text-emerald-100">Increased Farmer Income</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold">15,000+</p>
                <p className="text-emerald-100">Happy Customers</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold">50+</p>
                <p className="text-emerald-100">Communities Served</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container px-4 py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">How MerrBio Works</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Our platform simplifies the process of connecting farmers with consumers, creating a seamless experience
              for everyone involved.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-emerald-100">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="mb-2 text-xl font-medium text-gray-900">Farmers List Products</h3>
                <p className="text-gray-600">
                  Local farmers create profiles and list their fresh produce, specifying details like organic status,
                  harvest dates, and available quantities.
                </p>
              </CardContent>
            </Card>

            <Card className="border-emerald-100">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="mb-2 text-xl font-medium text-gray-900">Consumers Shop</h3>
                <p className="text-gray-600">
                  Customers browse the marketplace, filtering by location, product type, or farm. They place orders for
                  delivery or pickup.
                </p>
              </CardContent>
            </Card>

            <Card className="border-emerald-100">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="mb-2 text-xl font-medium text-gray-900">Direct Delivery</h3>
                <p className="text-gray-600">
                  Products are harvested at peak freshness and delivered directly to consumers, ensuring maximum quality
                  and minimal waste.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Farmer Testimonials */}
      <section className="bg-gray-50 py-16">
        <div className="container px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Hear From Our Farmers</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Discover how MerrBio has transformed the lives of farmers across the country.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FarmerTestimonialCard
              name="Sarah Johnson"
              farm="Green Valley Organic Farm"
              location="Portland, Oregon"
              image="/placeholder.svg?height=400&width=400&text=Farmer+Sarah"
              quote="MerrBio has completely changed my business. I'm now able to sell directly to customers who appreciate the quality of my organic produce, and I'm earning more than I ever did selling to wholesalers."
            />

            <FarmerTestimonialCard
              name="Miguel Rodriguez"
              farm="Sunshine Family Farm"
              location="Santa Barbara, California"
              image="/placeholder.svg?height=400&width=400&text=Farmer+Miguel"
              quote="As a small family farm, we struggled to compete with large agricultural businesses. MerrBio gave us a platform to reach customers who value locally-grown produce and sustainable farming practices."
            />

            <FarmerTestimonialCard
              name="Amara Washington"
              farm="Heritage Acres"
              location="Austin, Texas"
              image="/placeholder.svg?height=400&width=400&text=Farmer+Amara"
              quote="The direct connection with my customers through MerrBio has been invaluable. I get feedback on my products, understand what people want, and can adjust my growing plans accordingly."
            />

            <FarmerTestimonialCard
              name="John Peterson"
              farm="Riverbend Dairy"
              location="Madison, Wisconsin"
              image="/placeholder.svg?height=400&width=400&text=Farmer+John"
              quote="Before MerrBio, I was considering giving up my dairy farm due to low wholesale prices. Now I sell my artisanal cheeses directly to consumers who appreciate the craftsmanship, and business is thriving."
            />

            <FarmerTestimonialCard
              name="Li Wei Chen"
              farm="Harmony Gardens"
              location="Seattle, Washington"
              image="/placeholder.svg?height=400&width=400&text=Farmer+Li"
              quote="As an immigrant farmer, I faced many challenges breaking into traditional markets. MerrBio provided an accessible platform where I could share my unique vegetables and heritage crops with appreciative customers."
            />

            <FarmerTestimonialCard
              name="Robert Jackson"
              farm="Oakridge Orchards"
              location="Upstate New York"
              image="/placeholder.svg?height=400&width=400&text=Farmer+Robert"
              quote="My family has been growing apples for generations, but we were always at the mercy of distributors. With MerrBio, we now have control over our pricing and can tell the story behind our heirloom varieties."
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container px-4 py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Benefits for Everyone</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Our platform creates value for farmers, consumers, and communities alike.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-xl bg-white p-8 shadow-md">
              <h3 className="mb-4 text-2xl font-bold text-emerald-700">For Farmers</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-emerald-500" />
                  <span>Higher profit margins by eliminating middlemen</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-emerald-500" />
                  <span>Direct customer feedback and relationship building</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-emerald-500" />
                  <span>Flexible selling options with no long-term contracts</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-emerald-500" />
                  <span>Simple platform with minimal technical knowledge required</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-emerald-500" />
                  <span>Marketing support and increased visibility for your farm</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl bg-white p-8 shadow-md">
              <h3 className="mb-4 text-2xl font-bold text-emerald-700">For Consumers</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-emerald-500" />
                  <span>Access to fresher, more nutritious produce</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-emerald-500" />
                  <span>Complete transparency about where your food comes from</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-emerald-500" />
                  <span>Support for local farmers and rural economies</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-emerald-500" />
                  <span>Reduced environmental impact through shorter supply chains</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-emerald-500" />
                  <span>Discover unique, heritage, and specialty crops</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-700 py-16 text-white">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold">Join the Agricultural Revolution</h2>
            <p className="mb-8 text-lg text-emerald-100">
              Whether you're a farmer looking to expand your market or a consumer seeking fresh, local produce, MerrBio
              is here to connect you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="rounded-full bg-white px-8 text-emerald-700 hover:bg-gray-100">
                <Link href="/shop">Shop Now</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className=" border-white px-8 text-emerald-700 hover:bg-gray-100"
              >
                <Link href="/auth/signup">
                  Become a Seller <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
