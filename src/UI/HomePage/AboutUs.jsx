"use client";
import Lottie from "lottie-react";
import bikeGuy from "../../assets/delivery-guy-2.json";
import { HeartHandshake, ShieldCheck, Truck } from "lucide-react";

export default function AboutUsSection() {
  return (
    <section className="relative bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* LEFT SIDE (LOTTIE) -  */}
        <div className="flex justify-center items-center order-2 lg:order-1">
          <Lottie
            animationData={bikeGuy}
            loop={true}
            className="w-full h-full max-w-md max-h-md"
          />
        </div>

        {/* RIGHT SIDE (TEXT) - show first on mobile */}
        <div className="space-y-6 order-1 lg:order-2">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
            About <span className="text-red-600">Us</span>
          </h2>

          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
            At{" "}
            <span className="font-bold ">Swift Delivery</span>,
            we are more than just a courier service. Our mission is to make
            every delivery fast, secure, and hassle-free. With a dedicated team
            and advanced tracking systems, we ensure your parcels reach their
            destination safely, no matter where in Bangladesh you are.
          </p>

          {/* FEATURES */}
          <div className="flex justify-between pt-4">
            <div className="flex items-start space-x-3">
              <ShieldCheck className="w-7 h-7 text-red-600 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900">
                  Trusted & Secure
                </h4>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Truck className="w-7 h-7 text-red-600 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900">
                  Nationwide Delivery
                </h4>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <HeartHandshake className="w-7 h-7 text-red-600 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900">Customer First</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
