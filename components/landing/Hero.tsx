import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import ClientOnly from '@/components/ui/client-only'

export const Hero = () => {
  return (
    <section className="container mx-auto px-4 py-16 lg:py-24 xl:py-32 text-center">
      <div className="max-w-5xl mx-auto">
        <ClientOnly fallback={<div className="h-10 bg-muted rounded-full animate-pulse mb-6" />}>
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-2 bg-secondary px-3 py-2 lg:px-4 lg:py-2 rounded-full">
              <Sparkles className="w-3 h-3 lg:w-4 lg:h-4 text-primary" />
              <span className="text-xs lg:text-sm font-medium">AI-Powered Image Generation</span>
            </div>
          </div>
        </ClientOnly>
        
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
          Transform Your Ideas Into
          <span className="block mt-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text">
            Stunning Images
          </span>
        </h1>
        
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Create professional-quality images from simple text descriptions using advanced AI technology. 
          Perfect for designers, marketers, and creators.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 lg:gap-4 mb-12 lg:mb-16">
          <Button size="lg" className="text-base lg:text-lg px-6 lg:px-8 w-full sm:w-auto" asChild>
            <Link href="/register">
              Start Creating Now
              <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 ml-2 animate-pulse" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="text-base lg:text-lg px-6 lg:px-8 w-full sm:w-auto" asChild>
            <Link href="#demo">
              View Examples
            </Link>
          </Button>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg lg:rounded-xl border shadow-xl lg:shadow-2xl">
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="text-center">
                <Sparkles className="w-12 h-12 lg:w-16 lg:h-16 text-primary mx-auto mb-4" />
                <p className="text-sm lg:text-lg text-muted-foreground">Your AI-generated masterpiece appears here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}