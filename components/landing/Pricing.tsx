'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import { useRouter } from 'next/navigation'

const plans = [
	{
		name: 'Free',
		price: '₹0',
		period: '/month',
		description: 'Perfect for trying out PixelPrompt',
		features: [
			'5 images per month',
			'Basic quality (512x512)',
			'Standard processing time',
			'Community support'
		],
		cta: 'Get Started',
		popular: false,
		credits: 5
	},
	{
		name: 'Pro',
		price: '₹49',
		period: '/month',
		description: 'For serious creators and professionals',
		features: [
			'50 images per month',
			'High quality (up to 2K)',
			'Priority processing',
			'All artistic styles',
			'Commercial license',
			'Email support'
		],
		cta: 'Start Pro Plan',
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
		cta: 'Get Advanced Plan',
		popular: false,
		credits: 200
	}
]

export const Pricing = () => {
	const router = useRouter()
	
	const handlePlanClick = (planName: string) => {
		if (planName === 'Free') {
			router.push('/auth/signup')
		} else {
			router.push('/auth/signin')
		}
	}

	return (
		<section id="pricing" className="container mx-auto px-4 py-20 bg-secondary/20">
			<div className="text-center mb-16">
				<h2 className="text-3xl lg:text-4xl font-bold mb-4">
					Simple, Transparent Pricing
				</h2>
				<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
					Choose the plan that fits your creative needs. Upgrade or downgrade at any time.
				</p>
			</div>
			
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
				{plans.map((plan, index) => (
					<Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-2xl scale-105' : 'border-border'}`}>
						{plan.popular && (
							<Badge className="absolute top-1 left-1/2 transform -translate-x-1/2 bg-primary">
								Most Popular
							</Badge>
						)}
						<CardHeader className="text-center pb-6">
							<CardTitle className="text-2xl">{plan.name}</CardTitle>
							<div className="mt-4">
								<span className="text-4xl font-bold">{plan.price}</span>
								<span className="text-muted-foreground">{plan.period}</span>
							</div>
							<CardDescription className="text-base mt-2">
								{plan.description}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<ul className="space-y-3 mb-8">
								{plan.features.map((feature, featureIndex) => (
									<li key={featureIndex} className="flex items-center">
										<Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
										<span>{feature}</span>
									</li>
								))}
							</ul>
							<Button
								onClick={() => handlePlanClick(plan.name)}
								variant={plan.popular ? 'default' : 'outline'}
								className="w-full"
							>
								{plan.cta}
							</Button>
						</CardContent>
					</Card>
				))}
			</div>
		</section>
	)
}