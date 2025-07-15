import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import User from '@/lib/models/User'
import crypto from 'crypto'

// Payment plans configuration
const PAYMENT_PLANS = {
  'Free': { id: 'free', name: 'Free', price: 0, credits: 5 },
  'Pro': { id: 'pro', name: 'Pro', price: 4900, credits: 50 }, // Price in paise
  'Advanced': { id: 'advanced', name: 'Advanced', price: 9900, credits: 200 } // Price in paise
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { planName, isFree } = body

    console.log('Verifying payment for plan:', planName, 'isFree:', isFree)

    const plan = PAYMENT_PLANS[planName as keyof typeof PAYMENT_PLANS]
    
    if (!plan) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    await connectDB()

    // Handle free plan
    if (isFree && plan.id === 'free') {
      const user = await User.findOneAndUpdate(
        { email: session.user.email },
        { 
          plan: plan.id,
          // For free plan, reset to 5 credits
          credits: plan.credits,
          $push: {
            paymentHistory: {
              planId: plan.id,
              amount: 0,
              date: new Date(),
              type: 'free_plan'
            }
          }
        },
        { new: true }
      )

      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }

      return NextResponse.json({
        success: true,
        credits: user.credits,
        plan: user.plan
      })
    }

    // Handle paid plans
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature 
    } = body

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: 'Missing payment details' }, { status: 400 })
    }

    // Verify payment signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(sign.toString())
      .digest('hex')

    if (razorpay_signature !== expectedSign) {
      console.error('Invalid payment signature')
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 })
    }

    console.log('Payment signature verified successfully')

    // Update user credits and plan
    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { 
        $inc: { credits: plan.credits },
        plan: plan.id,
        $push: {
          paymentHistory: {
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            amount: plan.price,
            planId: plan.id,
            date: new Date(),
            type: 'razorpay_payment'
          }
        }
      },
      { new: true }
    )

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    console.log('User updated successfully:', user.email, 'Credits:', user.credits)

    return NextResponse.json({
      success: true,
      credits: user.credits,
      plan: user.plan
    })
  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    )
  }
}