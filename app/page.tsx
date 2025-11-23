'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import CheckoutModal from './components/CheckoutModal';
import ExitIntentPopup from './components/ExitIntentPopup';
import { getVariant, type Variant } from './utils/abtest';
import { trackEvent, setUserProperty } from './components/GoogleAnalytics';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState({ name: '', price: 0 });
  const [variant, setVariant] = useState<Variant>('variant_a');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessType: '',
    websiteUrl: '',
    budget: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set A/B test variant and track in GA4
  useEffect(() => {
    const userVariant = getVariant();
    setVariant(userVariant);
    setUserProperty('variant', userVariant);
    trackEvent('ab_test_variant_view', { variant: userVariant });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    // Google Apps Script URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzAqZ_FdzNB452eZ2bcSqGn3w0742xgzvZMGQ7Yjb_L2V95tX9YK3Y8zHfzcmOlprPUAQ/exec';

    try {
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors'
      });

      // Clear form data after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        businessType: '',
        websiteUrl: '',
        budget: ''
      });
      setFormSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      businessType: '',
      websiteUrl: '',
      budget: ''
    });
    setFormSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 overflow-x-hidden">
      {/* Urgency Banner (A/B Test) */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 text-center">
        <p className="text-sm md:text-base font-semibold">
          {variant === 'variant_a' ? (
            <>🔥 Limited Time: Only <span className="bg-white/20 px-2 py-1 rounded">3 spots left</span> this month • Book this week and save 10%</>
          ) : (
            <>🔥 Limited Time: Only <span className="bg-white/20 px-2 py-1 rounded">2 spots left</span> this month • Book this week and save 10%</>
          )}
        </p>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-12 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-stone-950/95 backdrop-blur-lg border-b border-stone-800' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-stone-100 tracking-tight">
              <span className="text-blue-500">Web</span>Dev Pro
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('work')} className="text-stone-300 hover:text-stone-100 transition-colors">
                Portfolio
              </button>
              <button onClick={() => scrollToSection('pricing')} className="text-stone-300 hover:text-stone-100 transition-colors">
                Pricing
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-stone-300 hover:text-stone-100 transition-colors">
                Contact
              </button>
              <button onClick={() => scrollToSection('pricing')} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition-all hover:scale-105 font-medium shadow-lg shadow-blue-600/20">
                Start Project
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-stone-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pt-4 pb-2 space-y-3">
              <button onClick={() => scrollToSection('work')} className="block w-full text-left text-stone-300 hover:text-stone-100 transition-colors py-2">
                Portfolio
              </button>
              <button onClick={() => scrollToSection('pricing')} className="block w-full text-left text-stone-300 hover:text-stone-100 transition-colors py-2">
                Pricing
              </button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left text-stone-300 hover:text-stone-100 transition-colors py-2">
                Contact
              </button>
              <button onClick={() => scrollToSection('pricing')} className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition-colors font-medium mt-2">
                Start Project
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative text-center">
          <div className="inline-block mb-6 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full">
            <span className="text-blue-400 text-sm font-medium">Professional Web Development Services</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-stone-100 mb-6 leading-tight max-w-5xl mx-auto">
            Get A Professional Website That <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Actually Brings You Customers</span>
          </h1>

          <p className="text-xl md:text-2xl text-stone-300 mb-10 leading-relaxed max-w-3xl mx-auto">
            Custom websites and web applications built with modern technology. Fast delivery, clean code, and results you can measure.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            <button onClick={() => scrollToSection('pricing')} className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-lg transition-all hover:scale-105 font-bold text-xl shadow-2xl shadow-blue-600/30">
              Start Your Project Now →
            </button>
          </div>
          <div className="text-center mb-16">
            <button onClick={() => scrollToSection('work')} className="text-stone-400 hover:text-blue-500 transition-colors text-sm underline">
              View case studies first
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-500 mb-2">5+</div>
              <div className="text-sm md:text-base text-stone-400">Projects Completed</div>
            </div>
            <div className="text-center border-l border-r border-stone-800">
              <div className="text-4xl md:text-5xl font-bold text-blue-500 mb-2">100%</div>
              <div className="text-sm md:text-base text-stone-400">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-500 mb-2">Fast</div>
              <div className="text-sm md:text-base text-stone-400">Turnaround</div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Section - Net Money */}
      <section id="work" className="py-24 px-6 bg-stone-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-100 mb-4">
              Featured <span className="text-blue-500">Case Study</span>
            </h2>
            <p className="text-xl text-stone-400">Real results from real projects</p>
          </div>

          <div className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left Side - Project Details */}
              <div className="p-8 md:p-12">
                <div className="inline-block mb-4 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
                  <span className="text-blue-400 text-sm font-medium">Net Money Group</span>
                </div>

                <h3 className="text-3xl font-bold text-stone-100 mb-6">Exclusive Networking Platform</h3>

                <div className="space-y-6 mb-8">
                  {/* Before */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-red-500 font-bold">!</span>
                      </div>
                      <h4 className="text-lg font-semibold text-stone-100">Before</h4>
                    </div>
                    <p className="text-stone-400 pl-10">Client needed exclusive networking site for high-net-worth entrepreneurs but had no online presence or lead capture system.</p>
                  </div>

                  {/* After */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-semibold text-stone-100">After</h4>
                    </div>
                    <p className="text-stone-400 pl-10">Professional landing page with working application form delivered in 48 hours. Now capturing qualified leads 24/7.</p>
                  </div>

                  {/* Results */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-blue-500 font-bold">✓</span>
                      </div>
                      <h4 className="text-lg font-semibold text-stone-100">Results</h4>
                    </div>
                    <div className="grid grid-cols-3 gap-3 pl-10">
                      <div className="bg-stone-950 border border-stone-800 rounded-lg p-3 text-center">
                        <div className="text-xs text-stone-500 mb-1">Tech Stack</div>
                        <div className="text-sm font-semibold text-blue-400">Next.js</div>
                      </div>
                      <div className="bg-stone-950 border border-stone-800 rounded-lg p-3 text-center">
                        <div className="text-xs text-stone-500 mb-1">Integration</div>
                        <div className="text-sm font-semibold text-blue-400">Google Sheets</div>
                      </div>
                      <div className="bg-stone-950 border border-stone-800 rounded-lg p-3 text-center">
                        <div className="text-xs text-stone-500 mb-1">Design</div>
                        <div className="text-sm font-semibold text-blue-400">Mobile First</div>
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href="https://net-money-group.web.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 font-medium transition-colors"
                >
                  View Live Site
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              {/* Right Side - Screenshot */}
              <div className="bg-gradient-to-br from-stone-800 to-stone-900 p-8 md:p-12 flex items-center justify-center">
                <div className="w-full aspect-video bg-stone-950 border-2 border-stone-700 rounded-lg overflow-hidden relative hover:border-blue-500/50 transition-colors">
                  <Image
                    src="/net-money-screenshot.png"
                    alt="Net Money Group website screenshot - exclusive networking platform"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-100 mb-4">
              What <span className="text-blue-500">Clients Say</span>
            </h2>
            <p className="text-xl text-stone-400">Real feedback from real businesses</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-stone-900 border border-stone-800 rounded-xl p-8 hover:border-blue-500/50 transition-all">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-stone-300 mb-6 leading-relaxed">
                "Exactly what I needed for my networking group. The site was delivered in 2 days and the form integration works perfectly. Already getting quality applications!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  M
                </div>
                <div>
                  <div className="font-semibold text-stone-100">Michael R.</div>
                  <div className="text-sm text-stone-400">Net Money Group</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-stone-900 border border-stone-800 rounded-xl p-8 hover:border-blue-500/50 transition-all">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-stone-300 mb-6 leading-relaxed">
                "Fast, professional, and great communication throughout. My restaurant's new website looks amazing and customers love how easy it is to navigate on mobile."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  S
                </div>
                <div>
                  <div className="font-semibold text-stone-100">Sarah K.</div>
                  <div className="text-sm text-stone-400">Local Restaurant Owner</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-stone-900 border border-stone-800 rounded-xl p-8 hover:border-blue-500/50 transition-all">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-stone-300 mb-6 leading-relaxed">
                "Best investment for my consulting business. The site looks premium and I'm getting more qualified leads than ever. Worth every penny!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  D
                </div>
                <div>
                  <div className="font-semibold text-stone-100">David T.</div>
                  <div className="text-sm text-stone-400">Business Consultant</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-100 mb-4">
              Simple, <span className="text-blue-500">Transparent</span> Pricing
            </h2>
            <p className="text-xl text-stone-400 max-w-2xl mx-auto mb-8">
              Choose the package that fits your needs. All packages include mobile-responsive design and clean code.
            </p>

            {/* Guarantee Badges */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 rounded-lg px-4 py-2">
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-stone-300 font-medium text-sm">Fast Delivery Guaranteed</span>
              </div>
              <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 rounded-lg px-4 py-2">
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                </svg>
                <span className="text-stone-300 font-medium text-sm">Mobile-First Design</span>
              </div>
              <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 rounded-lg px-4 py-2">
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-stone-300 font-medium text-sm">Secure Payment</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic Package */}
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-8 hover:border-blue-600/50 transition-all">
              <div className="text-blue-500 font-semibold mb-2">Basic</div>
              <div className="text-4xl font-bold text-stone-100 mb-2">$500</div>
              <p className="text-stone-400 mb-6">Perfect for small businesses</p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-stone-300">Professional landing page</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-stone-300">Mobile responsive design</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-stone-300">Up to 5 pages</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-stone-300">Basic SEO setup</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-stone-300">7-day delivery</span>
                </li>
              </ul>

              <button onClick={() => {
                setSelectedPackage({ name: 'Basic', price: 500 });
                setCheckoutOpen(true);
                trackEvent('checkout_opened', { package: 'Basic', price: 500 });
              }} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all hover:scale-105">
                Start Project Now →
              </button>
            </div>

            {/* Pro Package (Featured) */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 border-2 border-blue-500 rounded-2xl p-8 relative transform scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-400 text-stone-950 px-4 py-1 rounded-full text-sm font-bold">MOST POPULAR</span>
              </div>

              <div className="text-emerald-100 font-semibold mb-2">Pro</div>
              <div className="text-4xl font-bold text-white mb-2">$1,000</div>
              <p className="text-emerald-50 mb-6">Best for growing businesses</p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white font-medium">Everything in Basic, plus:</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-emerald-50">Form integration</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-emerald-50">Google Sheets integration</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-emerald-50">Custom design & branding</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-emerald-50">Advanced animations</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-emerald-50">5-day delivery</span>
                </li>
              </ul>

              <button onClick={() => {
                setSelectedPackage({ name: 'Pro', price: 1000 });
                setCheckoutOpen(true);
                trackEvent('checkout_opened', { package: 'Pro', price: 1000 });
              }} className="w-full bg-white hover:bg-emerald-50 text-blue-700 py-3 rounded-lg font-bold transition-all hover:scale-105">
                Start Project Now →
              </button>
            </div>

            {/* Premium Package */}
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-8 hover:border-blue-600/50 transition-all">
              <div className="text-blue-500 font-semibold mb-2">Premium</div>
              <div className="text-4xl font-bold text-stone-100 mb-2">$1,800</div>
              <p className="text-stone-400 mb-6">For businesses that need custom features</p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-stone-300 font-medium">Everything in Pro, plus:</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-stone-300">Up to 10 pages</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-stone-300">Custom functionality (calculators, booking, forms)</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-stone-300">Photo gallery & portfolio sections</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-stone-300">2 rounds of revisions</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-stone-300">3-day priority delivery</span>
                </li>
              </ul>

              <button onClick={() => {
                setSelectedPackage({ name: 'Premium', price: 1800 });
                setCheckoutOpen(true);
                trackEvent('checkout_opened', { package: 'Premium', price: 1800 });
              }} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all hover:scale-105">
                Start Project Now →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6 bg-stone-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-100 mb-4">
              How It <span className="text-blue-500">Works</span>
            </h2>
            <p className="text-xl text-stone-400">Get your professional website in 4 simple steps</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-center relative overflow-hidden">
                <div className="absolute top-4 right-4 text-6xl font-bold text-white/10">1</div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Choose Package</h3>
                  <p className="text-emerald-50 text-sm">Select the package that fits your needs and click "Start Project Now"</p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-center relative overflow-hidden">
                <div className="absolute top-4 right-4 text-6xl font-bold text-white/10">2</div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Fill Details</h3>
                  <p className="text-emerald-50 text-sm">Provide your business info and project requirements in the checkout form</p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-center relative overflow-hidden">
                <div className="absolute top-4 right-4 text-6xl font-bold text-white/10">3</div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Secure Payment</h3>
                  <p className="text-emerald-50 text-sm">Receive payment link via email and pay securely through Stripe</p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-center relative overflow-hidden">
                <div className="absolute top-4 right-4 text-6xl font-bold text-white/10">4</div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Get Your Site</h3>
                  <p className="text-emerald-50 text-sm">Receive your completed website within 3-7 days, ready to go live!</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-stone-400 text-lg mb-6">No calls needed. No back-and-forth emails. Just fast, professional results.</p>
            <button onClick={() => scrollToSection('pricing')} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 shadow-lg shadow-blue-600/20">
              View Pricing →
            </button>
          </div>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section id="quote" className="py-24 px-6 bg-stone-900/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-100 mb-4">
              Get Your <span className="text-blue-500">Free Quote</span>
            </h2>
            <p className="text-xl text-stone-400">
              Tell me about your project and I'll get back to you within 24 hours with a detailed quote and timeline.
            </p>
          </div>

          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-8 md:p-12">
            {!formSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
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

                {/* Email */}
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

                {/* Phone */}
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

                {/* Business Type */}
                <div>
                  <label className="block text-sm font-medium text-stone-300 mb-2">
                    Business Type *
                  </label>
                  <select
                    name="businessType"
                    required
                    value={formData.businessType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-stone-950 border border-stone-700 rounded-lg text-stone-100 focus:outline-none focus:border-blue-600 transition-colors"
                  >
                    <option value="">Select your business type</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="saas">SaaS / Tech Startup</option>
                    <option value="service">Service Business</option>
                    <option value="restaurant">Restaurant / Hospitality</option>
                    <option value="real-estate">Real Estate</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="education">Education</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Current Website URL (Optional) */}
                <div>
                  <label className="block text-sm font-medium text-stone-300 mb-2">
                    Current Website URL (Optional)
                  </label>
                  <input
                    type="url"
                    name="websiteUrl"
                    value={formData.websiteUrl}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-stone-950 border border-stone-700 rounded-lg text-stone-100 focus:outline-none focus:border-blue-600 transition-colors"
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                {/* Budget Range */}
                <div>
                  <label className="block text-sm font-medium text-stone-300 mb-2">
                    Budget Range *
                  </label>
                  <select
                    name="budget"
                    required
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-stone-950 border border-stone-700 rounded-lg text-stone-100 focus:outline-none focus:border-blue-600 transition-colors"
                  >
                    <option value="">Select your budget range</option>
                    <option value="<$500">Less than $500</option>
                    <option value="$500-1000">$500 - $1,000</option>
                    <option value="$1000-1800">$1,000 - $1,800</option>
                    <option value="$1800+">$1,800+</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold transition-all hover:scale-105 shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? 'Submitting...' : 'Get Free Quote'}
                </button>

                <p className="text-xs text-stone-400 text-center">
                  By submitting this form, you agree to be contacted about your project. We respect your privacy and will never share your information.
                </p>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-stone-100 mb-4">Thank You!</h3>
                <p className="text-lg text-stone-300 mb-6">
                  I've received your request and will get back to you within 24 hours with a detailed quote and project timeline.
                </p>
                <div className="bg-stone-950 border border-stone-800 rounded-lg p-6 mb-6">
                  <h4 className="text-lg font-semibold text-stone-100 mb-3">What Happens Next?</h4>
                  <ul className="text-left space-y-2 text-stone-400">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">1.</span>
                      <span>I'll review your project requirements carefully</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">2.</span>
                      <span>You'll receive a detailed quote via email within 24 hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">3.</span>
                      <span>We'll schedule a call to discuss your vision and requirements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">4.</span>
                      <span>Once approved, I'll start building your website immediately</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={resetForm}
                  className="text-blue-500 hover:text-blue-400 font-medium"
                >
                  Submit Another Request
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Calendly Section */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-12 md:p-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-emerald-50 mb-10 max-w-2xl mx-auto">
              Book a free 15-minute strategy call to discuss your project. No pressure, no commitment - just a friendly conversation about how I can help grow your business.
            </p>

            <a
              href="https://calendly.com/jamesfinleymcmillan/strategy-call"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white hover:bg-emerald-50 text-blue-700 px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 shadow-xl"
            >
              Book Your Free Call
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 bg-stone-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-100 mb-4">
              Frequently Asked <span className="text-blue-500">Questions</span>
            </h2>
            <p className="text-xl text-stone-400">Everything you need to know</p>
          </div>

          <div className="space-y-6">
            {/* FAQ 1 */}
            <div className="bg-stone-900 border border-stone-800 rounded-xl p-6 hover:border-blue-500/50 transition-all">
              <h3 className="text-xl font-bold text-stone-100 mb-3">How long does it take to build my website?</h3>
              <p className="text-stone-400">
                Basic packages are delivered in 7 days, Pro in 5 days, and Premium in 3 days. Add the Rush Delivery upsell to cut the timeline in half!
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="bg-stone-900 border border-stone-800 rounded-xl p-6 hover:border-blue-500/50 transition-all">
              <h3 className="text-xl font-bold text-stone-100 mb-3">Do I really not need to have a call?</h3>
              <p className="text-stone-400">
                Nope! The checkout form collects everything I need to build your site. You'll provide your business info, color preferences, and any specific requirements. I'll handle the rest and deliver a professional site ready to go live.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="bg-stone-900 border border-stone-800 rounded-xl p-6 hover:border-blue-500/50 transition-all">
              <h3 className="text-xl font-bold text-stone-100 mb-3">What if I need changes after you finish?</h3>
              <p className="text-stone-400">
                Pro and Premium packages include 1-2 rounds of revisions. If you need additional changes after delivery, I offer ongoing support at $100/hour or monthly retainers starting at $300/month.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="bg-stone-900 border border-stone-800 rounded-xl p-6 hover:border-blue-500/50 transition-all">
              <h3 className="text-xl font-bold text-stone-100 mb-3">Will my website work on mobile devices?</h3>
              <p className="text-stone-400">
                Absolutely! All websites are built mobile-first, meaning they look and work perfectly on phones, tablets, and desktops. Over 60% of web traffic is mobile, so this is non-negotiable.
              </p>
            </div>

            {/* FAQ 5 */}
            <div className="bg-stone-900 border border-stone-800 rounded-xl p-6 hover:border-blue-500/50 transition-all">
              <h3 className="text-xl font-bold text-stone-100 mb-3">Can you help me with hosting and domain setup?</h3>
              <p className="text-stone-400">
                Yes! All packages include deployment to Vercel (free hosting forever). If you need a custom domain, I can help you set that up for an additional $50 setup fee, or you can do it yourself following the simple instructions I'll provide.
              </p>
            </div>

            {/* FAQ 6 */}
            <div className="bg-stone-900 border border-stone-800 rounded-xl p-6 hover:border-blue-500/50 transition-all">
              <h3 className="text-xl font-bold text-stone-100 mb-3">What if I'm not satisfied with the result?</h3>
              <p className="text-stone-400">
                I work closely with your requirements to ensure you're happy with the final product. While I don't offer refunds after work begins, I do include revisions with Pro/Premium packages to make sure we get it right. Your satisfaction is my priority.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-800 bg-stone-900/30">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 gap-12 mb-8">
            <div>
              <div className="text-2xl font-bold text-stone-100 mb-4">
                <span className="text-blue-500">Web</span>Dev Pro
              </div>
              <p className="text-stone-400 leading-relaxed mb-6">
                Professional web development services for businesses that want to grow online. Fast delivery, clean code, and measurable results.
              </p>
              <div className="flex gap-3">
                <a
                  href="mailto:jamesfinleymcmillan@gmail.com"
                  className="inline-flex items-center gap-2 bg-stone-800 hover:bg-blue-600 text-stone-300 hover:text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Me
                </a>
                <a
                  href="https://github.com/jamesfinleymcmillan-code"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-stone-800 hover:bg-blue-600 text-stone-300 hover:text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-stone-100 font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <button onClick={() => scrollToSection('work')} className="text-stone-400 hover:text-blue-500 transition-colors">Portfolio</button>
                  </li>
                  <li>
                    <button onClick={() => scrollToSection('pricing')} className="text-stone-400 hover:text-blue-500 transition-colors">Pricing</button>
                  </li>
                  <li>
                    <button onClick={() => scrollToSection('quote')} className="text-stone-400 hover:text-blue-500 transition-colors">Get Quote</button>
                  </li>
                  <li>
                    <button onClick={() => scrollToSection('contact')} className="text-stone-400 hover:text-blue-500 transition-colors">Book a Call</button>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-stone-100 font-semibold mb-4">Contact</h4>
                <ul className="space-y-2 text-stone-400">
                  <li className="text-xs sm:text-sm">
                    <a href="mailto:jamesfinleymcmillan@gmail.com" className="hover:text-blue-500 transition-colors inline-block max-w-full" style={{ wordWrap: 'break-word', overflowWrap: 'anywhere' }}>
                      jamesfinleymcmillan@gmail.com
                    </a>
                  </li>
                  <li className="pt-2 text-xs sm:text-sm">
                    <a
                      href="https://github.com/jamesfinleymcmillan-code"
                      style={{ wordWrap: 'break-word', overflowWrap: 'anywhere' }}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-500 transition-colors"
                    >
                      github.com/jamesfinleymcmillan-code
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-stone-800 pt-8 text-center text-stone-400 text-sm">
            © 2025 WebDev Pro. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        packageName={selectedPackage.name}
        basePrice={selectedPackage.price}
      />

      {/* Exit Intent Popup */}
      <ExitIntentPopup />
    </div>
  );
}
