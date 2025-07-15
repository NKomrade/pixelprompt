import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Razorpay from 'razorpay'

// Payment plans configuration
const PAYMENT_PLANS = {
  'Free': { id: 'free', name: 'Free', price: 0, credits: 5 },
  'Pro': { id: 'pro', name: 'Pro', price: 4900, credits: 50 }, // Price in paise (₹49 = 4900 paise)
  'Advanced': { id: 'advanced', name: 'Advanced', price: 9900, credits: 200 } // Price in paise (₹99 = 9900 paise)
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { planName } = await request.json()
    const plan = PAYMENT_PLANS[planName as keyof typeof PAYMENT_PLANS]
    
    if (!plan) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    console.log('Creating order for plan:', planName, 'Price:', plan.price)

    // Handle free plan
    if (plan.id === 'free') {
      return NextResponse.json({
        isFree: true,
        planId: plan.id,
        planName: plan.name,
        credits: plan.credits
      })
    }

    // Create Razorpay order for paid plans
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error('Razorpay keys not configured')
      return NextResponse.json({ error: 'Payment system not configured' }, { status: 500 })
    }

    // Initialize Razorpay instance here to avoid the key error
    const razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })

    // Generate a short unique receipt ID (max 40 chars)
    const timestamp = Date.now().toString().slice(-10)
    const receiptId = `${plan.id.charAt(0)}${timestamp}`
    console.log('Generated receipt ID:', receiptId, 'Length:', receiptId.length)

    const order = await razorpayInstance.orders.create({
      amount: plan.price, // Amount in paise
      currency: 'INR',
      receipt: receiptId,
      payment_capture: true,
    })

    console.log('Razorpay order created:', order.id)

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      planId: plan.id,
      planName: plan.name,
      credits: plan.credits,
      isFree: false
    })
  } catch (error) {
    console.error('Payment order creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create payment order' },
      { status: 500 }
    )
  }
}