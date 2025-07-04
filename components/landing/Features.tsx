import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Zap, Palette, Download, Layers, Clock, Shield } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Generate high-quality images in seconds with our optimized AI models.'
  },
  {
    icon: Palette,
    title: 'Multiple Styles',
    description: 'Choose from various artistic styles including photorealistic, anime, and abstract.'
  },
  {
    icon: Download,
    title: 'High Resolution',
    description: 'Download your images in multiple formats and resolutions up to 4K.'
  },
  {
    icon: Layers,
    title: 'Batch Generation',
    description: 'Create multiple variations of your prompt to find the perfect image.'
  },
  {
    icon: Clock,
    title: 'History & Favorites',
    description: 'Keep track of your creations and save your favorite prompts for later.'
  },
  {
    icon: Shield,
    title: 'Commercial License',
    description: 'Use generated images for commercial purposes with our pro plans.'
  }
]

export const Features = () => {
  return (
    <section id="features" className="container mx-auto px-4 py-16 lg:py-24">
      <div className="text-center mb-12 lg:mb-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Powerful Features for Creative Minds
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
          Everything you need to bring your imagination to life with AI-powered image generation.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" suppressHydrationWarning>
        {features.map((feature, index) => (
          <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1" suppressHydrationWarning>
            <CardHeader className="pb-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
              </div>
              <CardTitle className="text-lg lg:text-xl">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-sm lg:text-base leading-relaxed">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}