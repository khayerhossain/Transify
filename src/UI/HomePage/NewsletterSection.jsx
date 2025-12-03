"use client";
import { useState } from "react";
import axios from "axios";
import Container from "../../Components/Shared/Container/Container";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("/api/newsletter", { email });
      if (res.data?.success) {
        setMessage(" Subscribed successfully!");
        setEmail("");
      } else {
        setMessage("Subscription failed.");
      }
    } catch (err) {
      console.error(err);
      setMessage(" Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[420px] flex items-center justify-center bg-red-50/60 p-6 mt-0 lg:mt-16">
      <Container>
        <div className="relative w-full max-w-7xl rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-red-700">
          <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-b from-red-500/80 to-red-400/80" />

          <div className="relative rounded-3xl p-10 md:p-16">
            <div className="absolute -bottom-6 left-10 right-10 h-6 rounded-xl bg-white/0 shadow-[0_35px_35px_rgba(0,0,0,0.12)] pointer-events-none" />

            <div className="max-w-2xl mx-auto text-center text-white">
              {/* Curved line + rocket/paper-plane icon */}
              <div className="flex items-center justify-center mb-6">
                <svg
                  width="240"
                  height="80"
                  viewBox="0 0 240 80"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto"
                >
                  {/* Curved flight path */}
                  <path
                    d="M10 60 C80 10, 160 10, 230 40"
                    stroke="#D1D5DB"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                  />

                  {/* Paper-plane/rocket icon */}
                  <g transform="translate(210,22) rotate(-10)">
                    <path
                      d="M2 10 L28 0 L18 30 L10 22 L2 10 Z"
                      fill="#EF4444"
                    />
                    <path d="M2 10 L10 22 L12 14 Z" fill="#B91C1C" />
                    <circle cx="16" cy="12" r="2" fill="#fff" />
                  </g>
                </svg>
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
                Stay ahead of every <span className="text-red-300">delivery</span>
              </h1>

              <p className="text-sm md:text-base text-slate-200 mb-8">
                Get merchant updates, coverage expansion news, and special
                delivery offers straight to your inbox.
              </p>

              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row items-center gap-4 justify-center"
              >
                <div className="w-full sm:w-2/3">
                  <label className="relative block">
                    <input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-transparent border-none px-4 py-4 text-slate-100 placeholder-slate-400 focus:outline-none text-lg"
                    />
                    <div className="h-[1px] bg-gray-200 w-full" />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-white text-red-600 font-semibold shadow-lg hover:bg-slate-100 transition disabled:opacity-60"
                >
                  {loading ? "Subscribing..." : "Subscribe"}
                </button>
              </form>

              {message && (
                <p className="mt-6 text-sm text-slate-100">{message}</p>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
