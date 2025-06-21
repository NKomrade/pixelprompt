import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

type Props = {}

const CTA = (props: Props) => {
  return (
    <section id="pricing" className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6">
          Ready to Transform Your Ideas?
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of creators who are already using PixelPrompt to bring their imagination to life.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="text-lg px-8" asChild>
            <Link href="/register">
              Start Creating for Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8" asChild>
            <Link href="/pricing">
              View Pricing Plans
            </Link>
          </Button>
        </div>
        
        <div className="mt-12 grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">50K+</div>
            <p className="text-muted-foreground">Images Generated</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">10K+</div>
            <p className="text-muted-foreground">Happy Users</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
            <p className="text-muted-foreground">Uptime</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA