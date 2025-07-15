'use client'

import { useState } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, AlertTriangle, CreditCard } from 'lucide-react'
import PaymentButton from '@/components/payments/PaymentButton'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface LowCreditsWarningProps {
  credits: number
}

const upgradePlans = [
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

export default function LowCreditsWarning({ credits }: LowCreditsWarningProps) {
  const [showUpgrade, setShowUpgrade] = useState(false)

  if (credits >= 3) return null

  return (
    <>
      <Alert className="mb-6 border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="flex items-center justify-between">
          <span className="text-yellow-800 dark:text-yellow-200">
            You have {credits} credits remaining. Add more credits to continue generating images.
          </span>
          <Dialog open={showUpgrade} onOpenChange={setShowUpgrade}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="ml-4">
                <CreditCard className="w-4 h-4 mr-2" />
                Add Credits
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Upgrade Your Plan</DialogTitle>
                <DialogDescription>
                  Choose a plan to add more credits and continue creating amazing images
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {upgradePlans.map((plan, index) => (
                  <Card 
                    key={index} 
                    className={`relative ${plan.popular ? 'border-primary shadow-lg' : 'border-border'}`}
                  >
                    {plan.popular && (
                      <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary">
                        Most Popular
                      </Badge>
                    )}
                    <CardHeader className="text-center pb-4">
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                      <div className="mt-2">
                        <span className="text-3xl font-bold">{plan.price}</span>
                        <span className="text-muted-foreground">{plan.period}</span>
                      </div>
                      <CardDescription className="text-sm">
                        {plan.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-6 text-sm">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <Check className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <PaymentButton
                        planName={plan.name}
                        planPrice={plan.price}
                        credits={plan.credits}
                        buttonText={plan.cta}
                        variant={plan.popular ? 'default' : 'outline'}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </AlertDescription>
      </Alert>
    </>
  )
}