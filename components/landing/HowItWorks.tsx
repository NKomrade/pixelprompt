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

type Props = {}

const HowItWorks = (props: Props) => {
  return (
    <section id="features" className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
          Powerful Features for Creative Minds
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Everything you need to bring your imagination to life with AI-powered image generation.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default HowItWorks