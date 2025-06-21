import Navbar from '@/components/layout/Navbar'
import { Hero } from '@/components/landing/Hero'
import { Features } from '@/components/landing/Features'
import { About } from '@/components/landing/About'
import { Pricing } from '@/components/landing/Pricing'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <Navbar />
      <Hero />
      <Features />
      <About />
      <Pricing />
      <Footer />
    </div>
  )
}
