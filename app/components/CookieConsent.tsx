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
    <div className="fixed bottom-0 left-0 right-0 bg-stone-900 border-t-2 border-blue-600 p-6 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-stone-100 mb-2">We use cookies</h3>
            <p className="text-stone-300 text-sm leading-relaxed">
              We use cookies and similar technologies to analyze website traffic and improve your experience.
              By clicking "Accept", you consent to our use of cookies.{' '}
              <a href="/privacy" className="text-blue-500 hover:text-blue-400 underline">
                Learn more
              </a>
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={declineCookies}
              className="px-6 py-2.5 border border-stone-700 text-stone-300 rounded-lg hover:bg-stone-800 transition-colors font-medium"
            >
              Decline
            </button>
            <button
              onClick={acceptCookies}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium shadow-lg shadow-blue-600/20"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
