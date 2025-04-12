import Image from "next/image"
import { Quote } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

interface FarmerTestimonialCardProps {
  name: string
  farm: string
  location: string
  image: string
  quote: string
}

export default function FarmerTestimonialCard({ name, farm, location, image, quote }: FarmerTestimonialCardProps) {
  return (
    <Card className="overflow-hidden border-emerald-100 transition-all duration-300 hover:shadow-md">
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={`${name} at ${farm}`}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-sm text-emerald-100">{farm}</p>
          <p className="text-xs text-emerald-200">{location}</p>
        </div>
      </div>
      <CardContent className="relative p-6">
        <Quote className="absolute right-6 top-4 h-8 w-8 text-emerald-100 opacity-50" />
        <p className="text-gray-700">{quote}</p>
      </CardContent>
    </Card>
  )
}
