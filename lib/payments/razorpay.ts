import Razorpay from 'razorpay'

export const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export const PAYMENT_PLANS = {
  free: { 
    id: 'free', 
    name: 'Free', 
    price: 0, 
    credits: 5,
    planType: 'basic'
  },
  pro: { 
    id: 'pro', 
    name: 'Pro', 
    price: 4900, // Price in paise (₹49)
    credits: 50,
    planType: 'medium'
  },
  advanced: { 
    id: 'advanced', 
    name: 'Advanced', 
    price: 9900, // Price in paise (₹99)
    credits: 200,
    planType: 'advance'
  }
}

export function getPlanByName(planName: string) {
  const planKey = planName.toLowerCase()
  return PAYMENT_PLANS[planKey as keyof typeof PAYMENT_PLANS]
}