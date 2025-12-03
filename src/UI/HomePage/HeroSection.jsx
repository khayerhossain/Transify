"use client";
import { Package, ArrowRight, Info, Search } from "lucide-react";
import Lottie from "lottie-react";
import bikeRider from "../../assets/delivery-guy.json";
import Container from "../../Components/Shared/Container/Container";
import Link from "next/link";

export default function CourierHeroSection() {
  return (
    <section className="bg-gradient-to-br from-red-50 via-white to-rose-50">
      <Container>
        <div className="min-h-screen relative overflow-hidden">
          {/* Background Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-10 -left-10 w-72 h-72 bg-red-200/40 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-40 -right-10 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute -bottom-10 left-1/3 w-80 h-80 bg-orange-100/50 rounded-full blur-3xl animate-pulse delay-500"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-20 flex items-center min-h-screen">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="space-y-8">
                  <div className="space-y-6">
                    <div className="inline-flex items-center space-x-2 backdrop-blur-md bg-white/90 border border-white/30 rounded-full px-4 py-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-gray-700">
                        Nationwide e‑commerce delivery across Bangladesh
                      </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                      <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                        Smart parcel delivery
                      </span>
                      <br />
                      <span className="text-red-500">Across Bangladesh</span>
                    </h1>

                    <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-lg">
                      Power your online business with fast doorstep delivery,
                      cash-on-delivery collection and transparent tracking for
                      every shipment, from Dhaka to all 64 districts.
                    </p>
                  </div>

                  {/* Track & Primary CTAs */}
                  <div className="space-y-5">
                    {/* Tracking input */}
                    <div className="bg-white/90 border border-red-100 rounded-2xl shadow-lg px-4 py-3 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                      <div className="flex items-center gap-2 flex-1">
                        <Search className="w-5 h-5 text-gray-500" />
                        <input
                          type="text"
                          placeholder="Enter tracking ID / order ID"
                          className="w-full bg-transparent outline-none text-sm sm:text-base text-gray-800 placeholder:text-gray-400"
                        />
                      </div>
                      <Link
                        href="/dashboard/user/track-parcel"
                        className="inline-flex justify-center items-center px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition"
                      >
                        Track Parcel
                      </Link>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        href="/send-parcel"
                        className="group bg-gradient-to-r from-red-500 to-rose-600 px-8 py-4 rounded-2xl text-white font-semibold hover:from-red-600 hover:to-rose-700 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                      >
                        <span className="flex items-center justify-center space-x-2">
                          <Package className="w-5 h-5" />
                          <span>Create Order</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Link>

                      <button className="backdrop-blur-md bg-white/70 border border-red-200 px-8 py-4 rounded-2xl text-red-600 font-semibold hover:bg-white transition-all shadow-lg">
                        <span className="flex items-center justify-center space-x-2">
                          <Info className="w-5 h-5" />
                          <span>Merchant Solutions</span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Content - Bike Rider Lottie */}
                <div className="relative flex justify-center items-center">
                  <Lottie
                    animationData={bikeRider}
                    loop={true}
                    className="w-full h-full max-w-md max-h-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      {/* bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-20"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
            className="fill-red-100/70"
          />
        </svg>
      </div>
    </section>
  );
}
