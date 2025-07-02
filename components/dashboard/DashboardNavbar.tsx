'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LogOut } from 'lucide-react'
import CreditBadge from '@/components/ui/credit-badge'
import { ModeToggle } from '@/components/ui/mode-toggle'
import ClientOnly from '@/components/ui/client-only'

const DashboardNavbar = () => {
  const { data: session } = useSession()
  const [credits, setCredits] = useState<number>(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const fetchCredits = async () => {
      if (session?.user?.email && mounted) {
        try {
          const response = await fetch('/api/user/credits')
          if (response.ok) {
            const data = await response.json()
            setCredits(data.credits)
          }
        } catch (error) {
          console.error('Error fetching credits:', error)
        }
      }
    }

    fetchCredits()
  }, [session, mounted])

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
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
          <ClientOnly fallback={<div className="w-9 h-9" />}>
            <ModeToggle />
          </ClientOnly>
          
          <ClientOnly fallback={<div className="w-16 h-6 bg-muted rounded animate-pulse" />}>
            <CreditBadge credits={credits} />
          </ClientOnly>

          {/* User Profile */}
          {session?.user && (
            <ClientOnly fallback={<div className="w-8 h-8 bg-muted rounded-full animate-pulse" />}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      {session?.user?.image && (
                        <AvatarImage 
                          src={session.user.image} 
                          alt={session.user.name || 'Profile'}
                          className="object-cover"
                        />
                      )}
                      <AvatarFallback>
                        {session?.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {session?.user?.name && (
                        <p className="font-medium">{session.user.name}</p>
                      )}
                      {session?.user?.email && (
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {session.user.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </ClientOnly>
          )}
        </div>
      </div>
    </nav>
  )
}

export default DashboardNavbar
