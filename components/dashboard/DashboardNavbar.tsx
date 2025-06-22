'use client'

import React from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { LogOut, User } from 'lucide-react'
import Image from 'next/image'

const DashboardNavbar = () => {
  const { data: session } = useSession()

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <nav className="w-full px-4 py-4 bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center space-x-2 text-2xl font-bold text-primary">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center border border-primary/20 shadow-sm">
            <span className="text-primary-foreground font-bold text-lg">P</span>
          </div>
          <span className="font-bold text-xl">PixelPrompt</span>
        </Link>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          <ModeToggle />
          
          {/* User Profile */}
          {session?.user && (
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="flex items-center space-x-2">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    width={32}
                    height={32}
                    className="rounded-full border border-border"
                  />
                ) : (
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                )}
                <span className="text-sm font-medium hidden md:block">
                  {session.user.name || 'User'}
                </span>
              </div>
              
              <Button
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default DashboardNavbar
