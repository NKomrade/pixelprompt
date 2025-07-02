'use client'

import React, { useState, useRef } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Camera, Upload } from 'lucide-react'
import { useSession } from 'next-auth/react'

interface ProfilePictureUploadProps {
  currentImage?: string | null
  onImageUpdate?: (imageUrl: string) => void
}

const ProfilePictureUpload = ({ currentImage, onImageUpdate }: ProfilePictureUploadProps) => {
  const { data: session } = useSession()
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    setUploading(true)

    try {
      // Convert file to base64
      const reader = new FileReader()
      reader.onload = async () => {
        const base64 = reader.result as string
        
        try {
          // Update user profile with new image
          const response = await fetch('/api/user/profile', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              profilePicture: base64
            }),
          })

          if (response.ok) {
            const data = await response.json()
            onImageUpdate?.(data.profilePicture)
            
            // Refresh the page to update the session
            window.location.reload()
          } else {
            throw new Error('Failed to update profile picture')
          }
        } catch (error) {
          console.error('Error updating profile picture:', error)
          alert('Failed to update profile picture')
        }
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Error processing file:', error)
      alert('Failed to process image')
    } finally {
      setUploading(false)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
          {currentImage && (
            <AvatarImage 
              src={currentImage} 
              alt={session?.user?.name || 'Profile'}
              className="object-cover"
            />
          )}
          <AvatarFallback className="text-2xl">
            {session?.user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </AvatarFallback>
        </Avatar>
        
        <Button
          size="sm"
          variant="secondary"
          className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
          onClick={handleUploadClick}
          disabled={uploading}
        >
          {uploading ? (
            <Upload className="h-4 w-4 animate-spin" />
          ) : (
            <Camera className="h-4 w-4" />
          )}
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      <p className="text-xs text-muted-foreground text-center">
        Click the camera icon to upload a new profile picture
        <br />
        (Max 5MB, JPG/PNG/GIF)
      </p>
    </div>
  )
}

export default ProfilePictureUpload