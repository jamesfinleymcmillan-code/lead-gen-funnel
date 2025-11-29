'use client';

import { useState, useEffect } from 'react';
import CountdownTimer, { isDiscountActive } from './CountdownTimer';
import { trackEvent } from './GoogleAnalytics';
import { trackInitiateCheckout } from './FacebookPixel';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageName: string;
  basePrice: number;
  hasRecoveryDiscount?: boolean;
}

interface Upsell {
  id: string;
  name: string;
  description: string;
  priceRange: string;
  price: number;
}

const upsells: Upsell[] = [
  {
    id: 'logo',
    name: 'Professional Logo Design',
    description: 'Custom logo design with 3 revisions',
    priceRange: '$200-300',
    price: 250
  },
  {
    id: 'rush',
    name: 'Rush Delivery',
    description: 'Get your website completed in half the time',
    priceRange: '$300-500',
    price: 400
  },
  {
    id: 'content',
    name: 'Professional Content Writing',
    description: 'SEO-optimized copy for all pages',
    priceRange: '$150-300',
    price: 225
  },
  {
    id: 'seo',
    name: 'Advanced SEO Package',
    description: 'Full SEO optimization + Google Analytics setup',
    priceRange: '$200-400',
    price: 300
  }
];

export default function CheckoutModal({ isOpen, onClose, packageName, basePrice, hasRecoveryDiscount = false }: CheckoutModalProps) {
  const [selectedUpsells, setSelectedUpsells] = useState<string[]>([]);
  const [hasDiscount, setHasDiscount] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    projectDetails: '',
    inspirationWebsite: '',
    website: '' // honeypot field
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [emailError, setEmailError] = useState('');

  // Check if discount is active on mount and when modal opens
  useEffect(() => {
    if (isOpen) {
      setHasDiscount(isDiscountActive());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleUpsell = (upsellId: string) => {
    setSelectedUpsells(prev =>
      prev.includes(upsellId)
        ? prev.filter(id => id !== upsellId)
        : [...prev, upsellId]
    );
  };

  const calculateSubtotal = () => {
    const upsellTotal = upsells
      .filter(u => selectedUpsells.includes(u.id))
      .reduce((sum, u) => sum + u.price, 0);
    return basePrice + upsellTotal;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    if (hasDiscount && hasRecoveryDiscount) {
      return Math.round(subtotal * 0.85); // 15% off (10% + 5% recovery)
    } else if (hasDiscount) {
      return Math.round(subtotal * 0.9); // 10% off
    }
    return subtotal;
  };

  const getDiscountAmount = () => {
    if (!hasDiscount) return 0;
    const subtotal = calculateSubtotal();
    if (hasRecoveryDiscount) {
      return Math.round(subtotal * 0.15); // 15% discount amount
    }
    return Math.round(subtotal * 0.1); // 10% discount amount
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot spam protection
    if (formData.website) {
      // Bot detected - silently reject
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    setEmailError('');

    setIsProcessing(true);

    // Prepare upsell data for Stripe
    const selectedUpsellData = selectedUpsells.map(id => {
      const upsell = upsells.find(u => u.id === id);
      return {
        id: upsell!.id,
        name: upsell!.name,
        price: upsell!.price
      };
    });

    try {
      // Track checkout initiation in GA4
      trackEvent('begin_checkout', {
        package: packageName,
        total_price: calculateTotal(),
        has_discount: hasDiscount,
        upsells: selectedUpsells.join(',')
      });

      // Track checkout initiation in Facebook Pixel
      trackInitiateCheckout(packageName, calculateTotal());

      // Send to Abandoned Checkouts sheet (for follow-up if they don't complete payment)
      const leadData = {
        ...formData,
        package: packageName,
        basePrice,
        selectedUpsells: selectedUpsells.map(id =>
          upsells.find(u => u.id === id)?.name
        ),
        totalPrice: calculateTotal(),
        timestamp: new Date().toISOString()
      };

      const leadsURL = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_LEADS_URL;
      if (leadsURL) {
        fetch(leadsURL, {
          method: 'POST',
          body: JSON.stringify(leadData),
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'no-cors'
        }).catch(err => console.error('Leads tracking error:', err));
      }

      // Create Stripe Checkout Session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packageName,
          basePrice,
          selectedUpsells: selectedUpsellData,
          hasDiscount,
          hasRecoveryDiscount,
          customerEmail: formData.email,
          customerName: formData.name,
          phone: formData.phone,
          businessName: formData.businessName,
          projectDetails: formData.projectDetails,
          inspirationWebsite: formData.inspirationWebsite,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();

      // Redirect to Stripe Checkout using the session URL
      if (!url) {
        throw new Error('No checkout URL returned');
      }

      // Disable exit intent popup during redirect to Stripe
      sessionStorage.setItem('redirecting_to_stripe', 'true');

      window.location.href = url;

      // Note: User will be redirected to Stripe, so code below won't execute
      // Reset happens when they return from success page
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again or email jamesfinleymcmillan@gmail.com');
      setIsProcessing(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear email error when user types
    if (e.target.name === 'email' && emailError) {
      setEmailError('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto touch-pan-y overscroll-contain">
      <div className="min-h-full flex items-start justify-center p-4 md:p-6 pt-8">
        <div className="bg-stone-900 border-2 border-blue-500/50 rounded-2xl max-w-4xl w-full shadow-2xl mb-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-t-2xl flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-white">{packageName} Package</h2>
            <p className="text-emerald-50 mt-1">Secure your spot now - Limited availability</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-2xl font-bold w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8">
          {/* Honeypot field - hidden from users */}
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            style={{ position: 'absolute', left: '-9999px' }}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          {/* Package Summary */}
          <div className="bg-stone-950 border border-stone-800 rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-stone-300 text-lg">Base Package</span>
              <span className="text-2xl font-bold text-blue-500">${basePrice}</span>
            </div>
          </div>

          {/* Upsells */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-stone-100 mb-4 flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              Boost Your Website (Optional Add-ons)
            </h3>
            <div className="space-y-3">
              {upsells.map((upsell) => (
                <label
                  key={upsell.id}
                  className={`flex items-start gap-4 p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedUpsells.includes(upsell.id)
                      ? 'bg-blue-500/10 border-blue-500 scale-[1.02] shadow-lg shadow-blue-500/20'
                      : 'bg-stone-950 border-stone-800 hover:border-stone-700 hover:scale-[1.01] hover:shadow-md'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedUpsells.includes(upsell.id)}
                    onChange={() => toggleUpsell(upsell.id)}
                    className="mt-1 w-5 h-5 rounded border-stone-700 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-stone-100">{upsell.name}</div>
                        <div className="text-sm text-stone-400 mt-1">{upsell.description}</div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="font-bold text-blue-500">+${upsell.price}</div>
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-stone-100 mb-4">Your Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-stone-950 border border-stone-700 rounded-lg text-stone-100 focus:outline-none focus:border-blue-600 transition-colors text-base"
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-stone-950 border rounded-lg text-stone-100 focus:outline-none transition-colors ${
                    emailError ? 'border-red-500 focus:border-red-500' : 'border-stone-700 focus:border-blue-600'
                  }`}
                  placeholder="john@example.com"
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-1">{emailError}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-300 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-stone-950 border border-stone-700 rounded-lg text-stone-100 focus:outline-none focus:border-blue-600 transition-colors text-base"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-300 mb-2">
                  Business Name *
                </label>
                <input
                  type="text"
                  name="businessName"
                  required
                  value={formData.businessName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-stone-950 border border-stone-700 rounded-lg text-stone-100 focus:outline-none focus:border-blue-600 transition-colors text-base"
                  placeholder="Your Business LLC"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-stone-300 mb-2">
                Project Details (Optional)
              </label>
              <textarea
                name="projectDetails"
                value={formData.projectDetails}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-stone-950 border border-stone-700 rounded-lg text-stone-100 focus:outline-none focus:border-blue-600 transition-colors resize-none text-base"
                placeholder="Tell us about your business, what features you need, color preferences, etc."
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-stone-300 mb-2">
                Inspiration Website (Optional)
              </label>
              <input
                type="url"
                name="inspirationWebsite"
                value={formData.inspirationWebsite}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-stone-950 border border-stone-700 rounded-lg text-stone-100 focus:outline-none focus:border-blue-600 transition-colors"
                placeholder="https://example.com"
              />
              <p className="text-xs text-stone-500 mt-2">Share a link to a website whose design you love - helps us match your style</p>
            </div>
          </div>

          {/* Total and Submit */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-lg">
            {/* Countdown Timer (if discount active) */}
            {hasDiscount && (
              <div className="bg-white/10 border border-white/20 rounded-lg p-4 mb-4 text-center">
                <p className="text-emerald-50 text-sm mb-2">{hasRecoveryDiscount ? '💰 EXTRA Savings Applied!' : '🔥 Limited Time Offer!'}</p>
                <p className="text-white font-bold text-lg mb-2">{hasRecoveryDiscount ? '15% OFF expires in:' : '10% OFF expires in:'}</p>
                <CountdownTimer
                  className="text-3xl"
                  onExpire={() => setHasDiscount(false)}
                />
                {hasRecoveryDiscount && (
                  <p className="text-emerald-100 text-xs mt-2">You came back! Here's your extra 5% off</p>
                )}
              </div>
            )}

            {/* Pricing Breakdown */}
            <div className="space-y-2 mb-4">
              {hasDiscount && (
                <div className="flex justify-between items-center text-emerald-50">
                  <span>Subtotal:</span>
                  <span className="line-through">${calculateSubtotal()}</span>
                </div>
              )}
              {hasDiscount && (
                <div className="flex justify-between items-center text-emerald-100 font-semibold">
                  <span>{hasRecoveryDiscount ? '15% Discount:' : '10% Discount:'}</span>
                  <span>-${getDiscountAmount()}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-2 border-t border-white/20">
                <span className="text-emerald-50 text-lg">Total Investment</span>
                <span className="text-4xl font-bold text-white">${calculateTotal()}</span>
              </div>
              {hasDiscount && (
                <p className="text-emerald-100 text-center text-sm font-semibold">
                  You save ${getDiscountAmount()}!
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-white hover:bg-emerald-50 text-blue-700 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 animate-pulse-subtle"
              aria-label={isProcessing ? "Processing checkout" : "Continue to secure checkout"}
            >
              {isProcessing && (
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {isProcessing ? 'Redirecting to secure checkout...' : 'Continue to Secure Checkout →'}
            </button>

            {/* Trust Badges */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="flex items-center justify-center gap-6 mb-3">
                <div className="flex items-center gap-2 text-emerald-50 text-xs">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span>SSL Secure</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-50 text-xs">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Stripe Verified</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-50 text-xs">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                  <span>Money-Back Guarantee</span>
                </div>
              </div>
              <p className="text-center text-emerald-100 text-xs">
                Full payment upfront • Work starts immediately • 256-bit encryption
              </p>
            </div>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}
