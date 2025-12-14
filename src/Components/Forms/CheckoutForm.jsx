"use client";
import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axiosInstance from "../../Lib/axiosInstance";
import toast from "react-hot-toast";

export default function CheckoutForm({ formData, bookingId, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  // Amount calculate based on type
  const getAmount = () => {
    if (formData.type === "Document") return 500 * 100; // 500 USD in cents
    const weight = parseFloat(formData.parcelWeight) || 0;
    return weight * 300 * 100; // 300 USD per kg in cents
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let paymentAmount = 0;

      // Calculate amount
      if (formData.type === "Document") {
        paymentAmount = 500 * 100; // $500 → 50000 cents
      } else {
        // Non-document: amount based on weight
        paymentAmount = (formData.parcelWeight || 1) * 300 * 100; // 300 per kg
      }

      // Call backend
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: paymentAmount,
          parcelName: formData.parcelName,
          senderName: formData.senderName,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Payment Intent creation failed");
      }

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { name: formData.senderName },
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        toast.success("Payment successful!");
        // Save booking after success
        await axiosInstance.post("/booking-parcels", {
          ...formData,
          status: "paid",
          transactionId: result.paymentIntent.id,
          amount: paymentAmount / 100, // save in USD
        });
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Payment failed");
    }

    setLoading(false);
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#374151",
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
        "::placeholder": { color: "#9CA3AF" },
        iconColor: "#EF4444",
      },
      invalid: { color: "#EF4444", iconColor: "#EF4444" },
    },
    hidePostalCode: false,
  };

  return (
    <form onSubmit={handlePayment} className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center">
            Card Information
          </h3>
        </div>
        <div className="p-4">
          <CardElement
            options={cardElementOptions}
            className="p-4 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg border">
        <div>
          <p className="text-sm font-medium text-gray-900">Secure Payment</p>
          <p className="text-xs text-gray-600 mt-1">
            Your payment info is encrypted and secure.
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-4 px-6 rounded-xl shadow-lg disabled:from-gray-400 disabled:to-gray-500"
      >
        {loading
          ? "Processing Payment..."
          : `Pay $${(getAmount() / 100).toFixed(2)} USD`}
      </button>
    </form>
  );
}
