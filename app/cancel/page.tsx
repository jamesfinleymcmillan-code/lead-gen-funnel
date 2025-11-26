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
          We Understand
        </h1>
        <p className="text-xl text-stone-300 mb-4">
          Your payment was not processed - no charges were made.
        </p>
        <p className="text-lg text-stone-400 mb-8">
          Big decisions take time. We're here when you're ready.
        </p>

        {/* Special Offer */}
        <div className="bg-gradient-to-br from-blue-600/20 to-blue-700/20 border-2 border-blue-500 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
            </svg>
            <h3 className="text-xl font-bold text-blue-300">Wait! Before you go...</h3>
          </div>
          <p className="text-stone-100 text-lg font-semibold text-center mb-2">
            Get an extra 5% off (total 15% savings!)
          </p>
          <p className="text-stone-300 text-sm text-center mb-4">
            We noticed you hesitated. As a one-time offer, we'll add an extra 5% discount on top of the current promotion. Book now and save even more.
          </p>
          <Link
            href="/#pricing"
            className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-bold text-center transition-all hover:scale-105"
          >
            Claim Extra Discount →
          </Link>
        </div>

        {/* Reassurance */}
        <div className="bg-stone-950 border border-stone-800 rounded-lg p-6 mb-6">
          <p className="text-stone-300 mb-4 text-center font-semibold">
            Common questions we can help with:
          </p>
          <div className="text-left space-y-3 text-stone-400 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span>All payments are secured by Stripe with 256-bit SSL encryption</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span>Money-back guarantee if work doesn't start within 24 hours</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span>Not sure which package? We can discuss your needs first</span>
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
