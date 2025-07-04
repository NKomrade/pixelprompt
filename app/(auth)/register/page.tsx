'use client'

import React from 'react'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Register = () => {
  const router = useRouter()

  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn('google', {
        callbackUrl: '/dashboard',
        redirect: false,
      })
      
      if (result?.ok) {
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Sign in error:', error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>
            Sign up with your Google account to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleGoogleSignIn}
            variant="outline"
            className="w-full flex items-center gap-2 h-12 cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Mail className="w-5 h-5" />
            Continue with Google
          </Button>
          
          <p className="text-xs text-muted-foreground text-center mt-4">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default Register