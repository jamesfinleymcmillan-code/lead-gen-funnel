import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe lazily to avoid build-time errors
const getStripe = () => {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-11-17.clover',
  });
};

interface CheckoutRequestBody {
  packageName: string;
  basePrice: number;
  selectedUpsells: Array<{
    id: string;
    name: string;
    price: number;
  }>;
  hasDiscount: boolean;
  customerEmail: string;
  customerName: string;
  phone: string;
  businessName: string;
  projectDetails?: string;
  inspirationWebsite?: string;
}

export async function POST(req: NextRequest) {
  try {
    const stripe = getStripe();
    const body: CheckoutRequestBody = await req.json();

    const {
      packageName,
      basePrice,
      selectedUpsells,
      hasDiscount,
      customerEmail,
      customerName,
      phone,
      businessName,
      projectDetails,
      inspirationWebsite,
    } = body;

    // Calculate subtotal
    const upsellTotal = selectedUpsells.reduce((sum, upsell) => sum + upsell.price, 0);
    const subtotal = basePrice + upsellTotal;

    // Apply discount if active (10% off)
    const total = hasDiscount ? Math.round(subtotal * 0.9) : subtotal;
    const discountAmount = hasDiscount ? Math.round(subtotal * 0.1) : 0;

    // Build line items for Stripe
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price_data: {
          currency: 'aud',
          product_data: {
            name: `${packageName} Package`,
            description: 'Professional website development',
          },
          unit_amount: basePrice * 100, // Stripe uses cents
        },
        quantity: 1,
      },
    ];

    // Add upsells as separate line items
    selectedUpsells.forEach((upsell) => {
      lineItems.push({
        price_data: {
          currency: 'aud',
          product_data: {
            name: upsell.name,
            description: 'Add-on service',
          },
          unit_amount: upsell.price * 100,
        },
        quantity: 1,
      });
    });

    // Create discount coupon if applicable
    let discounts: Stripe.Checkout.SessionCreateParams.Discount[] | undefined;
    if (hasDiscount && discountAmount > 0) {
      // Create a one-time coupon for this session
      const coupon = await stripe.coupons.create({
        percent_off: 10,
        duration: 'once',
        name: 'Limited Time 10% Off',
      });

      discounts = [
        {
          coupon: coupon.id,
        },
      ];
    }

    // Get the base URL for redirects
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || req.headers.get('origin') || 'http://localhost:3000';

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      discounts: discounts, // Apply the 10% discount if active
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel`,
      customer_email: customerEmail,
      metadata: {
        customerName,
        phone,
        businessName,
        packageName,
        projectDetails: projectDetails || '',
        inspirationWebsite: inspirationWebsite || '',
        hasDiscount: hasDiscount.toString(),
        upsells: selectedUpsells.map(u => u.name).join(', '),
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
