import { Hero } from '@/components/landing/Hero'
import { Features } from '@/components/landing/Features'
import { About } from '@/components/landing/About'
import Samples from '@/components/landing/Samples'
import { Pricing } from '@/components/landing/Pricing'
import Testimonials from '@/components/landing/Testimonials'

export default function Home() {
  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <Hero />
      <Features />
      <About />
      <Samples />
      <Pricing />
      <Testimonials />
    </div>
  )
}
