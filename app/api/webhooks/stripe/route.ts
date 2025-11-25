import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe lazily to avoid build-time errors
const getStripe = () => {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-11-17.clover',
  });
};

export async function POST(req: NextRequest) {
  try {
    const stripe = getStripe();
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature || !webhookSecret) {
      return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 });
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Handle the event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      // Extract customer data from metadata
      const {
        customerName,
        phone,
        businessName,
        packageName,
        basePrice,
        projectDetails,
        inspirationWebsite,
        hasDiscount,
        upsells,
      } = session.metadata || {};

      // Get payment amount
      const amountPaid = session.amount_total ? session.amount_total / 100 : 0; // Convert from cents

      // Prepare data for Google Sheets
      const orderData = {
        name: customerName,
        email: session.customer_email,
        phone: phone,
        businessName: businessName,
        package: packageName,
        basePrice: basePrice || '',
        selectedUpsells: upsells ? upsells.split(', ') : [],
        totalPrice: amountPaid,
        projectDetails: projectDetails,
        inspirationWebsite: inspirationWebsite,
        paymentStatus: 'PAID',
        stripeSessionId: session.id,
        timestamp: new Date().toISOString(),
      };

      // Send to Google Sheets (Orders sheet - for paid orders only)
      const scriptURL = process.env.GOOGLE_SHEETS_ORDERS_URL || 'https://script.google.com/macros/s/AKfycbz2k02KLTWwsAuJ7Jm0PkAaZzqLyaQzO7RHvMjzIgeEIOBG-830mIvFw8hJb1f8nke5/exec';

      try {
        await fetch(scriptURL, {
          method: 'POST',
          body: JSON.stringify(orderData),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error('Error sending to Google Sheets:', error);
        // Don't fail the webhook if Google Sheets fails
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
