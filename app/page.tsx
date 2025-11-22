'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    referralSource: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    // Prevent multiple submissions
    if (isSubmitting) return;

    setIsSubmitting(true);

    // Google Apps Script URL for form submissions
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzH4UMh4ZCJWZd35-r-4o5afxu8uawUnbyBfNSv4whxmInMwAB-5bh6V9kl3ZBwKyrL/exec';

    try {
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors'
      });

      setFormSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      // Still show success message to user
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

  return (
    <div className="min-h-screen bg-stone-950">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-stone-950/95 backdrop-blur-lg border-b border-stone-800' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-stone-100 tracking-tight">
              <span className="text-emerald-500">Net</span>Money
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('about')} className="text-stone-300 hover:text-stone-100 transition-colors">
                About
              </button>
              <button onClick={() => scrollToSection('benefits')} className="text-stone-300 hover:text-stone-100 transition-colors">
                Benefits
              </button>
              <button onClick={() => scrollToSection('members')} className="text-stone-300 hover:text-stone-100 transition-colors">
                Members
              </button>
              <button onClick={() => scrollToSection('apply')} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg transition-all hover:scale-105 font-medium shadow-lg shadow-emerald-600/20">
                Apply Now
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
              <button onClick={() => scrollToSection('about')} className="block w-full text-left text-stone-300 hover:text-stone-100 transition-colors py-2">
                About
              </button>
              <button onClick={() => scrollToSection('benefits')} className="block w-full text-left text-stone-300 hover:text-stone-100 transition-colors py-2">
                Benefits
              </button>
              <button onClick={() => scrollToSection('members')} className="block w-full text-left text-stone-300 hover:text-stone-100 transition-colors py-2">
                Members
              </button>
              <button onClick={() => scrollToSection('apply')} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg transition-colors font-medium mt-2">
                Apply Now
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section with Application Form */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div>
              <div className="inline-block mb-4 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <span className="text-emerald-400 text-sm font-medium">🔒 Private & Exclusive</span>
              </div>

              <h1 className="text-6xl md:text-7xl font-extrabold text-stone-100 mb-6 leading-tight">
                Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Net Money</span>
              </h1>

              <p className="text-xl md:text-2xl text-stone-300 mb-8 leading-relaxed">
                An exclusive community of high-performing entrepreneurs, investors, and business leaders.
                Network with the best, grow your wealth, and unlock opportunities.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div>
                  <div className="text-3xl font-bold text-emerald-500">500+</div>
                  <div className="text-sm text-stone-400">Members</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-500">$50M+</div>
                  <div className="text-sm text-stone-400">Combined Net Worth</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-500">Weekly</div>
                  <div className="text-sm text-stone-400">Events</div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-stone-900/50 border border-stone-800 rounded-lg p-4">
                <svg className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-stone-100 font-semibold mb-1">Application Required</p>
                  <p className="text-stone-400 text-sm">All applications are reviewed. We'll contact qualified candidates within 48 hours.</p>
                </div>
              </div>
            </div>

            {/* Right Side - Application Form */}
            <div id="apply" className="bg-stone-900 border border-stone-800 rounded-2xl p-8 shadow-2xl">
              {!formSubmitted ? (
                <>
                  <h2 className="text-2xl font-bold text-stone-100 mb-2">Apply for Membership</h2>
                  <p className="text-stone-400 mb-6">Fill out the form below to join our exclusive network</p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-stone-300 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-stone-950 border border-stone-700 rounded-lg text-stone-100 focus:outline-none focus:border-emerald-600 transition-colors"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-300 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-stone-950 border border-stone-700 rounded-lg text-stone-100 focus:outline-none focus:border-emerald-600 transition-colors"
                          placeholder="Smith"
                        />
                      </div>
                    </div>

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
                        className="w-full px-4 py-3 bg-stone-950 border border-stone-700 rounded-lg text-stone-100 focus:outline-none focus:border-emerald-600 transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>

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
                        className="w-full px-4 py-3 bg-stone-950 border border-stone-700 rounded-lg text-stone-100 focus:outline-none focus:border-emerald-600 transition-colors"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-stone-300 mb-2">
                        How did you hear about us? *
                      </label>
                      <select
                        name="referralSource"
                        required
                        value={formData.referralSource}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-stone-950 border border-stone-700 rounded-lg text-stone-100 focus:outline-none focus:border-emerald-600 transition-colors"
                      >
                        <option value="">Select an option</option>
                        <option value="member-referral">Referred by a member</option>
                        <option value="social-media">Social Media</option>
                        <option value="google">Google Search</option>
                        <option value="event">Event or Conference</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-lg font-semibold transition-all hover:scale-105 shadow-lg shadow-emerald-600/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </button>

                    <p className="text-xs text-stone-400 text-center">
                      By submitting, you agree to our Terms of Service and Privacy Policy
                    </p>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-stone-100 mb-2">Application Received!</h3>
                  <p className="text-stone-300 mb-6">
                    Thank you for your interest in Net Money. We'll review your application and get back to you within 48 hours.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="text-emerald-500 hover:text-emerald-400 font-medium"
                  >
                    Submit Another Application
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-stone-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-stone-100 mb-4">
              What is <span className="text-emerald-500">Net Money</span>?
            </h2>
            <p className="text-xl text-stone-400 max-w-3xl mx-auto">
              Net Money is an invite-only community of ambitious entrepreneurs, investors, and business leaders
              committed to growing their wealth and expanding their network.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎯",
                title: "Curated Network",
                description: "Connect with vetted, high-caliber professionals who share your ambition and drive for success."
              },
              {
                icon: "💼",
                title: "Deal Flow",
                description: "Access exclusive investment opportunities, partnerships, and business deals not available to the public."
              },
              {
                icon: "🚀",
                title: "Growth Focused",
                description: "Participate in masterminds, workshops, and events designed to accelerate your business growth."
              }
            ].map((item, i) => (
              <div key={i} className="bg-stone-900 border border-stone-800 rounded-2xl p-8 text-center">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-stone-100 mb-3">{item.title}</h3>
                <p className="text-stone-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-stone-100 mb-6">
              Membership <span className="text-emerald-500">Benefits</span>
            </h2>
            <p className="text-xl text-stone-400 max-w-2xl mx-auto">
              Everything you need to expand your network and grow your wealth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: "Weekly Networking Events",
                description: "Exclusive in-person and virtual events where members connect, collaborate, and create opportunities."
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Investment Opportunities",
                description: "First access to vetted investment deals, startups, and business opportunities from within the network."
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                title: "Mastermind Groups",
                description: "Join small, focused mastermind groups with peers at your level to solve problems and share strategies."
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
                title: "Expert Resources",
                description: "Access to exclusive content, courses, and resources from industry leaders and successful entrepreneurs."
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                title: "Private Events & Retreats",
                description: "Invitation to exclusive members-only retreats, dinners, and high-level networking experiences."
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "Verified Members Only",
                description: "All members are vetted and verified, ensuring a high-quality, trustworthy network environment."
              }
            ].map((benefit, i) => (
              <div
                key={i}
                className="group relative bg-stone-900/50 border border-stone-800 hover:border-emerald-600/50 rounded-2xl p-8 transition-all hover:scale-105 hover:bg-stone-900 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/0 to-emerald-600/0 group-hover:from-emerald-600/5 group-hover:to-emerald-600/10 rounded-2xl transition-all"></div>
                <div className="relative">
                  <div className="w-14 h-14 bg-emerald-600/20 group-hover:bg-emerald-600 rounded-xl flex items-center justify-center mb-5 text-emerald-500 group-hover:text-white transition-all">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-stone-100 mb-3 group-hover:text-emerald-400 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-stone-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Member Testimonials */}
      <section id="members" className="py-24 px-6 bg-stone-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-stone-100 mb-4">
              What Our <span className="text-emerald-500">Members</span> Say
            </h2>
            <p className="text-xl text-stone-400">Success stories from our exclusive community</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "David Chen",
                role: "Tech Entrepreneur",
                company: "CEO, TechVentures",
                text: "Net Money connected me with investors who believed in my vision. Within 6 months, I closed a $5M Series A round through connections I made here."
              },
              {
                name: "Sarah Williams",
                role: "Real Estate Investor",
                company: "Managing Partner, Williams Capital",
                text: "The caliber of people in this network is unmatched. I've partnered on three major deals and expanded my portfolio by 300% since joining."
              },
              {
                name: "Marcus Rodriguez",
                role: "Private Equity",
                company: "Founder, MR Investments",
                text: "This isn't just networking—it's relationship building with people who actually move the needle. Net Money has been invaluable for my business growth."
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-stone-900 border border-stone-800 rounded-2xl p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-stone-300 mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                <div className="pt-6 border-t border-stone-800">
                  <div className="font-semibold text-stone-100">{testimonial.name}</div>
                  <div className="text-sm text-emerald-500">{testimonial.role}</div>
                  <div className="text-xs text-stone-400">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 rounded-3xl p-12 md:p-20 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzAtMS4xLS45LTItMi0yaC0xMGMtMS4xIDAtMiAuOS0yIDJ2MTBjMCAxLjEuOSAyIDIgMmgxMGMxLjEgMCAyLS45IDItMlYxOHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Elevate Your Network?
              </h2>
              <p className="text-xl text-emerald-50 mb-10 max-w-2xl mx-auto">
                Join an exclusive community of high-achievers and unlock opportunities that will transform your business and wealth.
              </p>
              <button onClick={() => scrollToSection('apply')} className="bg-white text-emerald-700 hover:bg-emerald-50 px-12 py-5 rounded-xl transition-all hover:scale-105 font-bold text-lg shadow-2xl">
                Apply for Membership
              </button>
              <p className="text-emerald-100 mt-6 text-sm">
                Limited spots available • Applications reviewed within 48 hours
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-800 bg-stone-900/30">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="text-3xl font-bold text-stone-100 mb-4">
                <span className="text-emerald-500">Net</span>Money
              </div>
              <p className="text-stone-400 mb-6 leading-relaxed">
                An exclusive community of entrepreneurs, investors, and business leaders committed to
                growing their wealth and expanding their network.
              </p>
              <div className="flex gap-4">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-stone-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-colors group">
                  <svg className="w-5 h-5 text-stone-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-stone-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-colors group">
                  <svg className="w-5 h-5 text-stone-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-stone-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-colors group">
                  <svg className="w-5 h-5 text-stone-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-stone-100 font-semibold mb-4">Community</h4>
              <ul className="space-y-3">
                <li>
                  <button onClick={() => scrollToSection('about')} className="text-stone-400 hover:text-emerald-500 transition-colors">About Us</button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('benefits')} className="text-stone-400 hover:text-emerald-500 transition-colors">Benefits</button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('members')} className="text-stone-400 hover:text-emerald-500 transition-colors">Members</button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('apply')} className="text-stone-400 hover:text-emerald-500 transition-colors">Apply Now</button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-stone-100 font-semibold mb-4">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <button onClick={() => alert('Privacy Policy - Coming Soon')} className="text-stone-400 hover:text-emerald-500 transition-colors">Privacy Policy</button>
                </li>
                <li>
                  <button onClick={() => alert('Terms of Service - Coming Soon')} className="text-stone-400 hover:text-emerald-500 transition-colors">Terms of Service</button>
                </li>
                <li>
                  <button onClick={() => alert('Coming Soon')} className="text-stone-400 hover:text-emerald-500 transition-colors">Contact Us</button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-stone-800 pt-8 text-center text-stone-400 text-sm">
            © 2025 Net Money. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
