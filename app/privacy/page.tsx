export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-stone-400 mb-12">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
            <p className="text-stone-300 leading-relaxed">
              When you use our website, we collect information you provide directly, including your name, email address, phone number, business name, and project details when you submit forms or make purchases.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
            <p className="text-stone-300 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-stone-300 space-y-2 ml-4">
              <li>Provide and deliver the services you request</li>
              <li>Process your payments through Stripe</li>
              <li>Send you project updates and communications</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Information Sharing</h2>
            <p className="text-stone-300 leading-relaxed mb-4">
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className="list-disc list-inside text-stone-300 space-y-2 ml-4">
              <li><strong>Stripe:</strong> For payment processing</li>
              <li><strong>Google Analytics:</strong> For website analytics (anonymized data)</li>
              <li><strong>Google Sheets:</strong> For internal order and lead management</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Cookies and Tracking</h2>
            <p className="text-stone-300 leading-relaxed">
              We use cookies and similar tracking technologies to analyze website traffic and improve user experience. We use Google Analytics 4 to collect anonymized usage data. You can control cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
            <p className="text-stone-300 leading-relaxed">
              We implement reasonable security measures to protect your information. All payment processing is handled securely by Stripe. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
            <p className="text-stone-300 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-stone-300 space-y-2 ml-4">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of your personal information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Children's Privacy</h2>
            <p className="text-stone-300 leading-relaxed">
              Our services are not directed to individuals under 18. We do not knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Contact Us</h2>
            <p className="text-stone-300 leading-relaxed">
              If you have questions about this Privacy Policy or wish to exercise your rights, contact us at:
              <br />
              <a href="mailto:jamesfinleymcmillan@gmail.com" className="text-blue-500 hover:text-blue-400">
                jamesfinleymcmillan@gmail.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Changes to This Policy</h2>
            <p className="text-stone-300 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page with an updated date.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-800">
          <a href="/" className="text-blue-500 hover:text-blue-400">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
