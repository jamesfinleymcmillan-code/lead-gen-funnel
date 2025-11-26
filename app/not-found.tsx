export default function NotFound() {
  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-9xl font-bold text-blue-500 mb-4">404</div>
          <h1 className="text-3xl font-bold text-stone-100 mb-4">Page Not Found</h1>
          <p className="text-stone-400 mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
        </div>

        <div className="space-y-3">
          <a
            href="/"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all hover:scale-105"
          >
            Go Home
          </a>
          <a
            href="/#pricing"
            className="block w-full border border-stone-700 text-stone-300 py-3 rounded-lg hover:bg-stone-800 transition-colors font-medium"
          >
            View Pricing
          </a>
        </div>
      </div>
    </div>
  );
}
