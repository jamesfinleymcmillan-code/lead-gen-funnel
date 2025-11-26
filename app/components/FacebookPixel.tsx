'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function FacebookPixel() {
  const pixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
  const pathname = usePathname();

  useEffect(() => {
    if (pixelId && typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'PageView');
    }
  }, [pathname, pixelId]);

  if (!pixelId) {
    return null;
  }

  return (
    <>
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
        `}
      </Script>
    </>
  );
}

// Helper function to track custom Facebook Pixel events
export const trackFBEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName, eventParams);
  }
};

// Track specific e-commerce events
export const trackInitiateCheckout = (packageName: string, value: number) => {
  trackFBEvent('InitiateCheckout', {
    content_name: packageName,
    value: value,
    currency: 'AUD',
  });
};

export const trackPurchase = (value: number, orderId: string) => {
  trackFBEvent('Purchase', {
    value: value,
    currency: 'AUD',
    content_type: 'product',
    content_ids: [orderId],
  });
};

export const trackAddToCart = (packageName: string, value: number) => {
  trackFBEvent('AddToCart', {
    content_name: packageName,
    value: value,
    currency: 'AUD',
  });
};
