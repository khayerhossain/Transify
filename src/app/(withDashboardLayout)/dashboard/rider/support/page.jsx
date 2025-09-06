"use client";
import { useState } from "react";
import axiosInstance from "../../../../../lib/axiosInstance";

export default function SupportPage() {
  const [form, setForm] = useState({
    riderName: "",
    riderEmail: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.post("/support", form);
      setSuccess("Your message has been sent successfully!");
      setForm({ riderName: "", riderEmail: "", message: "" });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Support</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="riderName"
            placeholder="Your Name"
            value={form.riderName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          <input
            type="email"
            name="riderEmail"
            placeholder="Your Email"
            value={form.riderEmail}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 h-28 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
        {success && (
          <p className="text-green-600 mt-4 text-center">{success}</p>
        )}
      </div>
    </section>
  );
}
