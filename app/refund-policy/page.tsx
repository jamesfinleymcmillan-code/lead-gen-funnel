export const metadata = {
  title: 'Refund Policy - WebDev Pro',
  description: 'Refund policy for WebDev Pro web development services',
};

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Refund Policy</h1>
        <p className="text-stone-400 mb-12">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Our Policy</h2>
            <p className="text-stone-300 leading-relaxed">
              Due to the custom nature of web development services, all sales are final once work has commenced. Payment is required upfront, and work begins immediately after payment is received.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Before Work Begins</h2>
            <p className="text-stone-300 leading-relaxed">
              If you change your mind before any work has started (within 24 hours of payment and before receiving project kickoff), we will provide a full refund minus Stripe processing fees.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">After Work Has Started</h2>
            <p className="text-stone-300 leading-relaxed">
              Once work has commenced, no refunds are available. This is because:
            </p>
            <ul className="list-disc list-inside text-stone-300 space-y-2 ml-4 mt-4">
              <li>Custom development work cannot be resold to another client</li>
              <li>Time and resources have already been invested in your project</li>
              <li>Design and development work is delivered digitally and cannot be "returned"</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Quality Guarantee</h2>
            <p className="text-stone-300 leading-relaxed">
              While we don't offer refunds after work begins, we are committed to your satisfaction. Pro and Premium packages include revision rounds to ensure you're happy with the final result. We will work with you to address any concerns within the scope of your package.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Disputes</h2>
            <p className="text-stone-300 leading-relaxed">
              If you have concerns about your project, please contact us at <a href="mailto:jamesfinleymcmillan@gmail.com" className="text-blue-500 hover:text-blue-400">jamesfinleymcmillan@gmail.com</a> before initiating a chargeback. We're committed to resolving any issues fairly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Force Majeure</h2>
            <p className="text-stone-300 leading-relaxed">
              In the unlikely event we cannot complete your project due to circumstances beyond our control, we will provide a pro-rated refund for work not completed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-stone-300 leading-relaxed">
              Questions about our refund policy? Contact us at <a href="mailto:jamesfinleymcmillan@gmail.com" className="text-blue-500 hover:text-blue-400">jamesfinleymcmillan@gmail.com</a>
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
