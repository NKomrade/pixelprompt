'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useSession } from 'next-auth/react'

interface CreditContextType {
  credits: number
  loading: boolean
  error: string | null
  updateCredits: (newCredits: number) => void
  decrementCredits: () => void
  refreshCredits: () => Promise<void>
}

const CreditContext = createContext<CreditContextType | undefined>(undefined)

interface CreditProviderProps {
  children: ReactNode
}

export const CreditProvider: React.FC<CreditProviderProps> = ({ children }) => {
  const { data: session, status } = useSession()
  const [credits, setCredits] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCredits = async () => {
    if (!session?.user?.email) {
      setCredits(0)
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const response = await fetch('/api/user/credits')
      
      if (response.ok) {
        const data = await response.json()
        setCredits(data.credits || 0)
        setError(null)
      } else {
        setError('Failed to fetch credits')
        console.error('Failed to fetch credits:', response.statusText)
      }
    } catch (error) {
      setError('Network error')
      console.error('Error fetching credits:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateCredits = (newCredits: number) => {
    setCredits(newCredits)
  }

  const decrementCredits = () => {
    setCredits(prev => Math.max(0, prev - 1))
  }

  const refreshCredits = async () => {
    await fetchCredits()
  }

  // Fetch credits when session changes
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email) {
      fetchCredits()
    } else if (status === 'unauthenticated') {
      setCredits(0)
      setLoading(false)
    }
  }, [session, status])

  const value: CreditContextType = {
    credits,
    loading,
    error,
    updateCredits,
    decrementCredits,
    refreshCredits
  }

  return (
    <CreditContext.Provider value={value}>
      {children}
    </CreditContext.Provider>
  )
}

export const useCredits = (): CreditContextType => {
  const context = useContext(CreditContext)
  if (context === undefined) {
    throw new Error('useCredits must be used within a CreditProvider')
  }
  return context
}