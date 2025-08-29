"use client";
import { Package, ArrowRight, Info } from "lucide-react";
import Lottie from "lottie-react";
import bikeRider from "../../assets/delivery-guy.json";
import Container from "@/Components/Shared/Container/Container";

export default function CourierHeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 ">
      <Container>
        <div className="min-h-screen relative overflow-hidden">
          {/* Background Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-40 right-20 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-purple-200/25 rounded-full blur-3xl animate-pulse delay-500"></div>
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
                        Fast & Reliable Delivery
                      </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                      <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                        Swift Delivery
                      </span>
                      <br />
                      <span className="text-red-500">Across Bangladesh</span>
                    </h1>

                    <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-lg">
                      Experience lightning-fast courier services with real-time
                      tracking, secure handling, and doorstep delivery across
                      all major cities in Bangladesh.
                    </p>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="group bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-4 rounded-2xl text-white font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                      <span className="flex items-center justify-center space-x-2">
                        <Package className="w-5 h-5" />
                        <span>Book Delivery</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>

                    <button className="backdrop-blur-md bg-white/70 border border-red-200 px-8 py-4 rounded-2xl text-red-600 font-semibold hover:bg-white transition-all shadow-lg">
                      <span className="flex items-center justify-center space-x-2">
                        <Info className="w-5 h-5" />
                        <span>Know More</span>
                      </span>
                    </button>
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
