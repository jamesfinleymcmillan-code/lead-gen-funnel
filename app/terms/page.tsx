export const metadata = {
  title: 'Terms of Service - WebDev Pro',
  description: 'Terms of Service for WebDev Pro web development services',
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Terms of Service</h1>
        <p className="text-stone-400 mb-12">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Services</h2>
            <p className="text-stone-300 leading-relaxed">
              WebDev Pro provides web development services including website design, development, and deployment. All services are provided on a project basis with specific deliverables and timelines as outlined in your package selection.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Payment Terms</h2>
            <p className="text-stone-300 leading-relaxed mb-4">
              Payment is required upfront before work begins. All payments are processed securely through Stripe. Prices are in Australian Dollars (AUD) unless otherwise stated.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Delivery Timeline</h2>
            <p className="text-stone-300 leading-relaxed">
              Delivery timelines are estimates and may vary based on project complexity and client responsiveness. Work begins immediately after payment is received and all required information is provided.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Revisions</h2>
            <p className="text-stone-300 leading-relaxed">
              Pro and Premium packages include 1-2 rounds of revisions respectively. Additional revisions beyond the included amount may incur additional charges at $100/hour.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Refund Policy</h2>
            <p className="text-stone-300 leading-relaxed">
              Due to the nature of digital services, refunds are not available once work has commenced. See our <a href="/refund-policy" className="text-blue-500 hover:text-blue-400">Refund Policy</a> for full details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Intellectual Property</h2>
            <p className="text-stone-300 leading-relaxed">
              Upon full payment, you own all rights to the final delivered website. WebDev Pro retains the right to showcase the work in our portfolio unless otherwise agreed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Client Responsibilities</h2>
            <p className="text-stone-300 leading-relaxed mb-4">
              You are responsible for:
            </p>
            <ul className="list-disc list-inside text-stone-300 space-y-2 ml-4">
              <li>Providing accurate information and content in a timely manner</li>
              <li>Responding to questions and revision requests promptly</li>
              <li>Maintaining your own domain and hosting after delivery</li>
              <li>Backing up your website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Limitation of Liability</h2>
            <p className="text-stone-300 leading-relaxed">
              WebDev Pro is not liable for any indirect, incidental, or consequential damages arising from use of our services. Our total liability is limited to the amount paid for services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Changes to Terms</h2>
            <p className="text-stone-300 leading-relaxed">
              We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">10. Contact</h2>
            <p className="text-stone-300 leading-relaxed">
              Questions about these terms? Contact us at <a href="mailto:jamesfinleymcmillan@gmail.com" className="text-blue-500 hover:text-blue-400">jamesfinleymcmillan@gmail.com</a>
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
