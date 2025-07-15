'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCredits } from '@/contexts/CreditContext'
import { toast } from 'react-hot-toast'

interface PaymentButtonProps {
  planName: string
  planPrice: string
  credits: number
  buttonText: string
  variant?: 'default' | 'outline'
}

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function PaymentButton({ 
  planName, 
  planPrice, 
  credits, 
  buttonText,
  variant = 'default'
}: PaymentButtonProps) {
  const { data: session } = useSession()
  const { refreshCredits } = useCredits()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handlePayment = async () => {
    if (!session) {
      router.push('/login')
      return
    }

    // Prevent multiple clicks
    if (loading) return

    setLoading(true)
    
    try {
      console.log('Starting payment for plan:', planName)
      
      // Create order
      const orderRes = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planName }),
      })
      
      const orderData = await orderRes.json()
      console.log('Order response:', orderData)
      
      if (!orderRes.ok) throw new Error(orderData.error)

      // Handle free plan
      if (orderData.isFree) {
        console.log('Processing free plan')
        const verifyRes = await fetch('/api/payments/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            planName,
            isFree: true 
          }),
        })
        
        const verifyData = await verifyRes.json()
        
        if (verifyData.success) {
          toast.success(`Successfully upgraded to ${planName} plan! You now have ${credits} credits.`)
          await refreshCredits()
          router.push('/dashboard')
        } else {
          throw new Error('Failed to upgrade plan')
        }
        setLoading(false)
        return
      }

      // Initialize Razorpay for paid plans
      console.log('Initializing Razorpay for paid plan')
      
      if (!window.Razorpay) {
        console.error('Razorpay SDK not loaded')
        throw new Error('Razorpay SDK not loaded. Please refresh the page and try again.')
      }

      // Get Razorpay key from environment
      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
      console.log('Environment check - Razorpay Key exists:', !!razorpayKey)
      
      if (!razorpayKey) {
        console.error('Razorpay key not configured')
        throw new Error('Payment system not configured. Please contact support.')
      }

      console.log('Razorpay Key:', razorpayKey?.substring(0, 10) + '...')
      console.log('Order Data:', orderData)

      const options = {
        key: razorpayKey,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'PixelPrompt',
        description: `${planName} Plan - ${credits} Credits`,
        order_id: orderData.orderId,
        handler: async (response: any) => {
          try {
            // Verify payment
            const verifyRes = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...response,
                planName,
              }),
            })
            
            const verifyData = await verifyRes.json()
            
            if (verifyData.success) {
              toast.success(`Payment successful! You now have ${verifyData.credits} credits.`)
              await refreshCredits()
              router.push('/dashboard?payment=success')
            } else {
              throw new Error('Payment verification failed')
            }
          } catch (error) {
            console.error('Payment verification error:', error)
            toast.error('Payment verification failed. Please contact support.')
          } finally {
            setLoading(false)
          }
        },
        prefill: {
          name: session.user?.name || '',
          email: session.user?.email || '',
        },
        theme: {
          color: '#3B82F6',
        },
        modal: {
          ondismiss: () => {
            setLoading(false)
            toast.error('Payment cancelled')
          }
        }
      }

      // Ensure only one Razorpay instance
      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error('Payment error:', error)
      toast.error('Payment failed. Please try again.')
      setLoading(false)
    }
  }

  return (
    <Button 
      onClick={handlePayment} 
      disabled={loading}
      className="w-full"
      variant={variant}
      size="lg"
    >
      {loading ? 'Processing...' : buttonText}
    </Button>
  )
}