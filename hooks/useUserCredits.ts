'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

interface UserData {
  credits: number
  plan: string
  loading: boolean
  error: string | null
}

export function useUserCredits() {
  const { data: session } = useSession()
  const [userData, setUserData] = useState<UserData>({
    credits: 0,
    plan: 'free',
    loading: true,
    error: null
  })

  useEffect(() => {
    const fetchUserData = async () => {
      if (!session?.user?.email) {
        setUserData(prev => ({ ...prev, loading: false }))
        return
      }

      try {
        const response = await fetch('/api/user/profile')
        if (response.ok) {
          const data = await response.json()
          setUserData({
            credits: data.credits || 0,
            plan: data.plan || 'free',
            loading: false,
            error: null
          })
        } else {
          setUserData(prev => ({
            ...prev,
            loading: false,
            error: 'Failed to fetch user data'
          }))
        }
      } catch (error) {
        setUserData(prev => ({
          ...prev,
          loading: false,
          error: 'Network error'
        }))
      }
    }

    fetchUserData()
  }, [session])

  const refreshUserData = async () => {
    setUserData(prev => ({ ...prev, loading: true }))
    if (session?.user?.email) {
      try {
        const response = await fetch('/api/user/profile')
        if (response.ok) {
          const data = await response.json()
          setUserData({
            credits: data.credits || 0,
            plan: data.plan || 'free',
            loading: false,
            error: null
          })
        }
      } catch (error) {
        setUserData(prev => ({ ...prev, loading: false }))
      }
    }
  }

  return {
    ...userData,
    refreshUserData
  }
}