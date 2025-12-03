"use client";
import { useState } from "react";
import axiosInstance from "../../../../../lib/axiosInstance";
import ProtectedRoute from "../../../../../Components/Shared/ProtectedRoute";
import { FaHeadset, FaPaperPlane } from "react-icons/fa";

function SupportInner() {
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
    <section className="min-h-screen mt-16 flex items-center justify-center bg-gradient-to-br from-slate-50 to-red-50 p-6">
      <div className="bg-white/95 shadow-2xl rounded-3xl p-8 w-full max-w-2xl border border-red-100">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-red-100 text-red-600">
            <FaHeadset />
          </span>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Rider Support</h2>
            <p className="text-sm text-gray-500">
              Reach out to operations for any delivery or account issues.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="riderName"
              placeholder="Your Name"
              value={form.riderName}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
            <input
              type="email"
              name="riderEmail"
              placeholder="Your Email"
              value={form.riderEmail}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <textarea
            name="message"
            placeholder="Describe your issue or question"
            value={form.message}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 h-32 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 rounded-full transition flex items-center justify-center gap-2"
          >
            {loading ? (
              "Sending..."
            ) : (
              <>
                <FaPaperPlane />
                <span>Send Message</span>
              </>
            )}
          </button>
        </form>
        {success && (
          <p className="text-green-600 mt-4 text-center text-sm">{success}</p>
        )}
      </div>
    </section>
  );
}

export default function SupportPage() {
  return (
    <ProtectedRoute allowedRoles={["rider"]}>
      <SupportInner />
    </ProtectedRoute>
  );
}
