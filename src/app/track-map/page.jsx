"use client";
import React, { useState, useRef } from "react";
import { Search, MapPin, Navigation } from "lucide-react";

const Bangladesh3DMapComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Bangladesh districts with coordinates
  const districts = [
    {
      name: "Dhaka",
      division: "Dhaka",
      x: 50,
      y: 45,
      population: "9.5M",
      zone: "central",
    },
    {
      name: "Chittagong",
      division: "Chittagong",
      x: 75,
      y: 60,
      population: "2.5M",
      zone: "south-east",
    },
    {
      name: "Sylhet",
      division: "Sylhet",
      x: 70,
      y: 25,
      population: "500K",
      zone: "north-east",
    },
    {
      name: "Rajshahi",
      division: "Rajshahi",
      x: 25,
      y: 30,
      population: "450K",
      zone: "north-west",
    },
    {
      name: "Khulna",
      division: "Khulna",
      x: 25,
      y: 65,
      population: "660K",
      zone: "south-west",
    },
    {
      name: "Barisal",
      division: "Barisal",
      x: 35,
      y: 75,
      population: "330K",
      zone: "south",
    },
    {
      name: "Rangpur",
      division: "Rangpur",
      x: 30,
      y: 15,
      population: "300K",
      zone: "north",
    },
    {
      name: "Mymensingh",
      division: "Mymensingh",
      x: 50,
      y: 30,
      population: "500K",
      zone: "central",
    },
    {
      name: "Comilla",
      division: "Chittagong",
      x: 65,
      y: 50,
      population: "390K",
      zone: "central-east",
    },
    {
      name: "Gazipur",
      division: "Dhaka",
      x: 52,
      y: 40,
      population: "350K",
      zone: "central",
    },
    {
      name: "Narayanganj",
      division: "Dhaka",
      x: 55,
      y: 48,
      population: "280K",
      zone: "central",
    },
    {
      name: "Bogra",
      division: "Rajshahi",
      x: 30,
      y: 25,
      population: "350K",
      zone: "north-west",
    },
    {
      name: "Jessore",
      division: "Khulna",
      x: 20,
      y: 55,
      population: "240K",
      zone: "south-west",
    },
    {
      name: "Dinajpur",
      division: "Rangpur",
      x: 25,
      y: 12,
      population: "300K",
      zone: "north",
    },
    {
      name: "Pabna",
      division: "Rajshahi",
      x: 35,
      y: 35,
      population: "250K",
      zone: "central-west",
    },
    {
      name: "Tangail",
      division: "Dhaka",
      x: 45,
      y: 38,
      population: "380K",
      zone: "central",
    },
    {
      name: "Jamalpur",
      division: "Mymensingh",
      x: 48,
      y: 28,
      population: "230K",
      zone: "central-north",
    },
    {
      name: "Faridpur",
      division: "Dhaka",
      x: 40,
      y: 52,
      population: "180K",
      zone: "central-south",
    },
    {
      name: "Kushtia",
      division: "Khulna",
      x: 25,
      y: 45,
      population: "200K",
      zone: "west",
    },
    {
      name: "Satkhira",
      division: "Khulna",
      x: 18,
      y: 65,
      population: "200K",
      zone: "south-west",
    },
    {
      name: "Cox's Bazar",
      division: "Chittagong",
      x: 82,
      y: 75,
      population: "220K",
      zone: "south-east",
    },
    {
      name: "Brahmanbaria",
      division: "Chittagong",
      x: 68,
      y: 45,
      population: "280K",
      zone: "east",
    },
    {
      name: "Kishoreganj",
      division: "Dhaka",
      x: 58,
      y: 38,
      population: "300K",
      zone: "central-east",
    },
    {
      name: "Habiganj",
      division: "Sylhet",
      x: 65,
      y: 30,
      population: "200K",
      zone: "north-east",
    },
    {
      name: "Moulvibazar",
      division: "Sylhet",
      x: 72,
      y: 28,
      population: "190K",
      zone: "north-east",
    },
    {
      name: "Sunamganj",
      division: "Sylhet",
      x: 62,
      y: 22,
      population: "240K",
      zone: "north-east",
    },
    {
      name: "Feni",
      division: "Chittagong",
      x: 72,
      y: 55,
      population: "140K",
      zone: "south-east",
    },
    {
      name: "Noakhali",
      division: "Chittagong",
      x: 70,
      y: 65,
      population: "310K",
      zone: "south-east",
    },
    {
      name: "Lakshmipur",
      division: "Chittagong",
      x: 68,
      y: 70,
      population: "170K",
      zone: "south-east",
    },
    {
      name: "Chandpur",
      division: "Chittagong",
      x: 60,
      y: 55,
      population: "240K",
      zone: "south-east",
    },
  ];

  const filteredDistricts = districts.filter((district) =>
    district.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = () => {
    if (filteredDistricts.length > 0) {
      const district = filteredDistricts[0];
      setIsSearching(true);
      setSelectedDistrict(district);
      setShowDropdown(false);

      setTimeout(() => {
        setIsSearching(false);
      }, 1200);
    }
  };

  const handleDistrictSelect = (district) => {
    setIsSearching(true);
    setSelectedDistrict(district);
    setSearchTerm(district.name);
    setShowDropdown(false);

    setTimeout(() => {
      setIsSearching(false);
    }, 1200);
  };

  const handleReset = () => {
    setSelectedDistrict(null);
    setSearchTerm("");
    setShowDropdown(false);
  };

  const getDistrictColor = (district) => {
    if (selectedDistrict?.name === district.name) return "#dc2626";
    switch (district.zone) {
      case "central":
        return "#ef4444";
      case "north":
        return "#f97316";
      case "south":
        return "#06b6d4";
      case "east":
        return "#10b981";
      case "west":
        return "#8b5cf6";
      default:
        return "#ef4444";
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            We are available in 64 districts
          </h1>
          <p className="text-lg text-gray-600">
            We deliver almost all over Bangladesh
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 backdrop-blur-sm bg-white/90">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search here"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowDropdown(e.target.value.length > 0);
                  }}
                  className="w-full pl-12 pr-4 py-4 border-0 bg-gray-50 rounded-xl text-lg focus:ring-2 focus:ring-red-500 focus:bg-white transition-all duration-300 shadow-inner"
                />
              </div>

              {showDropdown && searchTerm && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-2xl z-20 max-h-60 overflow-y-auto mt-2">
                  {filteredDistricts.length > 0 ? (
                    filteredDistricts.map((district, index) => (
                      <button
                        key={index}
                        onClick={() => handleDistrictSelect(district)}
                        className="w-full text-left p-4 hover:bg-red-50 border-b border-gray-100 last:border-b-0 transition-all duration-200 group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 rounded-full bg-red-500 group-hover:scale-125 transition-transform"></div>
                          <div>
                            <div className="font-semibold text-gray-800">
                              {district.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {district.division} Division
                            </div>
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="p-4 text-gray-500 text-center">
                      No districts found
                    </div>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={handleSearch}
              className="px-8 py-4 bg-lime-400 hover:bg-lime-500 text-gray-800 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Search
            </button>

            {selectedDistrict && (
              <button
                onClick={handleReset}
                className="px-6 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-medium transition-all duration-300"
              >
                Reset
              </button>
            )}
          </div>

          {/* Selected District Info */}
          {selectedDistrict && (
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-4 border-l-4 border-red-500">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                <div>
                  <div className="font-bold text-gray-800 text-lg">
                    {selectedDistrict.name}
                  </div>
                  <div className="text-gray-600">
                    {selectedDistrict.division} Division • Population:{" "}
                    {selectedDistrict.population}
                  </div>
                </div>
                <div className="ml-auto">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    Available
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3D Map Container */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Map Grid Display */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Map 1 */}
            <div className="relative bg-gradient-to-br from-blue-50 to-cyan-50 border-r border-gray-200 last:border-r-0">
              <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 z-10">
                <div className="text-sm font-semibold text-gray-700">
                  North Region
                </div>
              </div>
              <svg
                viewBox="0 0 100 100"
                className={`w-full h-80 transition-all duration-1000 ${
                  selectedDistrict && selectedDistrict.zone.includes("north")
                    ? "scale-110"
                    : "scale-100"
                } ${isSearching ? "animate-pulse" : ""}`}
                style={{
                  filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.1))",
                  transformOrigin:
                    selectedDistrict && selectedDistrict.zone.includes("north")
                      ? `${selectedDistrict.x}% ${selectedDistrict.y}%`
                      : "center",
                }}
              >
                {/* Bangladesh Outline */}
                <defs>
                  <linearGradient
                    id="mapGradient1"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#e0f2fe" />
                    <stop offset="100%" stopColor="#bae6fd" />
                  </linearGradient>
                  <filter id="shadow1">
                    <feDropShadow
                      dx="2"
                      dy="4"
                      stdDeviation="3"
                      floodColor="#000"
                      floodOpacity="0.2"
                    />
                  </filter>
                </defs>

                <path
                  d="M20,15 L35,8 L45,12 L55,8 L70,15 L80,25 L85,40 L82,60 L78,75 L70,85 L50,88 L30,85 L15,75 L12,60 L15,40 L20,25 Z"
                  fill="url(#mapGradient1)"
                  stroke="#0ea5e9"
                  strokeWidth="0.8"
                  filter="url(#shadow1)"
                />

                {/* District Points */}
                {districts
                  .filter((d) => d.zone.includes("north"))
                  .map((district, index) => (
                    <g key={index}>
                      <circle
                        cx={district.x}
                        cy={district.y}
                        r={
                          selectedDistrict?.name === district.name ? "3.5" : "2"
                        }
                        fill={getDistrictColor(district)}
                        stroke="white"
                        strokeWidth="0.8"
                        className={`cursor-pointer transition-all duration-500 hover:scale-150 ${
                          selectedDistrict?.name === district.name
                            ? "animate-bounce"
                            : ""
                        }`}
                        onClick={() => handleDistrictSelect(district)}
                        filter="url(#shadow1)"
                      />
                      {selectedDistrict?.name === district.name && (
                        <text
                          x={district.x}
                          y={district.y - 5}
                          textAnchor="middle"
                          fontSize="3"
                          fill="#1f2937"
                          fontWeight="bold"
                          className="pointer-events-none"
                        >
                          {district.name}
                        </text>
                      )}
                    </g>
                  ))}
              </svg>
            </div>

            {/* Map 2 */}
            <div className="relative bg-gradient-to-br from-emerald-50 to-green-50 border-r border-gray-200 last:border-r-0">
              <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 z-10">
                <div className="text-sm font-semibold text-gray-700">
                  Central Region
                </div>
              </div>
              <svg
                viewBox="0 0 100 100"
                className={`w-full h-80 transition-all duration-1000 ${
                  selectedDistrict && selectedDistrict.zone.includes("central")
                    ? "scale-110"
                    : "scale-100"
                } ${isSearching ? "animate-pulse" : ""}`}
                style={{
                  filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.1))",
                  transformOrigin:
                    selectedDistrict &&
                    selectedDistrict.zone.includes("central")
                      ? `${selectedDistrict.x}% ${selectedDistrict.y}%`
                      : "center",
                }}
              >
                <defs>
                  <linearGradient
                    id="mapGradient2"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#dcfce7" />
                    <stop offset="100%" stopColor="#bbf7d0" />
                  </linearGradient>
                  <filter id="shadow2">
                    <feDropShadow
                      dx="2"
                      dy="4"
                      stdDeviation="3"
                      floodColor="#000"
                      floodOpacity="0.2"
                    />
                  </filter>
                </defs>

                <path
                  d="M20,15 L35,8 L45,12 L55,8 L70,15 L80,25 L85,40 L82,60 L78,75 L70,85 L50,88 L30,85 L15,75 L12,60 L15,40 L20,25 Z"
                  fill="url(#mapGradient2)"
                  stroke="#22c55e"
                  strokeWidth="0.8"
                  filter="url(#shadow2)"
                />

                {districts
                  .filter((d) => d.zone.includes("central"))
                  .map((district, index) => (
                    <g key={index}>
                      <circle
                        cx={district.x}
                        cy={district.y}
                        r={
                          selectedDistrict?.name === district.name ? "3.5" : "2"
                        }
                        fill={getDistrictColor(district)}
                        stroke="white"
                        strokeWidth="0.8"
                        className={`cursor-pointer transition-all duration-500 hover:scale-150 ${
                          selectedDistrict?.name === district.name
                            ? "animate-bounce"
                            : ""
                        }`}
                        onClick={() => handleDistrictSelect(district)}
                        filter="url(#shadow2)"
                      />
                      {selectedDistrict?.name === district.name && (
                        <text
                          x={district.x}
                          y={district.y - 5}
                          textAnchor="middle"
                          fontSize="3"
                          fill="#1f2937"
                          fontWeight="bold"
                          className="pointer-events-none"
                        >
                          {district.name}
                        </text>
                      )}
                    </g>
                  ))}
              </svg>
            </div>

            {/* Map 3 */}
            <div className="relative bg-gradient-to-br from-purple-50 to-pink-50">
              <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 z-10">
                <div className="text-sm font-semibold text-gray-700">
                  South Region
                </div>
              </div>
              <svg
                viewBox="0 0 100 100"
                className={`w-full h-80 transition-all duration-1000 ${
                  selectedDistrict && selectedDistrict.zone.includes("south")
                    ? "scale-110"
                    : "scale-100"
                } ${isSearching ? "animate-pulse" : ""}`}
                style={{
                  filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.1))",
                  transformOrigin:
                    selectedDistrict && selectedDistrict.zone.includes("south")
                      ? `${selectedDistrict.x}% ${selectedDistrict.y}%`
                      : "center",
                }}
              >
                <defs>
                  <linearGradient
                    id="mapGradient3"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#fdf2f8" />
                    <stop offset="100%" stopColor="#fce7f3" />
                  </linearGradient>
                  <filter id="shadow3">
                    <feDropShadow
                      dx="2"
                      dy="4"
                      stdDeviation="3"
                      floodColor="#000"
                      floodOpacity="0.2"
                    />
                  </filter>
                </defs>

                <path
                  d="M20,15 L35,8 L45,12 L55,8 L70,15 L80,25 L85,40 L82,60 L78,75 L70,85 L50,88 L30,85 L15,75 L12,60 L15,40 L20,25 Z"
                  fill="url(#mapGradient3)"
                  stroke="#ec4899"
                  strokeWidth="0.8"
                  filter="url(#shadow3)"
                />

                {districts
                  .filter((d) => d.zone.includes("south"))
                  .map((district, index) => (
                    <g key={index}>
                      <circle
                        cx={district.x}
                        cy={district.y}
                        r={
                          selectedDistrict?.name === district.name ? "3.5" : "2"
                        }
                        fill={getDistrictColor(district)}
                        stroke="white"
                        strokeWidth="0.8"
                        className={`cursor-pointer transition-all duration-500 hover:scale-150 ${
                          selectedDistrict?.name === district.name
                            ? "animate-bounce"
                            : ""
                        }`}
                        onClick={() => handleDistrictSelect(district)}
                        filter="url(#shadow3)"
                      />
                      {selectedDistrict?.name === district.name && (
                        <text
                          x={district.x}
                          y={district.y - 5}
                          textAnchor="middle"
                          fontSize="3"
                          fill="#1f2937"
                          fontWeight="bold"
                          className="pointer-events-none"
                        >
                          {district.name}
                        </text>
                      )}
                    </g>
                  ))}
              </svg>
            </div>
          </div>

          {/* Loading Overlay */}
          {isSearching && (
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center z-30 backdrop-blur-sm">
              <div className="bg-white rounded-2xl p-8 flex items-center space-x-4 shadow-2xl transform scale-110">
                <div className="relative">
                  <div className="w-8 h-8 border-4 border-red-200 rounded-full"></div>
                  <div className="absolute inset-0 w-8 h-8 border-4 border-red-500 rounded-full animate-spin border-t-transparent"></div>
                </div>
                <span className="text-gray-700 font-semibold text-lg">
                  Locating {selectedDistrict?.name}...
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Map Footer Info */}
        <div className="bg-white rounded-b-3xl -mt-1 pt-6 pb-4 px-6">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6 text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Metro Cities</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span>District Towns</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                <span>Coastal Areas</span>
              </div>
            </div>
            <div className="font-semibold text-gray-800">
              64 Districts • 8 Divisions • 24/7 Service
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bangladesh3DMapComponent;
