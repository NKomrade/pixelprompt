"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { Menu, X } from 'lucide-react'
import ClientOnly from '@/components/ui/client-only'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    closeMenu()
  }

  if (!mounted) {
    return (
      <nav className="w-full px-4 py-4 bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-primary">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center border border-primary/20 shadow-sm">
              <span className="text-primary-foreground font-bold text-lg">P</span>
            </div>
            <span className="font-bold text-xl">PixelPrompt</span>
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <div className="w-9 h-9 bg-muted rounded animate-pulse" />
            <div className="w-20 h-9 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="w-full px-4 py-4 bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-primary">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center border border-primary/20 shadow-sm">
            <span className="text-primary-foreground font-bold text-lg">P</span>
          </div>
          
          <span className="font-bold text-xl">PixelPrompt</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection('features')}
            className="text-foreground/80 hover:text-primary transition-colors duration-200 cursor-pointer"
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className="text-foreground/80 hover:text-primary transition-colors duration-200 cursor-pointer"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('pricing')}
            className="text-foreground/80 hover:text-primary transition-colors duration-200 cursor-pointer"
          >
            Plans
          </button>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4 cursor-pointer">
          <ModeToggle />
          <Button variant="outline" asChild>
            <Link href="/register">Register</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <ClientOnly fallback={<div className="w-9 h-9 bg-muted rounded animate-pulse" />}>
            <ModeToggle />
          </ClientOnly>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-lg hover:bg-accent transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <Menu 
                className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                  isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                }`} 
              />
              <X 
                className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                  isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                }`} 
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <ClientOnly fallback={null}>
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
        <div className="pt-4 pb-2 space-y-2">
          <button 
            onClick={() => scrollToSection('features')}
            className="block w-full text-left px-4 py-3 text-foreground/80 hover:text-primary hover:bg-accent/50 rounded-lg transition-all duration-200"
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className="block w-full text-left px-4 py-3 text-foreground/80 hover:text-primary hover:bg-accent/50 rounded-lg transition-all duration-200"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('pricing')}
            className="block w-full text-left px-4 py-3 text-foreground/80 hover:text-primary hover:bg-accent/50 rounded-lg transition-all duration-200"
          >
            Plans
          </button>
          
          {/* Mobile Actions */}
          <div className="pt-4 border-t border-border/50 space-y-2">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/register" onClick={closeMenu}>Register</Link>
            </Button>
          </div>          </div>
        </div>
      </ClientOnly>
    </nav>
  )
}

export default Navbar