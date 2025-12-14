"use client";
import { useState } from "react";
import axios from "axios";
import Container from "../../Components/Shared/Container/Container";
import { motion } from "framer-motion";
import { Send, Mail, BellRing, ArrowRight } from "lucide-react";
import axiosInstance from "../../Lib/axiosInstance";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axiosInstance.post("/newsletter", { email });
      if (res.data?.success) {
        setMessage("Subscribed successfully!");
        setEmail("");
      } else {
        setMessage("Subscription failed.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-24 overflow-hidden bg-white">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-40 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full rounded-[2.5rem] bg-white border border-red-100 shadow-2xl shadow-red-500/5 overflow-hidden z-10"
        >
          {/* Decorative Side Accents */}
          <div className="absolute left-0 top-0 w-2 h-full bg-red-500" />
          <div className="absolute right-0 top-0 w-2 h-full bg-red-500" />

          <div className="flex flex-col lg:flex-row items-center justify-between p-8 md:p-12 lg:p-16 gap-10">

            {/* Left Side: Text Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 font-semibold text-sm shadow-sm border border-red-100"
              >
                <BellRing size={16} />
                <span>Never Miss an Update</span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                Subscribe to our <br />
                <span className="text-red-600">Newsletter</span>
              </h2>

              <p className="text-lg text-gray-500 max-w-lg mx-auto lg:mx-0">
                Get the latest logistical trends, delivery coverage updates, and exclusive promo codes delivered right to your inbox.
              </p>

              {/* Decorative List */}
              <div className="hidden sm:flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-gray-600 font-medium pt-2">
                {["Weekly Updates", "No Spam", "Unsubscribe Anytime"].map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: Input Form */}
            <div className="w-full lg:w-5/12 bg-gray-50 p-8 rounded-3xl border border-gray-100">
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-red-500 transition-colors">
                      <Mail size={20} />
                    </div>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all shadow-sm"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-lg shadow-lg shadow-red-500/30 transition-all flex items-center justify-center gap-2 group"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Subscribe Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </form>

              {message && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 text-center text-sm font-medium ${message.includes("success") ? "text-green-600" : "text-red-600"}`}
                >
                  {message}
                </motion.p>
              )}

              <p className="text-xs text-center text-gray-400 mt-4">
                By subscribing, you agree to our Terms & Conditions.
              </p>
            </div>

          </div>
        </motion.div>
      </Container>
    </section>
  );
}
