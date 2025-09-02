"use client";
import React, { useState, useRef } from 'react';
import { Search, MapPin, Navigation, Star } from 'lucide-react';
import Container from '../../Components/Shared/Container/Container';

const CoverageMap = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // All 64 districts with realistic coordinates and division info
  const districts = [
    // Dhaka Division (13 districts)
    { name: 'Dhaka', division: 'Dhaka', divisionColor: '#e879f9', x: 385, y: 270, capital: true, population: '9.5M' },
    { name: 'Faridpur', division: 'Dhaka', divisionColor: '#e879f9', x: 320, y: 290, capital: false, population: '180K' },
    { name: 'Gazipur', division: 'Dhaka', divisionColor: '#e879f9', x: 395, y: 250, capital: false, population: '350K' },
    { name: 'Gopalganj', division: 'Dhaka', divisionColor: '#e879f9', x: 305, y: 320, capital: false, population: '110K' },
    { name: 'Kishoreganj', division: 'Dhaka', divisionColor: '#e879f9', x: 425, y: 245, capital: false, population: '300K' },
    { name: 'Madaripur', division: 'Dhaka', divisionColor: '#e879f9', x: 335, y: 305, capital: false, population: '120K' },
    { name: 'Manikganj', division: 'Dhaka', divisionColor: '#e879f9', x: 360, y: 270, capital: false, population: '140K' },
    { name: 'Munshiganj', division: 'Dhaka', divisionColor: '#e879f9', x: 375, y: 285, capital: false, population: '150K' },
    { name: 'Narayanganj', division: 'Dhaka', divisionColor: '#e879f9', x: 390, y: 280, capital: false, population: '280K' },
    { name: 'Narsingdi', division: 'Dhaka', divisionColor: '#e879f9', x: 405, y: 270, capital: false, population: '220K' },
    { name: 'Rajbari', division: 'Dhaka', divisionColor: '#e879f9', x: 325, y: 275, capital: false, population: '100K' },
    { name: 'Shariatpur', division: 'Dhaka', divisionColor: '#e879f9', x: 350, y: 305, capital: false, population: '110K' },
    { name: 'Tangail', division: 'Dhaka', divisionColor: '#e879f9', x: 365, y: 235, capital: false, population: '380K' },

    // Chittagong Division (11 districts)
    { name: 'Chittagong', division: 'Chittagong', divisionColor: '#84cc16', x: 510, y: 340, capital: true, population: '2.5M' },
    { name: 'Bandarban', division: 'Chittagong', divisionColor: '#84cc16', x: 495, y: 415, capital: false, population: '40K' },
    { name: 'Brahmanbaria', division: 'Chittagong', divisionColor: '#84cc16', x: 445, y: 285, capital: false, population: '280K' },
    { name: 'Chandpur', division: 'Chittagong', divisionColor: '#84cc16', x: 420, y: 305, capital: false, population: '240K' },
    { name: 'Comilla', division: 'Chittagong', divisionColor: '#84cc16', x: 460, y: 300, capital: false, population: '390K' },
    { name: "Cox's Bazar", division: 'Chittagong', divisionColor: '#84cc16', x: 535, y: 440, capital: false, population: '220K' },
    { name: 'Feni', division: 'Chittagong', divisionColor: '#84cc16', x: 485, y: 320, capital: false, population: '140K' },
    { name: 'Khagrachhari', division: 'Chittagong', divisionColor: '#84cc16', x: 515, y: 395, capital: false, population: '65K' },
    { name: 'Lakshmipur', division: 'Chittagong', divisionColor: '#84cc16', x: 465, y: 340, capital: false, population: '170K' },
    { name: 'Noakhali', division: 'Chittagong', divisionColor: '#84cc16', x: 480, y: 350, capital: false, population: '310K' },
    { name: 'Rangamati', division: 'Chittagong', divisionColor: '#84cc16', x: 525, y: 380, capital: false, population: '60K' },

    // Rajshahi Division (8 districts)
    { name: 'Rajshahi', division: 'Rajshahi', divisionColor: '#fbbf24', x: 265, y: 190, capital: true, population: '450K' },
    { name: 'Bogra', division: 'Rajshahi', divisionColor: '#fbbf24', x: 295, y: 175, capital: false, population: '350K' },
    { name: 'Chapainawabganj', division: 'Rajshahi', divisionColor: '#fbbf24', x: 245, y: 205, capital: false, population: '160K' },
    { name: 'Joypurhat', division: 'Rajshahi', divisionColor: '#fbbf24', x: 275, y: 160, capital: false, population: '90K' },
    { name: 'Naogaon', division: 'Rajshahi', divisionColor: '#fbbf24', x: 255, y: 170, capital: false, population: '260K' },
    { name: 'Natore', division: 'Rajshahi', divisionColor: '#fbbf24', x: 285, y: 185, capital: false, population: '170K' },
    { name: 'Pabna', division: 'Rajshahi', divisionColor: '#fbbf24', x: 310, y: 200, capital: false, population: '250K' },
    { name: 'Sirajganj', division: 'Rajshahi', divisionColor: '#fbbf24', x: 325, y: 215, capital: false, population: '300K' },

    // Khulna Division (10 districts)
    { name: 'Khulna', division: 'Khulna', divisionColor: '#a78bfa', x: 275, y: 360, capital: true, population: '660K' },
    { name: 'Bagerhat', division: 'Khulna', divisionColor: '#a78bfa', x: 255, y: 385, capital: false, population: '150K' },
    { name: 'Chuadanga', division: 'Khulna', divisionColor: '#a78bfa', x: 225, y: 285, capital: false, population: '110K' },
    { name: 'Jashore', division: 'Khulna', divisionColor: '#a78bfa', x: 235, y: 310, capital: false, population: '280K' },
    { name: 'Jhenaidah', division: 'Khulna', divisionColor: '#a78bfa', x: 245, y: 295, capital: false, population: '170K' },
    { name: 'Kushtia', division: 'Khulna', divisionColor: '#a78bfa', x: 255, y: 265, capital: false, population: '200K' },
    { name: 'Magura', division: 'Khulna', divisionColor: '#a78bfa', x: 265, y: 295, capital: false, population: '92K' },
    { name: 'Meherpur', division: 'Khulna', divisionColor: '#a78bfa', x: 215, y: 295, capital: false, population: '65K' },
    { name: 'Narail', division: 'Khulna', divisionColor: '#a78bfa', x: 255, y: 325, capital: false, population: '72K' },
    { name: 'Satkhira', division: 'Khulna', divisionColor: '#a78bfa', x: 235, y: 365, capital: false, population: '200K' },

    // Sylhet Division (4 districts)
    { name: 'Sylhet', division: 'Sylhet', divisionColor: '#06b6d4', x: 515, y: 185, capital: true, population: '500K' },
    { name: 'Habiganj', division: 'Sylhet', divisionColor: '#06b6d4', x: 485, y: 205, capital: false, population: '200K' },
    { name: 'Moulvibazar', division: 'Sylhet', divisionColor: '#06b6d4', x: 505, y: 215, capital: false, population: '190K' },
    { name: 'Sunamganj', division: 'Sylhet', divisionColor: '#06b6d4', x: 465, y: 165, capital: false, population: '240K' },

    // Barisal Division (6 districts)
    { name: 'Barisal', division: 'Barisal', divisionColor: '#fb7185', x: 335, y: 370, capital: true, population: '330K' },
    { name: 'Barguna', division: 'Barisal', divisionColor: '#fb7185', x: 315, y: 415, capital: false, population: '90K' },
    { name: 'Bhola', division: 'Barisal', divisionColor: '#fb7185', x: 365, y: 395, capital: false, population: '170K' },
    { name: 'Jhalokati', division: 'Barisal', divisionColor: '#fb7185', x: 320, y: 365, capital: false, population: '68K' },
    { name: 'Patuakhali', division: 'Barisal', divisionColor: '#fb7185', x: 340, y: 405, capital: false, population: '150K' },
    { name: 'Pirojpur', division: 'Barisal', divisionColor: '#fb7185', x: 300, y: 385, capital: false, population: '110K' },

    // Rangpur Division (8 districts)
    { name: 'Rangpur', division: 'Rangpur', divisionColor: '#84d982', x: 295, y: 120, capital: true, population: '300K' },
    { name: 'Dinajpur', division: 'Rangpur', divisionColor: '#84d982', x: 265, y: 105, capital: false, population: '300K' },
    { name: 'Gaibandha', division: 'Rangpur', divisionColor: '#84d982', x: 315, y: 135, capital: false, population: '240K' },
    { name: 'Kurigram', division: 'Rangpur', divisionColor: '#84d982', x: 335, y: 115, capital: false, population: '210K' },
    { name: 'Lalmonirhat', division: 'Rangpur', divisionColor: '#84d982', x: 285, y: 90, capital: false, population: '130K' },
    { name: 'Nilphamari', division: 'Rangpur', divisionColor: '#84d982', x: 305, y: 95, capital: false, population: '190K' },
    { name: 'Panchagarh', division: 'Rangpur', divisionColor: '#84d982', x: 315, y: 75, capital: false, population: '100K' },
    { name: 'Thakurgaon', division: 'Rangpur', divisionColor: '#84d982', x: 275, y: 85, capital: false, population: '140K' },

    // Mymensingh Division (4 districts)
    { name: 'Mymensingh', division: 'Mymensingh', divisionColor: '#c084fc', x: 385, y: 195, capital: true, population: '500K' },
    { name: 'Jamalpur', division: 'Mymensingh', divisionColor: '#c084fc', x: 355, y: 180, capital: false, population: '230K' },
    { name: 'Netrakona', division: 'Mymensingh', divisionColor: '#c084fc', x: 405, y: 175, capital: false, population: '220K' },
    { name: 'Sherpur', division: 'Mymensingh', divisionColor: '#c084fc', x: 375, y: 165, capital: false, population: '140K' }
  ];

  const filteredDistricts = districts.filter(district =>
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
      }, 1000);
    }
  };

  const handleDistrictSelect = (district) => {
    setIsSearching(true);
    setSelectedDistrict(district);
    setSearchTerm(district.name);
    setShowDropdown(false);
    
    setTimeout(() => {
      setIsSearching(false);
    }, 1000);
  };

  const handleReset = () => {
    setSelectedDistrict(null);
    setSearchTerm('');
    setShowDropdown(false);
  };

  // Get divisions with their districts
  const divisions = [
    { name: 'Dhaka', color: '#e879f9', districts: districts.filter(d => d.division === 'Dhaka') },
    { name: 'Chittagong', color: '#84cc16', districts: districts.filter(d => d.division === 'Chittagong') },
    { name: 'Rajshahi', color: '#fbbf24', districts: districts.filter(d => d.division === 'Rajshahi') },
    { name: 'Khulna', color: '#a78bfa', districts: districts.filter(d => d.division === 'Khulna') },
    { name: 'Sylhet', color: '#06b6d4', districts: districts.filter(d => d.division === 'Sylhet') },
    { name: 'Barisal', color: '#fb7185', districts: districts.filter(d => d.division === 'Barisal') },
    { name: 'Rangpur', color: '#84d982', districts: districts.filter(d => d.division === 'Rangpur') },
    { name: 'Mymensingh', color: '#c084fc', districts: districts.filter(d => d.division === 'Mymensingh') }
  ];

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen p-4 py-20">
     <Container>
       <div className="w-full mx-auto">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-between items-start mb-4">
            <div className="text-left">
              <div className="text-red-600 font-bold text-lg">BANGLADESH</div>
              <div className="text-sm text-gray-600 bg-white px-3 py-1 rounded border">
                Divisions and Districts<br/>with Major Cities
              </div>
            </div>
            
            {/* Compass */}
            <div className="bg-white p-2 rounded-full shadow-lg">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Navigation className="h-6 w-6 text-red-600" />
                </div>
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 text-xs font-bold">N</div>
                <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 text-xs font-bold">E</div>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-xs font-bold">S</div>
                <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 text-xs font-bold">W</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search district..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowDropdown(e.target.value.length > 0);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:border-red-500 focus:outline-none"
              />
              
              {showDropdown && searchTerm && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded shadow-lg z-20 max-h-48 overflow-y-auto mt-1">
                  {filteredDistricts.length > 0 ? (
                    filteredDistricts.map((district, index) => (
                      <button
                        key={index}
                        onClick={() => handleDistrictSelect(district)}
                        className="w-full text-left p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: district.divisionColor }}
                          ></div>
                          <div>
                            <div className="font-medium">{district.name}</div>
                            <div className="text-sm text-gray-500">{district.division} Division</div>
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="p-3 text-gray-500 text-center">No districts found</div>
                  )}
                </div>
              )}
            </div>
            
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Search
            </button>
            
            {selectedDistrict && (
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              >
                Reset
              </button>
            )}
          </div>

          {/* Selected District Info */}
          {selectedDistrict && (
            <div className="mt-4 p-3 bg-gray-50 rounded border-l-4 border-red-500">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: selectedDistrict.divisionColor }}
                ></div>
                <div>
                  <div className="font-semibold">{selectedDistrict.name}</div>
                  <div className="text-sm text-gray-600">
                    {selectedDistrict.division} Division • Population: {selectedDistrict.population}
                    {selectedDistrict.capital && <span className="ml-2 text-red-600">• Division Capital</span>}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Map Container */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            
            {/* Map SVG */}
            <svg 
              viewBox="0 0 600 500" 
              className={`w-full h-auto bg-gradient-to-br from-blue-50 to-blue-100 transition-all duration-1000 ${
                selectedDistrict ? 'scale-110' : 'scale-100'
              }`}
              style={{
                transformOrigin: selectedDistrict 
                  ? `${selectedDistrict.x}px ${selectedDistrict.y}px`
                  : 'center'
              }}
            >
              {/* Country borders */}
              <defs>
                <pattern id="water" patternUnits="userSpaceOnUse" width="4" height="4">
                  <rect width="4" height="4" fill="#bfdbfe"/>
                  <path d="m0,0l2,2m0,-2l-2,2" stroke="#93c5fd" strokeWidth="0.5"/>
                </pattern>
              </defs>

              {/* Bay of Bengal */}
              <rect x="0" y="420" width="600" height="80" fill="url(#water)" />
              <text x="300" y="460" textAnchor="middle" className="fill-blue-700 text-lg font-bold">Bay of Bengal</text>

              {/* Neighboring countries labels */}
              <text x="50" y="50" className="fill-gray-600 text-sm font-bold">NEPAL</text>
              <text x="550" y="50" className="fill-red-600 text-lg font-bold">BHUTAN</text>
              <text x="50" y="250" className="fill-gray-600 text-lg font-bold tracking-widest">I N D I A</text>
              <text x="580" y="200" className="fill-gray-600 text-lg font-bold tracking-widest transform rotate-90">I N D I A</text>
              <text x="580" y="450" className="fill-gray-600 text-sm font-bold">MYANMAR</text>

              {/* Division boundaries and fills */}
              {divisions.map((division, divIndex) => (
                <g key={divIndex}>
                  {/* Division area (simplified shapes for each division) */}
                  {division.name === 'Dhaka' && (
                    <path 
                      d="M300,220 L420,220 L440,280 L400,320 L320,320 L290,280 Z" 
                      fill={division.color} 
                      fillOpacity="0.3" 
                      stroke={division.color} 
                      strokeWidth="2"
                    />
                  )}
                  {division.name === 'Chittagong' && (
                    <path 
                      d="M440,280 L580,280 L580,450 L480,450 L440,380 Z" 
                      fill={division.color} 
                      fillOpacity="0.3" 
                      stroke={division.color} 
                      strokeWidth="2"
                    />
                  )}
                  {division.name === 'Rajshahi' && (
                    <path 
                      d="M200,140 L340,140 L340,220 L300,220 L200,220 Z" 
                      fill={division.color} 
                      fillOpacity="0.3" 
                      stroke={division.color} 
                      strokeWidth="2"
                    />
                  )}
                  {division.name === 'Khulna' && (
                    <path 
                      d="M180,240 L300,240 L320,320 L240,380 L180,320 Z" 
                      fill={division.color} 
                      fillOpacity="0.3" 
                      stroke={division.color} 
                      strokeWidth="2"
                    />
                  )}
                  {division.name === 'Sylhet' && (
                    <path 
                      d="M440,140 L580,140 L580,220 L440,220 Z" 
                      fill={division.color} 
                      fillOpacity="0.3" 
                      stroke={division.color} 
                      strokeWidth="2"
                    />
                  )}
                  {division.name === 'Barisal' && (
                    <path 
                      d="M280,320 L400,320 L420,420 L300,420 Z" 
                      fill={division.color} 
                      fillOpacity="0.3" 
                      stroke={division.color} 
                      strokeWidth="2"
                    />
                  )}
                  {division.name === 'Rangpur' && (
                    <path 
                      d="M240,60 L380,60 L380,140 L240,140 Z" 
                      fill={division.color} 
                      fillOpacity="0.3" 
                      stroke={division.color} 
                      strokeWidth="2"
                    />
                  )}
                  {division.name === 'Mymensingh' && (
                    <path 
                      d="M340,140 L440,140 L440,220 L340,220 Z" 
                      fill={division.color} 
                      fillOpacity="0.3" 
                      stroke={division.color} 
                      strokeWidth="2"
                    />
                  )}

                  {/* Division Labels */}
                  <text 
                    x={division.districts[0]?.x || 300} 
                    y={division.districts[0]?.y - 20 || 200} 
                    textAnchor="middle" 
                    className="fill-gray-700 text-sm font-bold uppercase tracking-wide"
                  >
                    {division.name}
                  </text>
                </g>
              ))}

              {/* District points and labels */}
              {districts.map((district, index) => (
                <g key={index}>
                  {/* District point */}
                  <circle
                    cx={district.x}
                    cy={district.y}
                    r={selectedDistrict?.name === district.name ? "6" : district.capital ? "4" : "3"}
                    fill={selectedDistrict?.name === district.name ? "#dc2626" : district.capital ? "#dc2626" : "#374151"}
                    stroke="white"
                    strokeWidth="1"
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedDistrict?.name === district.name ? 'animate-pulse' : 'hover:scale-150'
                    }`}
                    onClick={() => handleDistrictSelect(district)}
                  />
                  
                  {/* District label */}
                  <text
                    x={district.x}
                    y={district.y - (district.capital ? 8 : 6)}
                    textAnchor="middle"
                    className={`text-xs fill-gray-700 font-medium pointer-events-none ${
                      selectedDistrict?.name === district.name ? 'text-sm font-bold fill-red-700' : ''
                    }`}
                  >
                    {district.name}
                  </text>
                  
                  {/* Capital star */}
                  {district.capital && (
                    <text
                      x={district.x + 8}
                      y={district.y - 8}
                      className="text-red-600 text-xs pointer-events-none"
                    >
                      ★
                    </text>
                  )}
                </g>
              ))}

              {/* International borders */}
              <path 
                d="M100,50 L550,50 L580,80 L580,420 L400,450 L200,430 L100,350 L80,200 Z" 
                fill="none" 
                stroke="#dc2626" 
                strokeWidth="3"
                strokeDasharray="5,5"
              />
            </svg>

            {/* Loading Overlay */}
            {isSearching && (
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center z-30">
                <div className="bg-white rounded-lg p-6 flex items-center space-x-3 shadow-lg">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
                  <span className="text-gray-700 font-medium">
                    Locating {selectedDistrict?.name}...
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="bg-gray-50 p-4 border-t">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-bold text-gray-800 mb-2">LEGEND</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-1 bg-red-600 border-dashed border-red-600"></div>
                    <span>International Boundary</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-1 bg-purple-500"></div>
                    <span>Division Boundary</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                    <span>Division Capital</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    <span>Major Cities</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-800 mb-2">DIVISIONS</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {divisions.map((division, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded" 
                        style={{ backgroundColor: division.color }}
                      ></div>
                      <span>{division.name} ({division.districts.length})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Click on any district to view details</span>
                <div className="flex space-x-6">
                  <span><strong>64</strong> Districts</span>
                  <span><strong>8</strong> Divisions</span>
                  <span><strong>24/7</strong> Service</span>
                </div>
              </div>
            </div>
          </div>

          {/* Small Location Map */}
          <div className="absolute bottom-4 left-4 bg-white rounded shadow-lg p-2" style={{ width: '120px', height: '80px' }}>
            <div className="text-xs font-bold text-center mb-1">ASIA</div>
            <svg viewBox="0 0 100 60" className="w-full h-full">
              <rect width="100" height="60" fill="#e0f2fe" />
              <path d="M20,15 L80,15 L80,45 L20,45 Z" fill="#94a3b8" />
              <rect x="35" y="25" width="8" height="6" fill="#dc2626" />
              <text x="39" y="35" className="text-xs fill-white font-bold">BD</text>
            </svg>
          </div>
        </div>
      </div>
     </Container>
    </div>
  );
};

export default CoverageMap;
