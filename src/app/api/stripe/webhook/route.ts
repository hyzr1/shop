import { getStripe } from '@/lib/stripe'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const stripe = getStripe()
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const serviceClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const sub = (event.data.object as Stripe.Subscription)
  const userId = sub.metadata?.supabase_user_id

  if (!userId) return NextResponse.json({ ok: true })

  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      await serviceClient.from('profiles').update({
        stripe_subscription_id: sub.id,
        subscription_status: sub.status,
        trial_ends_at: sub.trial_end ? new Date(sub.trial_end * 1000).toISOString() : null,
      }).eq('id', userId)
      break

    case 'customer.subscription.deleted':
      await serviceClient.from('profiles').update({
        subscription_status: 'canceled',
        stripe_subscription_id: null,
      }).eq('id', userId)
      break
  }

  return NextResponse.json({ ok: true })
}
