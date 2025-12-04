"use client";
import React, { useState, useEffect } from 'react';
import { Search, MapPin, CheckCircle2, Package, Clock, TrendingUp } from 'lucide-react';
import Container from '../../../Components/Shared/Container/Container';
import Image from 'next/image';

const CoveragePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // all, dhaka, chittagong, etc.

  // All 64 districts organized by division
  const districts = [
    // Dhaka Division
    { name: 'Dhaka', division: 'Dhaka', position: 'top-[48%] left-[47%]', deliveryTime: '24h', coverage: '100%' },
    { name: 'Gazipur', division: 'Dhaka', position: 'top-[44%] left-[48%]', deliveryTime: '24h', coverage: '100%' },
    { name: 'Narayanganj', division: 'Dhaka', position: 'top-[50%] left-[48%]', deliveryTime: '24h', coverage: '100%' },
    { name: 'Tangail', division: 'Dhaka', position: 'top-[40%] left-[46%]', deliveryTime: '24-48h', coverage: '100%' },
    { name: 'Kishoreganj', division: 'Dhaka', position: 'top-[42%] left-[52%]', deliveryTime: '24-48h', coverage: '100%' },
    { name: 'Manikganj', division: 'Dhaka', position: 'top-[48%] left-[44%]', deliveryTime: '24-48h', coverage: '100%' },
    { name: 'Munshiganj', division: 'Dhaka', position: 'top-[52%] left-[46%]', deliveryTime: '24-48h', coverage: '100%' },
    { name: 'Narsingdi', division: 'Dhaka', position: 'top-[48%] left-[50%]', deliveryTime: '24-48h', coverage: '100%' },
    { name: 'Faridpur', division: 'Dhaka', position: 'top-[55%] left-[40%]', deliveryTime: '24-48h', coverage: '100%' },
    { name: 'Gopalganj', division: 'Dhaka', position: 'top-[60%] left-[38%]', deliveryTime: '48-72h', coverage: '95%' },
    { name: 'Madaripur', division: 'Dhaka', position: 'top-[58%] left-[42%]', deliveryTime: '48-72h', coverage: '95%' },
    { name: 'Rajbari', division: 'Dhaka', position: 'top-[52%] left-[40%]', deliveryTime: '48-72h', coverage: '95%' },
    { name: 'Shariatpur', division: 'Dhaka', position: 'top-[57%] left-[44%]', deliveryTime: '48-72h', coverage: '95%' },

    // Chittagong Division  
    { name: 'Chittagong', division: 'Chittagong', position: 'top-[58%] right-[18%]', deliveryTime: '24-48h', coverage: '100%' },
    { name: "Cox's Bazar", division: 'Chittagong', position: 'bottom-[12%] right-[8%]', deliveryTime: '48-72h', coverage: '100%' },
    { name: 'Comilla', division: 'Chittagong', position: 'top-[55%] left-[55%]', deliveryTime: '24-48h', coverage: '100%' },
    { name: 'Feni', division: 'Chittagong', position: 'top-[60%] right-[25%]', deliveryTime: '48-72h', coverage: '95%' },
    { name: 'Brahmanbaria', division: 'Chittagong', position: 'top-[52%] left-[54%]', deliveryTime: '48-72h', coverage: '95%' },
    { name: 'Rangamati', division: 'Chittagong', position: 'bottom-[28%] right-[15%]', deliveryTime: '72-96h', coverage: '90%' },
    { name: 'Khagrachhari', division: 'Chittagong', position: 'bottom-[25%] right-[18%]', deliveryTime: '72-96h', coverage: '90%' },
    { name: 'Bandarban', division: 'Chittagong', position: 'bottom-[18%] right-[22%]', deliveryTime: '72-96h', coverage: '85%' },
    { name: 'Noakhali', division: 'Chittagong', position: 'top-[63%] right-[22%]', deliveryTime: '48-72h', coverage: '95%' },
    { name: 'Lakshmipur', division: 'Chittagong', position: 'top-[65%] right-[26%]', deliveryTime: '48-72h', coverage: '95%' },
    { name: 'Chandpur', division: 'Chittagong', position: 'top-[58%] left-[50%]', deliveryTime: '48-72h', coverage: '95%' },

    // Rajshahi Division
    { name: 'Rajshahi', division: 'Rajshahi', position: 'top-[35%] left-[28%]', deliveryTime: '24-48h', coverage: '100%' },
    { name: 'Bogra', division: 'Rajshahi', position: 'top-[30%] left-[35%]', deliveryTime: '24-48h', coverage: '100%' },
    { name: 'Pabna', division: 'Rajshahi', position: 'top-[38%] left-[38%]', deliveryTime: '48-72h', coverage: '95%' },
    { name: 'Sirajganj', division: 'Rajshahi', position: 'top-[40%] left-[40%]', deliveryTime: '48-72h', coverage: '95%' },
    { name: 'Natore', division: 'Rajshahi', position: 'top-[34%] left-[32%]', deliveryTime: '48-72h', coverage: '95%' },
    { name: 'Naogaon', division: 'Rajshahi', position: 'top-[28%] left-[30%]', deliveryTime: '48-72h', coverage: '95%' },
    { name: 'Chapainawabganj', division: 'Rajshahi', position: 'top-[35%] left-[24%]', deliveryTime: '72-96h', coverage: '90%' },
    { name: 'Joypurhat', division: 'Rajshahi', position: 'top-[26%] left-[33%]', deliveryTime: '72-96h', coverage: '90%' },

    // Add more districts for other divisions...
    { name: 'Khulna', division: 'Khulna', position: 'bottom-[32%] left-[28%]', deliveryTime: '24-48h', coverage: '100%' },
    { name: 'Jashore', division: 'Khulna', position: 'bottom-[38%] left-[24%]', deliveryTime: '48-72h', coverage: '95%' },
    { name: 'Satkhira', division: 'Khulna', position: 'bottom-[30%] left-[22%]', deliveryTime: '48-72h', coverage: '95%' },
    { name: 'Bagerhat', division: 'Khulna', position: 'bottom-[28%] left-[30%]', deliveryTime: '48-72h', coverage: '95%' },

    { name: 'Sylhet', division: 'Sylhet', position: 'top-[25%] right-[18%]', deliveryTime: '24-48h', coverage: '100%' },
    { name: 'Moulvibazar', division: 'Sylhet', position: 'top-[30%] right-[16%]', deliveryTime: '48-72h', coverage: '95%' },
    { name: 'Habiganj', division: 'Sylhet', position: 'top-[32%] right-[22%]', deliveryTime: '48-72h', coverage: '95%' },
    { name: 'Sunamganj', division: 'Sylhet', position: 'top-[22%] right-[28%]', deliveryTime: '72-96h', coverage: '90%' },

    { name: 'Barisal', division: 'Barisal', position: 'bottom-[35%] left-[42%]', deliveryTime: '48-72h', coverage: '100%' },
    { name: 'Patuakhali', division: 'Barisal', position: 'bottom-[28%] left-[42%]', deliveryTime: '48-72h', coverage: '95%' },
    { name: 'Bhola', division: 'Barisal', position: 'bottom-[32%] left-[46%]', deliveryTime: '48-72h', coverage: '95%' },

    { name: 'Rangpur', division: 'Rangpur', position: 'top-[18%] left-[35%]', deliveryTime: '24-48h', coverage: '100%' },
    { name: 'Dinajpur', division: 'Rangpur', position: 'top-[15%] left-[30%]', deliveryTime: '48-72h', coverage: '95%' },
    { name: 'Kurigram', division: 'Rangpur', position: 'top-[15%] left-[40%]', deliveryTime: '48-72h', coverage: '95%' },

    { name: 'Mymensingh', division: 'Mymensingh', position: 'top-[32%] left-[47%]', deliveryTime: '24-48h', coverage: '100%' },
    { name: 'Netrokona', division: 'Mymensingh', position: 'top-[28%] left-[50%]', deliveryTime: '48-72h', coverage: '95%' },
    { name: 'Jamalpur', division: 'Mymensingh', position: 'top-[30%] left-[42%]', deliveryTime: '48-72h', coverage: '95%' },
  ];

  const filteredDistricts = districts.filter(district =>
    (activeTab === 'all' || district.division.toLowerCase() === activeTab) &&
    district.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { icon: <MapPin className="w-6 h-6" />, label: 'Districts Covered', value: '64', color: 'from-red-500 to-rose-600' },
    { icon: <Package className="w-6 h-6" />, label: 'Daily Deliveries', value: '5000+', color: 'from-blue-500 to-cyan-600' },
    { icon: <Clock className="w-6 h-6" />, label: 'Avg Delivery', value: '24-48h', color: 'from-purple-500 to-pink-600' },
    { icon: <TrendingUp className="w-6 h-6" />, label: 'Success Rate', value: '99.5%', color: 'from-green-500 to-emerald-600' },
  ];

  const divisions = ['all', 'dhaka', 'chittagong', 'rajshahi', 'khulna', 'sylhet', 'barisal', 'rangpur', 'mymensingh'];

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-gray-50 min-h-screen pt-24 pb-16">
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Nationwide{' '}
            <span className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 bg-clip-text text-transparent">
              Coverage
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Delivering to every corner of Bangladesh with speed and reliability
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-white mb-3`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search district or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Division Tabs */}
          <div className="flex flex-wrap gap-2 mt-4">
            {divisions.map((division) => (
              <button
                key={division}
                onClick={() => setActiveTab(division)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === division
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {division.charAt(0).toUpperCase() + division.slice(1)}
              </button>
            ))}
          </div>

          {selectedDistrict && (
            <div className="mt-4 p-4 bg-gradient-to-r from-red-50 to-rose-50 rounded-xl border-l-4 border-red-600">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{selectedDistrict.name}</h3>
                  <p className="text-sm text-gray-600">
                    {selectedDistrict.division} Division • {selectedDistrict.deliveryTime} delivery • {selectedDistrict.coverage} coverage
                  </p>
                </div>
                <button
                  onClick={() => setSelectedDistrict(null)}
                  className="text-red-600 hover:text-red-700 font-semibold"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Map Section */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              <div className="relative w-full aspect-square max-w-3xl mx-auto">
                {/* Bangladesh Map Image */}
                <Image
                  src="/bangladesh-map.png"
                  alt="Bangladesh Coverage Map"
                  width={800}
                  height={800}
                  className="w-full h-full object-contain"
                  priority
                />

                {/* Interactive District Markers */}
                {filteredDistricts.map((district, index) => (
                  <div
                    key={index}
                    className={`absolute ${district.position} transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10`}
                    onClick={() => setSelectedDistrict(district)}
                  >
                    {/* Pulse Animation */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-4 h-4 rounded-full animate-ping opacity-75 ${selectedDistrict?.name === district.name ? 'bg-red-600' : 'bg-blue-500'
                        }`}></div>
                    </div>

                    {/* Static Pin */}
                    <div className={`relative w-4 h-4 rounded-full border-2 border-white shadow-lg ${selectedDistrict?.name === district.name ? 'bg-red-600 w-6 h-6' : 'bg-blue-600'
                      }`}></div>

                    {/* Hover Tooltip */}
                    <div className="absolute left-1/2 -translate-x-1/2 -top-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="bg-gray-900 text-white text-xs font-semibold px-3 py-2 rounded-lg whitespace-nowrap shadow-xl">
                        {district.name}
                        <div className="text-gray-300 text-xs">{district.deliveryTime}</div>
                        <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* 100% Coverage Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-red-600 to-rose-600 text-white px-4 py-2 rounded-full shadow-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-bold text-sm">100% Coverage</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* District List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 max-h-[600px] overflow-y-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-600" />
                Districts ({filteredDistricts.length})
              </h3>
              <div className="space-y-2">
                {filteredDistricts.map((district, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedDistrict(district)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${selectedDistrict?.name === district.name
                        ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md'
                        : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                  >
                    <div className="font-semibold">{district.name}</div>
                    <div className={`text-sm ${selectedDistrict?.name === district.name ? 'text-red-100' : 'text-gray-600'}`}>
                      {district.division} • {district.deliveryTime}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-gradient-to-r from-red-600 to-rose-600 rounded-2xl p-8 text-center text-white shadow-2xl">
          <h2 className="text-3xl font-bold mb-3">Ready to Start Delivering?</h2>
          <p className="text-red-100 mb-6">Join thousands of merchants using our nationwide network</p>
          <button className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl">
            Get Started Today
          </button>
        </div>
      </Container>
    </div>
  );
};

export default CoveragePage;
