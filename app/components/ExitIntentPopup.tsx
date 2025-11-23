'use client';

import { useEffect, useState } from 'react';

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Check if mouse is leaving from the top of the page
      if (e.clientY <= 0 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown]);

  if (!isOpen) return null;

  const scrollToPricing = () => {
    const element = document.getElementById('pricing');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-gradient-to-br from-stone-900 to-stone-950 border-2 border-blue-500 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 md:p-12 relative animate-fade-in shadow-2xl my-8">
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-stone-400 hover:text-white text-2xl font-bold w-10 h-10 flex items-center justify-center hover:bg-stone-800 rounded-lg transition-colors"
        >
          ×
        </button>

        {/* Content */}
        <div className="text-center">
          <div className="text-6xl mb-6">⏰</div>
          <h2 className="text-3xl md:text-4xl font-bold text-stone-100 mb-4">
            Wait! Don't Miss This <span className="text-blue-500">Limited-Time Offer</span>
          </h2>
          <p className="text-xl text-stone-300 mb-8">
            Book your website this week and get <span className="text-blue-500 font-bold">10% off</span> any package + a FREE SEO setup (worth $200)!
          </p>

          {/* Benefits */}
          <div className="bg-stone-950 border border-stone-800 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-bold text-stone-100 mb-4 text-center">What You'll Get:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-stone-300">Professional website delivered in 3-7 days</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-stone-300">10% discount (save up to $180!)</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-stone-300">FREE SEO setup + Google Analytics ($200 value)</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-stone-300">Mobile-responsive design guaranteed</span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <button
            onClick={scrollToPricing}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-5 rounded-lg font-bold text-xl transition-all hover:scale-105 shadow-2xl shadow-blue-600/30 mb-4"
          >
            Claim My 10% Discount Now →
          </button>

          <p className="text-stone-500 text-sm">
            This offer expires in 48 hours • Only 3 spots remaining
          </p>
        </div>
      </div>
    </div>
  );
}
