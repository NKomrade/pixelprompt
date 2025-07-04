import React from 'react'
import { Loader2, Sparkles } from 'lucide-react'

const ImageGenerationSkeleton = () => {
  return (
    <div className="w-full h-full relative overflow-hidden rounded-lg" suppressHydrationWarning>
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/30 via-muted/60 to-muted/30 animate-pulse" />
      
      {/* Centered content overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 bg-background/70 backdrop-blur-sm">
        
        {/* Main loading animation */}
        <div className="relative flex items-center justify-center">
          {/* Pulsing rings */}
          <div className="absolute w-24 h-24 rounded-full border-2 border-primary/20 animate-ping" />
          <div className="absolute w-20 h-20 rounded-full border-2 border-primary/30 animate-ping [animation-delay:500ms]" />
          <div className="absolute w-16 h-16 rounded-full border-2 border-primary/40 animate-ping [animation-delay:1000ms]" />
          
          {/* Center loader */}
          <div className="relative z-10 p-3 rounded-full bg-background shadow-lg border border-border">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
          
          {/* Decorative sparkles */}
          <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-primary/60 animate-pulse" />
          <Sparkles className="absolute -bottom-1 -left-1 w-3 h-3 text-primary/40 animate-pulse [animation-delay:700ms]" />
        </div>
        
        {/* Text content */}
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-foreground">Generating your image...</h3>
          <p className="text-sm text-muted-foreground">This may take a few moments</p>
        </div>
        
        {/* Progress indicator */}
        <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary/50 to-primary rounded-full animate-[progress-fill_2s_ease-in-out_infinite]" />
        </div>
        
        {/* Bouncing dots */}
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:100ms]" />
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:200ms]" />
        </div>
      </div>
    </div>
  )
}

export default ImageGenerationSkeleton