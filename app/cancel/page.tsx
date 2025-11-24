'use client';

import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 to-stone-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-stone-900 border-2 border-stone-700 rounded-2xl p-8 md:p-12 text-center shadow-2xl">
        {/* Cancel Icon */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto bg-stone-700 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-stone-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

        {/* Cancel Message */}
        <h1 className="text-4xl md:text-5xl font-bold text-stone-100 mb-4">
          Payment Cancelled
        </h1>
        <p className="text-xl text-stone-300 mb-8">
          No worries! Your payment was not processed.
        </p>

        {/* Reassurance */}
        <div className="bg-stone-950 border border-stone-800 rounded-lg p-6 mb-8">
          <p className="text-stone-300 mb-4">
            You haven't been charged anything. If you had any concerns or questions during checkout, we're here to help.
          </p>
          <div className="text-left space-y-3 text-stone-400 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span>Your information has been saved - you can pick up where you left off</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span>All payments are secured by Stripe with 256-bit SSL encryption</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span>Need to discuss the project first? We're happy to answer any questions</span>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 mb-8">
          <p className="text-stone-300 mb-2">
            Have questions before purchasing?
          </p>
          <a
            href="mailto:jamesfinleymcmillan@gmail.com"
            className="text-blue-400 hover:text-blue-300 font-semibold block mb-3"
          >
            jamesfinleymcmillan@gmail.com
          </a>
          <p className="text-stone-400 text-sm">
            We typically respond within 2 hours during business hours
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/#pricing"
            className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 shadow-xl"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="inline-block bg-stone-800 hover:bg-stone-700 text-stone-100 px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 border border-stone-700"
          >
            Return to Home
          </Link>
        </div>

        <p className="text-stone-500 text-sm mt-8">
          Still interested? The limited-time discount may still be available!
        </p>
      </div>
    </div>
  );
}
