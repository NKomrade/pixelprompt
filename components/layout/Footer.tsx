import React from 'react'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer className="bg-secondary/20 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">P</span>
              </div>
              <span className="font-bold text-xl">PixelPrompt</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Transform your ideas into stunning images with AI-powered generation. 
              Perfect for creators, designers, and innovators.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-semibold">Product</h3>
            <div className="space-y-2 text-sm">
              <Link href="/features" className="block text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="/pricing" className="block text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link href="/examples" className="block text-muted-foreground hover:text-foreground transition-colors">
                Examples
              </Link>
              <Link href="/api" className="block text-muted-foreground hover:text-foreground transition-colors">
                API
              </Link>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold">Company</h3>
            <div className="space-y-2 text-sm">
              <Link href="/about" className="block text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="/blog" className="block text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
              <Link href="/careers" className="block text-muted-foreground hover:text-foreground transition-colors">
                Careers
              </Link>
              <Link href="/contact" className="block text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold">Support</h3>
            <div className="space-y-2 text-sm">
              <Link href="/help" className="block text-muted-foreground hover:text-foreground transition-colors">
                Help Center
              </Link>
              <Link href="/docs" className="block text-muted-foreground hover:text-foreground transition-colors">
                Documentation
              </Link>
              <Link href="/community" className="block text-muted-foreground hover:text-foreground transition-colors">
                Community
              </Link>
              <Link href="/status" className="block text-muted-foreground hover:text-foreground transition-colors">
                Status
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2024 PixelPrompt. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer