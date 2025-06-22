import React from 'react'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="bg-secondary/10 border-t">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center border border-primary/20 shadow-sm">
                <span className="text-primary-foreground font-bold text-lg">P</span>
              </div>
              <span className="font-bold text-xl">PixelPrompt</span>
            </Link>
            <p className="text-muted-foreground max-w-md mb-6 text-sm lg:text-base leading-relaxed">
              Transform your imagination into stunning visual content with our AI-powered image generation platform. 
              Create, customize, and download professional-quality images in seconds.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>
          
          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4 text-sm lg:text-base">Product</h3>
            <ul className="space-y-2 lg:space-y-3">
              <li>
                <Link href="/features" className="text-muted-foreground hover:text-foreground transition-colors text-sm lg:text-base">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors text-sm lg:text-base">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-muted-foreground hover:text-foreground transition-colors text-sm lg:text-base">
                  API
                </Link>
              </li>
              <li>
                <Link href="/examples" className="text-muted-foreground hover:text-foreground transition-colors text-sm lg:text-base">
                  Examples
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-sm lg:text-base">Company</h3>
            <ul className="space-y-2 lg:space-y-3">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors text-sm lg:text-base">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors text-sm lg:text-base">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors text-sm lg:text-base">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors text-sm lg:text-base">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-6 lg:my-8" />
        
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-muted-foreground text-xs lg:text-sm text-center sm:text-left">
            © 2024 PixelPrompt. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center sm:justify-end space-x-4 lg:space-x-6 text-xs lg:text-sm">
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