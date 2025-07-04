'use client'

import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import DashboardNavbar from '@/components/dashboard/DashboardNavbar'

export function ConditionalNavbar() {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render anything until mounted to prevent hydration issues
  if (!mounted || status === 'loading') {
    return null
  }

  // Show DashboardNavbar if user is authenticated and on dashboard routes
  if (session && pathname.startsWith('/dashboard')) {
    return <DashboardNavbar />
  }

  // Show DashboardNavbar if user is authenticated on any route
  if (session) {
    return <DashboardNavbar />
  }

  // Show regular Navbar for unauthenticated users
  return <Navbar />
}
