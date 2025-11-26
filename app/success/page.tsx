'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { trackPurchase } from '../components/FacebookPixel';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Track purchase conversion
    if (sessionId) {
      trackPurchase(1000, sessionId); // Value will be dynamic based on Stripe webhook
    }

    // Trigger confetti celebration!
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 to-stone-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-stone-900 border-2 border-blue-500 rounded-2xl p-8 md:p-12 text-center shadow-2xl">
        {/* Success Icon */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto bg-blue-500 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-4 animate-fade-in">
          Welcome Aboard! 🎉
        </h1>
        <p className="text-2xl text-stone-100 font-semibold mb-2">
          Your payment was successful
        </p>
        <p className="text-lg text-stone-400 mb-8">
          We're excited to build something amazing for your business
        </p>

        {/* Order Confirmation */}
        <div className="bg-stone-950 border border-stone-800 rounded-lg p-6 mb-8 text-left">
          <h2 className="text-xl font-bold text-stone-100 mb-4 text-center">
            What Happens Next?
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                1
              </div>
              <div>
                <h3 className="text-stone-100 font-semibold">Email Confirmation</h3>
                <p className="text-stone-400 text-sm">
                  You'll receive a payment receipt from Stripe within 5 minutes at the email you provided.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                2
              </div>
              <div>
                <h3 className="text-stone-100 font-semibold">Project Kickoff</h3>
                <p className="text-stone-400 text-sm">
                  We'll contact you within 24 hours to schedule a kickoff call and gather project requirements.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                3
              </div>
              <div>
                <h3 className="text-stone-100 font-semibold">Development Starts</h3>
                <p className="text-stone-400 text-sm">
                  Your professional website will be completed within 3-7 business days (or faster if you selected rush delivery).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Session ID (for reference) */}
        {sessionId && (
          <p className="text-stone-500 text-sm mb-6">
            Order ID: {sessionId.slice(0, 20)}...
          </p>
        )}

        {/* Contact Info */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 mb-8">
          <p className="text-stone-300 mb-2">
            Questions? Contact us:
          </p>
          <a
            href="mailto:jamesfinleymcmillan@gmail.com"
            className="text-blue-400 hover:text-blue-300 font-semibold"
          >
            jamesfinleymcmillan@gmail.com
          </a>
        </div>

        {/* Return Home Button */}
        <Link
          href="/"
          className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 shadow-xl"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-b from-stone-950 to-stone-900 flex items-center justify-center"><div className="text-stone-300">Loading...</div></div>}>
      <SuccessContent />
    </Suspense>
  );
}
