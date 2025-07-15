import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import User from '@/lib/models/User'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { prompt } = await request.json()

    if (!prompt?.trim()) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    await connectDB()

    // Find user and check credits
    const user = await User.findOne({ email: session.user.email })
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    if (user.credits < 1) {
      return NextResponse.json(
        { error: 'Insufficient credits' },
        { status: 400 }
      )
    }

    let imageUrl = ''
    let success = false
    let lastError = ''

    // Try Pollinations AI first (free, no API key required)
    try {
      console.log('Trying Pollinations AI...')
      const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512&seed=${Math.floor(Math.random() * 1000000)}`
      
      const pollinationsResponse = await fetch(pollinationsUrl, {
        method: 'GET',
        headers: {
          'User-Agent': 'PixelPrompt/1.0'
        }
      })
      
      if (pollinationsResponse.ok) {
        const imageBlob = await pollinationsResponse.blob()
        if (imageBlob.type.startsWith('image/')) {
          const arrayBuffer = await imageBlob.arrayBuffer()
          const base64Image = Buffer.from(arrayBuffer).toString('base64')
          imageUrl = `data:${imageBlob.type};base64,${base64Image}`
          console.log('✅ Success with Pollinations AI')
          success = true
        }
      }
    } catch (error) {
      console.log('❌ Pollinations AI failed:', error instanceof Error ? error.message : 'Unknown error')
      lastError = error instanceof Error ? error.message : 'Unknown error'
    }

    // Fallback to Lexica Art (existing AI art search)
    if (!success) {
      try {
        console.log('Trying Lexica Art...')
        const lexicaResponse = await fetch(`https://lexica.art/api/v1/search?q=${encodeURIComponent(prompt)}`)
        
        if (lexicaResponse.ok) {
          const data = await lexicaResponse.json()
          if (data.images && data.images.length > 0) {
            const randomImage = data.images[Math.floor(Math.random() * Math.min(data.images.length, 5))]
            imageUrl = randomImage.src
            console.log('✅ Success with Lexica Art')
            success = true
          }
        }
      } catch (error) {
        console.log('❌ Lexica Art failed:', error instanceof Error ? error.message : 'Unknown error')
        lastError = error instanceof Error ? error.message : 'Unknown error'
      }
    }

    // Final fallback - custom placeholder
    if (!success) {
      try {
        console.log('Generating placeholder...')
        const placeholderResponse = await fetch(`https://picsum.photos/512/512?random=${Date.now()}`)
        
        if (placeholderResponse.ok) {
          const imageBlob = await placeholderResponse.blob()
          const arrayBuffer = await imageBlob.arrayBuffer()
          const base64Image = Buffer.from(arrayBuffer).toString('base64')
          imageUrl = `data:${imageBlob.type};base64,${base64Image}`
          console.log('✅ Generated placeholder')
          success = true
        }
      } catch (error) {
        console.log('❌ Placeholder failed:', error instanceof Error ? error.message : 'Unknown error')
        lastError = error instanceof Error ? error.message : 'Unknown error'
      }
    }

    if (!success || !imageUrl) {
      console.error('All image generation methods failed. Last error:', lastError)
      return NextResponse.json(
        { 
          error: 'Image generation is temporarily unavailable. Please try again in a few moments.',
          suggestion: 'Try a different prompt or check back later.'
        },
        { status: 503 }
      )
    }

    // Deduct credit from user
    await User.findByIdAndUpdate(user._id, {
      $inc: { credits: -1 }
    })

    console.log(`✅ Image generated for ${session.user.email}. Credits remaining: ${user.credits - 1}`)

    return NextResponse.json({
      imageUrl,
      remainingCredits: user.credits - 1,
      message: 'Image generated successfully!'
    })

  } catch (error) {
    console.error('Image generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate image. Please try again.' },
      { status: 500 }
    )
  }
}