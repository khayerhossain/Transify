"use client";

import AnimationCar from "@/Components/AnimationCar/AnimationCar";
import { Search } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full flex flex-col items-center justify-center py-20 overflow-hidden">
      {/* Glass Search Form */}
      <div className="relative z-20 w-[90%] md:w-[70%] lg:w-[60%] backdrop-blur-md bg-white/70 shadow-xl rounded-full px-6 py-4 flex flex-col md:flex-row items-center gap-6 md:gap-8">
        {/* Location */}
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800">Location</span>
          <span className="text-gray-500 text-sm">select</span>
        </div>

        {/* Pickup Date */}
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800">Pick-up Date</span>
          <input
            type="date"
            className="outline-none text-gray-600 bg-transparent"
          />
        </div>

        {/* Return Date */}
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800">Return Date</span>
          <input
            type="date"
            className="outline-none text-gray-600 bg-transparent"
          />
        </div>

        {/* Search Button */}
        <div className="flex items-center border-b border-gray-300 pb-1 w-[200px] md:w-[300px] lg:w-[400px]">
          <Search size={18} className="text-gray-600" />
          <input
            type="text"
            placeholder="Enter location"
            className="outline-none px-2 text-sm w-full 
               bg-transparent text-gray-900 placeholder-gray-600"
          />
        </div>
      </div>

      {/* Rounded Glass Base */}
      <div className="relative w-[90%] md:w-[70%] lg:w-[60%]  z-10 flex justify-center items-end overflow-hidden">
        {/* Car will be inserted here */}
        <AnimationCar />
      </div>
    </section>
  );
}
