export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "name": "WebDev Pro",
        "description": "Professional web development services for businesses. Custom websites, landing pages, and web applications built with Next.js.",
        "url": "https://webdevpro.dev",
        "telephone": "+61474730896",
        "email": "jamesfinleymcmillan@gmail.com",
        "priceRange": "$500 - $1800",
        "areaServed": "AU",
        "serviceType": ["Web Development", "Website Design", "Landing Page Design", "Custom Web Applications"]
      },
      {
        "@type": "Organization",
        "name": "WebDev Pro",
        "url": "https://webdevpro.dev",
        "logo": "https://webdevpro.dev/icon.svg",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+61474730896",
          "contactType": "customer service",
          "email": "jamesfinleymcmillan@gmail.com",
          "areaServed": "AU",
          "availableLanguage": "English"
        }
      },
      {
        "@type": "Product",
        "@id": "#basic-package",
        "name": "Basic Website Package",
        "description": "Perfect for small businesses and startups. Professional 3-5 page website delivered in 7 days.",
        "offers": {
          "@type": "Offer",
          "price": "500",
          "priceCurrency": "AUD",
          "availability": "https://schema.org/InStock",
          "url": "https://webdevpro.dev/#pricing",
          "priceValidUntil": "2025-12-31",
          "seller": {
            "@type": "Organization",
            "name": "WebDev Pro"
          }
        }
      },
      {
        "@type": "Product",
        "@id": "#pro-package",
        "name": "Pro Website Package",
        "description": "Ideal for growing businesses. Comprehensive website with advanced features delivered in 5 days.",
        "offers": {
          "@type": "Offer",
          "price": "1000",
          "priceCurrency": "AUD",
          "availability": "https://schema.org/InStock",
          "url": "https://webdevpro.dev/#pricing",
          "priceValidUntil": "2025-12-31",
          "seller": {
            "@type": "Organization",
            "name": "WebDev Pro"
          }
        }
      },
      {
        "@type": "Product",
        "@id": "#premium-package",
        "name": "Premium Website Package",
        "description": "For established businesses that need the best. Full-featured website delivered in 3 days.",
        "offers": {
          "@type": "Offer",
          "price": "1800",
          "priceCurrency": "AUD",
          "availability": "https://schema.org/InStock",
          "url": "https://webdevpro.dev/#pricing",
          "priceValidUntil": "2025-12-31",
          "seller": {
            "@type": "Organization",
            "name": "WebDev Pro"
          }
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
