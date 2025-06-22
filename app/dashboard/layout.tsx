import React from 'react'
// import DashboardNavbar from '@/components/dashboard/DashboardNavbar'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* <DashboardNavbar /> */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout