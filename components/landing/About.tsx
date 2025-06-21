import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Users, Target, Zap, Award } from 'lucide-react'

const stats = [
  {
    icon: Users,
    value: '50K+',
    label: 'Active Users'
  },
  {
    icon: Target,
    value: '10M+',
    label: 'Images Generated'
  },
  {
    icon: Zap,
    value: '99.9%',
    label: 'Uptime'
  },
  {
    icon: Award,
    value: '4.9/5',
    label: 'User Rating'
  }
]

export const About = () => {
  return (
    <section id="about" className="container mx-auto px-4 py-16 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Content */}
        <div className="order-2 lg:order-1">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6">
            Revolutionizing Creative Expression with AI
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            At PixelPrompt, we believe everyone deserves access to powerful creative tools. 
            Our cutting-edge AI technology transforms simple text descriptions into stunning, 
            professional-quality images that bring your imagination to life.
          </p>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Founded by a team of AI researchers and creative professionals, we're on a mission 
            to democratize visual content creation and empower creators worldwide.
          </p>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-4 lg:p-6">
                <CardContent className="p-0">
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-2xl lg:text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Right Content - Visual */}
        <div className="order-1 lg:order-2">
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-primary/20 via-purple-500/20 to-pink-500/20 rounded-2xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 p-8 w-full h-full">
                  <div className="bg-background/80 backdrop-blur rounded-lg p-4 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg mx-auto mb-2"></div>
                      <div className="text-xs text-muted-foreground">AI Models</div>
                    </div>
                  </div>
                  <div className="bg-background/80 backdrop-blur rounded-lg p-4 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-500/20 rounded-lg mx-auto mb-2"></div>
                      <div className="text-xs text-muted-foreground">High Quality</div>
                    </div>
                  </div>
                  <div className="bg-background/80 backdrop-blur rounded-lg p-4 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-lg mx-auto mb-2"></div>
                      <div className="text-xs text-muted-foreground">Fast Processing</div>
                    </div>
                  </div>
                  <div className="bg-background/80 backdrop-blur rounded-lg p-4 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-orange-500/20 rounded-lg mx-auto mb-2"></div>
                      <div className="text-xs text-muted-foreground">Creative Tools</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}