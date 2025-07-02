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

    // Generate image using Hugging Face API with fallback
    const models = [
      'black-forest-labs/FLUX.1-schnell',
      'stabilityai/stable-diffusion-2-1',
      'runwayml/stable-diffusion-v1-5'
    ]
    
    let response
    let lastError
    
    for (const model of models) {
      try {
        console.log(`Trying model: ${model}`)
        response = await fetch(
          `https://api-inference.huggingface.co/models/${model}`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              inputs: prompt,
              parameters: {
                num_inference_steps: 20,
                guidance_scale: 7.5
              }
            }),
          }
        )
        
        if (response.ok) {
          console.log(`Success with model: ${model}`)
          break
        } else {
          const errorText = await response.text()
          console.log(`Model ${model} failed:`, errorText)
          lastError = errorText
          
          if (response.status !== 503) {
            // If it's not a loading error, don't try other models
            break
          }
        }
      } catch (error) {
        console.log(`Error with model ${model}:`, error)
        lastError = error
        continue
      }
    }

    if (!response || !response.ok) {
      console.error('All models failed. Last error:', lastError)
      
      if (response?.status === 503) {
        return NextResponse.json(
          { error: 'All AI models are currently loading. Please try again in a few moments.' },
          { status: 503 }
        )
      }
      
      return NextResponse.json(
        { error: `Image generation failed: ${lastError}` },
        { status: response?.status || 500 }
      )
    }

    const imageBlob = await response.blob()
    
    // Check if we actually got an image
    if (!imageBlob.type.startsWith('image/')) {
      const errorText = await imageBlob.text()
      console.error('Unexpected response type:', imageBlob.type, errorText)
      return NextResponse.json(
        { error: 'Invalid response from image generation service' },
        { status: 500 }
      )
    }

    const arrayBuffer = await imageBlob.arrayBuffer()
    const base64Image = Buffer.from(arrayBuffer).toString('base64')
    const imageUrl = `data:${imageBlob.type};base64,${base64Image}`

    // Deduct credit from user
    await User.findByIdAndUpdate(user._id, {
      $inc: { credits: -1 }
    })

    return NextResponse.json({
      imageUrl,
      remainingCredits: user.credits - 1
    })

  } catch (error) {
    console.error('Image generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    )
  }
}