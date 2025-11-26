'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // You could log the error to an error reporting service here
  }, [error]);

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-stone-100 mb-4">Something went wrong</h1>
          <p className="text-stone-400 mb-8">
            We encountered an unexpected error. Don't worry, we're on it!
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all hover:scale-105"
          >
            Try Again
          </button>
          <a
            href="/"
            className="block w-full border border-stone-700 text-stone-300 py-3 rounded-lg hover:bg-stone-800 transition-colors font-medium"
          >
            Go Home
          </a>
        </div>

        <p className="mt-8 text-stone-500 text-sm">
          If the problem persists, please{' '}
          <a href="mailto:jamesfinleymcmillan@gmail.com" className="text-blue-500 hover:text-blue-400">
            contact us
          </a>
        </p>
      </div>
    </div>
  );
}
