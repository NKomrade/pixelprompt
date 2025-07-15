import mongoose, { Document, Schema } from 'mongoose'

interface IUser extends Document {
  name: string
  email: string
  password: string
  profilePicture?: string
  credits: number
  plan: string
  paymentHistory: Array<{
    orderId: string
    paymentId: string
    amount: number
    planId: string
    date: Date
    type: 'free_plan' | 'razorpay_payment'
  }>
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: null,
  },
  credits: {
    type: Number,
    default: 5, // Free users get 5 credits
  },
  plan: {
    type: String,
    enum: ['free', 'pro', 'advanced', 'basic'],
    default: 'free',
  },
  paymentHistory: [{
    orderId: String,
    paymentId: String,
    amount: Number,
    planId: String,
    date: { type: Date, default: Date.now },
    type: { type: String, enum: ['free_plan', 'razorpay_payment'], default: 'razorpay_payment' }
  }],
}, {
  timestamps: true,
})

export default mongoose.models.User || mongoose.model<IUser>('User', userSchema)