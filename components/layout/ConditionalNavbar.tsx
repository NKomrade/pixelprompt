'use client'

import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import DashboardNavbar from '@/components/dashboard/DashboardNavbar'

// Loading navbar component
const LoadingNavbar = () => (
  <nav className="w-full px-4 py-4 bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50 transition-all duration-300">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center border border-primary/20 shadow-sm">
          <span className="text-primary-foreground font-bold text-lg">P</span>
        </div>
        <span className="font-bold text-xl">PixelPrompt</span>
      </div>
      <div className="hidden md:flex items-center space-x-4">
        <div className="w-9 h-9 bg-muted rounded animate-pulse" />
        <div className="w-20 h-9 bg-muted rounded animate-pulse" />
      </div>
    </div>
  </nav>
)

export function ConditionalNavbar() {
  const { data: session, status } = useSession()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Show loading navbar until mounted and session is determined
  if (!mounted || status === 'loading') {
    return <LoadingNavbar />
  }

  // Show DashboardNavbar for authenticated users
  if (session) {
    return <DashboardNavbar />
  }

  // Show regular Navbar for unauthenticated users
  return <Navbar />
}
