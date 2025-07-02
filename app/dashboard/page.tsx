'use client'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Send, Loader2, ImageIcon, AlertCircle } from 'lucide-react'
import { redirect } from 'next/navigation'

const DashboardPage = () => {
  const { data: session, status } = useSession()
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [credits, setCredits] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch user credits
  useEffect(() => {
    const fetchCredits = async () => {
      if (session?.user?.email) {
        try {
          const response = await fetch('/api/user/credits')
          if (response.ok) {
            const data = await response.json()
            setCredits(data.credits)
          }
        } catch (error) {
          console.error('Error fetching credits:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchCredits()
  }, [session])

  // Handle authentication states after all hooks
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (status === 'unauthenticated') {
    redirect('/register')
  }

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt')
      return
    }
    
    if (credits < 1) {
      setError('Insufficient credits')
      return
    }
    
    setIsGenerating(true)
    setError(null)
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image')
      }

      setGeneratedImage(data.imageUrl)
      setCredits(data.remainingCredits)
      setError(null)
    } catch (error) {
      console.error('Error generating image:', error)
      setError(error instanceof Error ? error.message : 'Failed to generate image')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleGenerateImage()
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Welcome back, {session?.user?.name}!</h1>
        <p className="text-muted-foreground">
          Create stunning images with AI. Just describe what you want to see.
        </p>
        {!loading && (
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="text-sm text-muted-foreground">Available Credits:</span>
            <span className="font-semibold text-lg">{credits}</span>
            {credits < 3 && (
              <AlertCircle className="w-4 h-4 text-yellow-500" />
            )}
          </div>
        )}
        {error && (
          <div className="flex items-center justify-center gap-2 mt-4 text-red-500">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </div>
        )}
      </div>

      {/* Generated Image Display */}
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="aspect-square max-w-lg mx-auto bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
            {generatedImage ? (
              <img
                src={generatedImage}
                alt="Generated image"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="text-center space-y-4">
                <ImageIcon className="w-16 h-16 mx-auto text-muted-foreground/50" />
                <p className="text-muted-foreground">
                  Your generated image will appear here
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Prompt Input Section */}
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="space-y-4">
            <label htmlFor="prompt" className="text-sm font-medium">
              Describe the image you want to generate
            </label>
            <div className="flex gap-3">
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="A beautiful sunset over mountains with purple and orange colors..."
                className="flex-1 min-h-[100px] px-3 py-2 text-sm rounded-md border border-input bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isGenerating}
              />
              <Button
                onClick={handleGenerateImage}
                disabled={!prompt.trim() || isGenerating}
                size="lg"
                className="px-6 self-end"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Generate
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Press Enter to generate or click the Generate button. Be specific and descriptive for best results.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardPage