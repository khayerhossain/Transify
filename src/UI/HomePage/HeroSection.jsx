import { Package, Clock, Shield, ArrowRight, MapPin } from "lucide-react";

export default function CourierHeroSection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
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
                <div className="inline-flex items-center space-x-2 backdrop-blur-md bg-white/20 border border-white/30 rounded-full px-4 py-2">
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
                  <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                    Across Bangladesh
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-lg">
                  Experience lightning-fast courier services with real-time
                  tracking, secure handling, and doorstep delivery across all
                  major cities in Bangladesh.
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

                <button className="backdrop-blur-md bg-white/20 border border-white/30 px-8 py-4 rounded-2xl text-gray-700 font-semibold hover:bg-white/30 transition-all shadow-lg">
                  <span className="flex items-center justify-center space-x-2">
                    <MapPin className="w-5 h-5" />
                    <span>Track Package</span>
                  </span>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    10k+
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Happy Customers
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    50+
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Cities Covered
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    24/7
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Support</div>
                </div>
              </div>
            </div>

            {/* Right Content - Delivery Man Animation */}
            <div className="relative flex justify-center items-center">
              {/* Delivery Man Character */}
              <div className="relative">
                {/* Main Character */}
                <div className="backdrop-blur-xl bg-white/30 border border-white/40 rounded-full p-8 shadow-2xl w-80 h-80 flex items-center justify-center">
                  {/* Delivery Man SVG */}
                  <div className="relative animate-bounce">
                    <svg
                      className="w-40 h-40"
                      viewBox="0 0 200 200"
                      fill="none"
                    >
                      {/* Head */}
                      <circle cx="100" cy="60" r="25" fill="#FDE68A" />
                      {/* Hair */}
                      <path
                        d="M75 45 C75 35, 125 35, 125 45 C125 35, 115 25, 100 25 C85 25, 75 35, 75 45"
                        fill="#92400E"
                      />
                      {/* Eyes */}
                      <circle cx="92" cy="58" r="2" fill="#000" />
                      <circle cx="108" cy="58" r="2" fill="#000" />
                      {/* Smile */}
                      <path
                        d="M90 68 Q100 75 110 68"
                        stroke="#000"
                        strokeWidth="2"
                        fill="none"
                      />

                      {/* Body */}
                      <rect
                        x="80"
                        y="85"
                        width="40"
                        height="60"
                        rx="8"
                        fill="#3B82F6"
                      />
                      {/* Company Logo on Shirt */}
                      <rect
                        x="90"
                        y="95"
                        width="20"
                        height="15"
                        rx="3"
                        fill="#FFF"
                      />
                      <text
                        x="100"
                        y="105"
                        textAnchor="middle"
                        fontSize="8"
                        fill="#3B82F6"
                        fontWeight="bold"
                      >
                        SC
                      </text>

                      {/* Arms */}
                      <ellipse
                        cx="70"
                        cy="105"
                        rx="8"
                        ry="20"
                        fill="#FDE68A"
                        transform="rotate(-20 70 105)"
                      />
                      <ellipse
                        cx="130"
                        cy="105"
                        rx="8"
                        ry="20"
                        fill="#FDE68A"
                        transform="rotate(20 130 105)"
                      />

                      {/* Package in Hand */}
                      <rect
                        x="125"
                        y="90"
                        width="15"
                        height="12"
                        rx="2"
                        fill="#F59E0B"
                        transform="rotate(15 132 96)"
                      />
                      <path
                        d="M125 90 L140 90 M125 96 L140 96 M132 90 L132 102"
                        stroke="#92400E"
                        strokeWidth="1"
                        transform="rotate(15 132 96)"
                      />

                      {/* Legs */}
                      <rect
                        x="90"
                        y="145"
                        width="8"
                        height="30"
                        fill="#1E40AF"
                      />
                      <rect
                        x="102"
                        y="145"
                        width="8"
                        height="30"
                        fill="#1E40AF"
                      />
                      {/* Shoes */}
                      <ellipse cx="94" cy="180" rx="8" ry="5" fill="#000" />
                      <ellipse cx="106" cy="180" rx="8" ry="5" fill="#000" />
                    </svg>
                  </div>
                </div>

                {/* Animated Package Route */}
                <div className="absolute -top-10 -right-10">
                  <div className="relative">
                    {/* Package Animation */}
                    <div className="animate-pulse">
                      <div className="backdrop-blur-md bg-white/40 border border-white/50 rounded-lg p-3 shadow-lg">
                        <Package className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    {/* Dotted Path */}
                    <div className="absolute top-8 left-3 w-1 h-20 border-l-2 border-dashed border-blue-400 animate-pulse"></div>
                  </div>
                </div>

                {/* Speed Lines */}
                <div className="absolute top-1/2 -right-20 transform -translate-y-1/2">
                  <div className="space-y-2">
                    <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-transparent rounded animate-pulse"></div>
                    <div className="w-8 h-1 bg-gradient-to-r from-blue-400 to-transparent rounded animate-pulse delay-100"></div>
                    <div className="w-10 h-1 bg-gradient-to-r from-blue-400 to-transparent rounded animate-pulse delay-200"></div>
                  </div>
                </div>

                {/* Floating Status Cards */}
                <div className="absolute -top-8 -left-16 backdrop-blur-xl bg-white/25 border border-white/40 rounded-xl p-4 shadow-xl animate-pulse">
                  <div className="text-center space-y-1">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-lg mx-auto w-fit">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs font-bold text-gray-800">On Time</p>
                  </div>
                </div>

                <div className="absolute -bottom-12 -right-12 backdrop-blur-xl bg-white/25 border border-white/40 rounded-xl p-4 shadow-xl animate-pulse delay-500">
                  <div className="text-center space-y-1">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-lg mx-auto w-fit">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs font-bold text-gray-800">Secure</p>
                  </div>
                </div>

                {/* Tracking Info */}
                <div className="absolute -bottom-16 -left-8 backdrop-blur-xl bg-white/30 border border-white/40 rounded-2xl p-4 shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 font-medium">
                        Tracking ID:
                      </span>
                      <span className="text-blue-600 font-bold">#SC001</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-1.5 rounded-full w-4/5 animate-pulse"></div>
                    </div>
                    <div className="text-xs text-gray-500">Dhaka → Sylhet</div>
                  </div>
                </div>
              </div>

              {/* Floating Icons Animation */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 right-20 animate-bounce delay-300">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Package className="w-4 h-4 text-blue-600" />
                  </div>
                </div>
                <div className="absolute bottom-20 right-10 animate-bounce delay-700">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Clock className="w-4 h-4 text-green-600" />
                  </div>
                </div>
                <div className="absolute top-1/2 right-32 animate-bounce delay-500">
                  <div className="bg-indigo-100 p-2 rounded-full">
                    <MapPin className="w-4 h-4 text-indigo-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-20"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
            className="fill-white/10"
          />
        </svg>
      </div>
    </div>
  );
}
