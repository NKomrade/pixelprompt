import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Coins, AlertTriangle } from 'lucide-react'

interface CreditBadgeProps {
  credits: number
  onClick?: () => void
}

const CreditBadge = ({ credits, onClick }: CreditBadgeProps) => {
  const isLow = credits < 3
  
  return (
    <Badge 
      variant={isLow ? "destructive" : "outline"} 
      className={`flex items-center gap-1 px-3 py-1 cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground ${
        isLow ? 'animate-pulse' : ''
      }`}
      onClick={onClick}
    >
      {isLow ? (
        <AlertTriangle className="w-4 h-4" />
      ) : (
        <Coins className="w-4 h-4 text-yellow-500" />
      )}
      <span className="font-medium">{credits}</span>
      {isLow && <span className="text-xs ml-1">Low!</span>}
    </Badge>
  )
}

export default CreditBadge