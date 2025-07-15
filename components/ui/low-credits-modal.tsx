'use client'

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, AlertCircle } from 'lucide-react'
import PaymentButton from '@/components/payments/PaymentButton'

interface LowCreditsModalProps {
  isOpen: boolean
  onClose: () => void
  currentCredits: number
}

const upgradeOptions = [
  {
    name: 'Pro',
    price: '₹49',
    period: '/month',
    description: 'Perfect for regular creators',
    features: [
      '50 images per month',
      'High quality (up to 2K)',
      'Priority processing',
      'All artistic styles',
      'Commercial license',
      'Email support'
    ],
    cta: 'Upgrade to Pro',
    popular: true,
    credits: 50
  },
  {
    name: 'Advanced',
    price: '₹99',
    period: '/month',
    description: 'For teams and high-volume usage',
    features: [
      '200 images per month',
      'Ultra-high quality (4K+)',
      'Instant processing',
      'Custom style training',
      'API access',
      'Dedicated support',
      'Team collaboration',
      'Advanced analytics'
    ],
    cta: 'Upgrade to Advanced',
    popular: false,
    credits: 200
  }
]

const LowCreditsModal = ({ isOpen, onClose, currentCredits }: LowCreditsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <AlertCircle className="w-6 h-6 text-yellow-500" />
            Low Credits Alert
          </DialogTitle>
          <DialogDescription className="text-base">
            You have {currentCredits} credit{currentCredits !== 1 ? 's' : ''} remaining. 
            Upgrade your plan to continue creating amazing images!
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {upgradeOptions.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg ring-2 ring-primary/20' : 'border-border'}`}>
              {plan.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary">
                  Recommended
                </Badge>
              )}
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>
                <CardDescription className="text-sm">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <Check className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <PaymentButton
                  planName={plan.name}
                  credits={plan.credits}
                  buttonText={plan.cta}
                  variant={plan.popular ? 'default' : 'outline'}
                />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            ✨ <strong>Pro tip:</strong> Upgrading adds credits to your existing balance. 
            Your current {currentCredits} credit{currentCredits !== 1 ? 's' : ''} will be preserved!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LowCreditsModal