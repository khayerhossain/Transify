import Container from "../../Components/Shared/Container/Container";

export default function NewsletterSection() {
  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Subscribe to <span className="text-red-500">Our Newsletter</span>
          </h2>
          <p className="text-gray-600 mb-8">
            Get the latest updates and offers delivered straight to your inbox.
          </p>

          <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-2/3 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
