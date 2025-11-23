'use client';

import { useState, useEffect } from 'react';
import CountdownTimer, { isDiscountActive } from './CountdownTimer';
import { trackEvent } from './GoogleAnalytics';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageName: string;
  basePrice: number;
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

export default function CheckoutModal({ isOpen, onClose, packageName, basePrice }: CheckoutModalProps) {
  const [selectedUpsells, setSelectedUpsells] = useState<string[]>([]);
  const [hasDiscount, setHasDiscount] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    projectDetails: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

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
    if (hasDiscount) {
      return Math.round(subtotal * 0.9); // 10% off
    }
    return subtotal;
  };

  const getDiscountAmount = () => {
    if (!hasDiscount) return 0;
    const subtotal = calculateSubtotal();
    return Math.round(subtotal * 0.1); // 10% discount amount
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Here you would integrate with Stripe
    // For now, we'll send to Google Sheets and show confirmation
    const orderData = {
      ...formData,
      package: packageName,
      basePrice,
      selectedUpsells: selectedUpsells.map(id =>
        upsells.find(u => u.id === id)?.name
      ),
      totalPrice: calculateTotal(),
      timestamp: new Date().toISOString()
    };

    try {
      // Send to Google Sheets
      const scriptURL = 'https://script.google.com/macros/s/AKfycbzAqZ_FdzNB452eZ2bcSqGn3w0742xgzvZMGQ7Yjb_L2V95tX9YK3Y8zHfzcmOlprPUAQ/exec';

      await fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify(orderData),
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors'
      });

      // Track form submission in GA4
      trackEvent('form_submitted', {
        package: packageName,
        total_price: calculateTotal(),
        has_discount: hasDiscount,
        upsells: selectedUpsells.join(',')
      });

      // Show success message or redirect to payment
      alert(`Order received! Total: $${calculateTotal()}. You'll receive a Stripe payment link via email within 5 minutes.`);
      onClose();

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        businessName: '',
        projectDetails: ''
      });
      setSelectedUpsells([]);
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again or email jamesfinleymcmillan@gmail.com');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-stone-900 border-2 border-blue-500/50 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl my-8">
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
                  className={`flex items-start gap-4 p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedUpsells.includes(upsell.id)
                      ? 'bg-blue-500/10 border-blue-500'
                      : 'bg-stone-950 border-stone-800 hover:border-stone-700'
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
                  className="w-full px-4 py-3 bg-stone-950 border border-stone-700 rounded-lg text-stone-100 focus:outline-none focus:border-blue-600 transition-colors"
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
                  className="w-full px-4 py-3 bg-stone-950 border border-stone-700 rounded-lg text-stone-100 focus:outline-none focus:border-blue-600 transition-colors"
                  placeholder="john@example.com"
                />
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
                  className="w-full px-4 py-3 bg-stone-950 border border-stone-700 rounded-lg text-stone-100 focus:outline-none focus:border-blue-600 transition-colors"
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
                  className="w-full px-4 py-3 bg-stone-950 border border-stone-700 rounded-lg text-stone-100 focus:outline-none focus:border-blue-600 transition-colors"
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
                className="w-full px-4 py-3 bg-stone-950 border border-stone-700 rounded-lg text-stone-100 focus:outline-none focus:border-blue-600 transition-colors resize-none"
                placeholder="Tell us about your business, what features you need, color preferences, etc."
              />
            </div>
          </div>

          {/* Total and Submit */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-lg">
            {/* Countdown Timer (if discount active) */}
            {hasDiscount && (
              <div className="bg-white/10 border border-white/20 rounded-lg p-4 mb-4 text-center">
                <p className="text-emerald-50 text-sm mb-2">🔥 Limited Time Offer!</p>
                <p className="text-white font-bold text-lg mb-2">10% OFF expires in:</p>
                <CountdownTimer
                  className="text-3xl"
                  onExpire={() => setHasDiscount(false)}
                />
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
                  <span>10% Discount:</span>
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
              className="w-full bg-white hover:bg-emerald-50 text-blue-700 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isProcessing ? 'Processing...' : 'Secure My Spot Now'}
            </button>
            <p className="text-center text-emerald-50 text-sm mt-4">
              🔒 You'll receive a secure Stripe payment link via email within 5 minutes
            </p>
            <p className="text-center text-emerald-100 text-xs mt-2">
              Full payment upfront • Work starts immediately after payment
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
