import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Graphic Designer",
    content: "PixelPrompt has revolutionized my workflow. I can create stunning visuals in minutes instead of hours.",
    rating: 5,
    avatar: "SJ"
  },
  {
    name: "Mike Chen",
    role: "Marketing Director",
    content: "The quality of images generated is incredible. Our social media engagement has increased by 300%.",
    rating: 5,
    avatar: "MC"
  },
  {
    name: "Emily Rodriguez",
    role: "Content Creator",
    content: "As a freelancer, PixelPrompt helps me deliver high-quality work to my clients faster than ever.",
    rating: 5,
    avatar: "ER"
  }
]

const Testimonials = () => {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
          Loved by Creators Worldwide
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Join thousands of satisfied users who trust PixelPrompt for their creative projects.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6">&quot;{testimonial.content}&quot;</p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-semibold text-sm">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default Testimonials