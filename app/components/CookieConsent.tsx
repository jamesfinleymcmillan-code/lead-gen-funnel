'use client';

import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowBanner(false);
    // Optionally disable analytics here
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-6 right-6 max-w-md bg-stone-900 border border-stone-800 rounded-xl shadow-2xl p-6 z-50 backdrop-blur-sm">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-stone-100 mb-2">Cookie Notice</h3>
          <p className="text-stone-400 text-sm leading-relaxed">
            We use cookies to analyze traffic and improve your experience.{' '}
            <a href="/privacy" className="text-blue-500 hover:text-blue-400 underline">
              Learn more
            </a>
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={declineCookies}
            className="flex-1 px-4 py-2 border border-stone-700 text-stone-300 rounded-lg hover:bg-stone-800 transition-colors text-sm font-medium"
          >
            Decline
          </button>
          <button
            onClick={acceptCookies}
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
