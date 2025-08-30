"use client";
import { useState } from "react";
import axios from "axios";
import Container from "../../Components/Shared/Container/Container";
// যদি auth hook থাকে তাহলে import করো
// import useAuth from "@/Hooks/useAuth";

export default function NewsletterSection() {
  // ধরো user login করা আছে
  // const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("/api/newsletter", {
        // user?.name || "Anonymous",
        // user?.image || "",
        email,
      });

      if (res.data.success) {
        setMessage("✅ Subscribed successfully!");
        setEmail("");
      } else {
        setMessage("❌ Subscription failed.");
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

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

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-2/3 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition cursor-pointer"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>

          {message && <p className="mt-4 text-gray-600">{message}</p>}
        </div>
      </Container>
    </section>
  );
}
