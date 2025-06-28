import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Users, Target, Zap, Award, Sparkles, Brain, Palette } from 'lucide-react'

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

const features = [
  { icon: Brain, label: 'AI Models' },
  { icon: Sparkles, label: 'High Quality' },
  { icon: Zap, label: 'Fast Processing' },
  { icon: Palette, label: 'Creative Tools' }
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
        
        {/* Right Visual */}
        <div className="relative">
          {/* Main Visual Container */}
          <div className="relative aspect-square">
            {/* Outer ring */}
            <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-spin-slow"></div>
            <div className="absolute inset-4 border border-primary/10 rounded-full animate-spin-reverse"></div>
            
            {/* Center content */}
            <div className="absolute inset-8 bg-gradient-to-br from-background/80 to-background/20 backdrop-blur-sm rounded-full border border-border">
              <div className="h-full flex items-center justify-center">
                <div className="grid grid-cols-2 gap-6 p-8">
                  {features.map((feature, index) => (
                    <div 
                      key={index} 
                      className="group flex flex-col items-center p-4 bg-card/80 backdrop-blur border border-border rounded-xl hover:bg-accent/50 hover:border-primary/20 transition-all duration-300 hover:scale-105"
                      >
                      <feature.icon className="w-8 h-8 mb-3 text-primary group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-xs text-muted-foreground text-center font-medium">{feature.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
              
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-6 h-6 bg-white rounded-full animate-bounce delay-300"></div>
            <div className="absolute -bottom-4 -left-4 w-4 h-4 bg-white/70 rounded-full animate-bounce delay-700"></div>
            <div className="absolute top-1/4 -left-8 w-3 h-3 bg-white/50 dark:bg-white/50 rounded-full animate-pulse"></div>
            
          </div>
        </div>
      </div>
    </section>
  )
}
