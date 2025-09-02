"use client";
import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axiosInstance from "../../lib/axiosInstance";
import toast from "react-hot-toast";

export default function CheckoutForm({
  amount,
  formData,
  bookingId,
  onSuccess,
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Call backend to create payment intent
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, ...formData }),
      });

      const { clientSecret } = await res.json();

      // 2. Confirm payment with card
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: formData.senderName,
          },
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          toast.success("✅ Payment Successful!");

          // 3. Create booking in DB
          await axiosInstance.post("/booking-parcels", {
            ...formData, // user form data
            status: "paid",
            transactionId: result.paymentIntent.id,
            amount: amount / 100, // যদি backend amount চাই
          });

          if (onSuccess) onSuccess();
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Payment failed.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handlePayment} className="mt-6 space-y-4">
      <CardElement className="border p-3 rounded-lg" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-green-600 text-white py-2 rounded-lg"
      >
        {loading ? "Processing..." : `Pay ${(amount / 100).toFixed(2)} USD`}
      </button>
    </form>
  );
}
