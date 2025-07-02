import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import User from '@/lib/models/User'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await connectDB()

    const user = await User.findOne({ email: session.user.email }).select('name email profilePicture credits plan')
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      credits: user.credits,
      plan: user.plan
    })

  } catch (error) {
    console.error('Get user profile error:', error)
    return NextResponse.json(
      { error: 'Failed to get user profile' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { name, profilePicture } = await request.json()

    await connectDB()

    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { 
        ...(name && { name }),
        ...(profilePicture && { profilePicture })
      },
      { new: true }
    ).select('name email profilePicture credits plan')
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      credits: user.credits,
      plan: user.plan
    })

  } catch (error) {
    console.error('Update user profile error:', error)
    return NextResponse.json(
      { error: 'Failed to update user profile' },
      { status: 500 }
    )
  }
}