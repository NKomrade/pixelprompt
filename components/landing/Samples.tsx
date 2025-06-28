import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const sampleImages = [
  {
    prompt: "A futuristic city skyline at sunset with flying cars",
    style: "Photorealistic",
    color: "from-orange-400 to-pink-600"
  },
  {
    prompt: "Cute anime character sitting in a cherry blossom garden",
    style: "Anime",
    color: "from-pink-400 to-purple-600"
  },
  {
    prompt: "Abstract geometric patterns in neon colors",
    style: "Abstract",
    color: "from-cyan-400 to-blue-600"
  },
  {
    prompt: "A majestic dragon flying over mountains",
    style: "Fantasy",
    color: "from-emerald-400 to-teal-600"
  },
  {
    prompt: "Modern minimalist logo design",
    style: "Logo",
    color: "from-gray-400 to-slate-600"
  },
  {
    prompt: "Vintage poster art in retro style",
    style: "Vintage",
    color: "from-yellow-400 to-orange-600"
  }
]

const Samples = () => {
  return (
    <section id="samples" className="container mx-auto px-4 py-20 bg-secondary/20">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
          See What&apos;s Possible
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore different styles and possibilities with our AI image generation
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleImages.map((sample, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className={`aspect-square bg-gradient-to-br ${sample.color} relative`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white p-4">
                  <p className="font-medium mb-2">{sample.prompt}</p>
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {sample.style}
                  </Badge>
                </div>
              </div>
            </div>            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                &quot;{sample.prompt}&quot;
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default Samples