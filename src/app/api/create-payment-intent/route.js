import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();

    // PaymentIntent create
    const paymentIntent = await stripe.paymentIntents.create({
      amount: body.amount, // amount in cents (5000 = $50)
      currency: "usd",
      metadata: {
        parcelName: body.parcelName,
        senderName: body.senderName,
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
