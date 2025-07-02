import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Coins } from 'lucide-react'

interface CreditBadgeProps {
  credits: number
}

const CreditBadge = ({ credits }: CreditBadgeProps) => {
  return (
    <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
      <Coins className="w-4 h-4 text-yellow-500" />
      <span className="font-medium">{credits}</span>
    </Badge>
  )
}

export default CreditBadge