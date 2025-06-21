"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <nav className="w-full px-4 py-4 bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary">
          PixelPrompt
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            href="/dashboard" 
            className="text-foreground/80 hover:text-primary transition-colors duration-200"
          >
            Dashboard
          </Link>
          <Link 
            href="/projects" 
            className="text-foreground/80 hover:text-primary transition-colors duration-200"
          >
            Projects
          </Link>
          <Link 
            href="/gallery" 
            className="text-foreground/80 hover:text-primary transition-colors duration-200"
          >
            Gallery
          </Link>
          <Link 
            href="/settings" 
            className="text-foreground/80 hover:text-primary transition-colors duration-200"
          >
            Settings
          </Link>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/profile">Profile</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/logout">Logout</Link>
          </Button>
          <ModeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <ModeToggle />
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
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pt-4 pb-2 space-y-2">
          <Link 
            href="/dashboard" 
            onClick={closeMenu}
            className="block px-4 py-3 text-foreground/80 hover:text-primary hover:bg-accent/50 rounded-lg transition-all duration-200"
          >
            Dashboard
          </Link>
          <Link 
            href="/projects" 
            onClick={closeMenu}
            className="block px-4 py-3 text-foreground/80 hover:text-primary hover:bg-accent/50 rounded-lg transition-all duration-200"
          >
            Projects
          </Link>
          <Link 
            href="/gallery" 
            onClick={closeMenu}
            className="block px-4 py-3 text-foreground/80 hover:text-primary hover:bg-accent/50 rounded-lg transition-all duration-200"
          >
            Gallery
          </Link>
          <Link 
            href="/settings" 
            onClick={closeMenu}
            className="block px-4 py-3 text-foreground/80 hover:text-primary hover:bg-accent/50 rounded-lg transition-all duration-200"
          >
            Settings
          </Link>
          
          {/* Mobile Actions */}
          <div className="pt-4 border-t border-border/50 space-y-2">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/profile" onClick={closeMenu}>Profile</Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/logout" onClick={closeMenu}>Logout</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar