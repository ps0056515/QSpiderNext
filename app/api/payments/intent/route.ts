import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

/**
 * Stub for Stripe PaymentIntent creation.
 * Replace with Stripe when `STRIPE_SECRET_KEY` is configured.
 */
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { amountPaise?: number; currency?: string; courseSlug?: string; pathSlug?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const amountPaise = body.amountPaise ?? 0;
  const clientSecret = `stub_pi_${session.user.id}_${amountPaise}_${Date.now()}`;

  return NextResponse.json({
    clientSecret,
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? null,
    message:
      'Stub intent — wire Stripe PaymentIntent here and return real clientSecret.',
  });
}
