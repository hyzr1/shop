import Stripe from 'stripe'

let stripeClient: Stripe | undefined

export function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is required for billing requests')
  }

  stripeClient ??= new Stripe(secretKey, {
    apiVersion: '2026-05-27.dahlia',
  })

  return stripeClient
}

export const PLAN = {
  name: 'Hyzr Pro',
  price: 2000, // $20.00 in cents
  currency: 'usd',
  interval: 'month' as const,
  trialDays: 30,
}
