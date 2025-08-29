"use client";
import { useState } from "react";
import Image from "next/image";
import ApplyRidere from "../../assets/apply-rider.png";
import { User, Mail, Phone, Calendar } from "lucide-react";

export default function BeARider() {
  // Division & District Data
  const divisions = {
    Dhaka: ["Dhaka", "Gazipur", "Narayanganj", "Tangail"],
    Chattogram: ["Chattogram", "Cox’s Bazar", "Rangamati", "Bandarban"],
    Sylhet: ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"],
    Rajshahi: ["Rajshahi", "Bogura", "Pabna", "Natore"],
    Khulna: ["Khulna", "Jessore", "Satkhira", "Bagerhat"],
    Barisal: ["Barisal", "Patuakhali", "Bhola", "Jhalokathi"],
    Rangpur: ["Rangpur", "Dinajpur", "Kurigram", "Lalmonirhat"],
    Mymensingh: ["Mymensingh", "Jamalpur", "Netrokona", "Sherpur"],
  };

  const [selectedDivision, setSelectedDivision] = useState("");
  const [districts, setDistricts] = useState([]);

  const handleDivisionChange = (e) => {
    const division = e.target.value;
    setSelectedDivision(division);
    setDistricts(divisions[division] || []);
  };

  return (
    <section className="bg-gray-50 rounded-xl p-8 md:p-12 py-20 mt-0 lg:mt-10">
      {/* Heading */}
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-bold text-gray-900">Be a Rider</h2>
        <p className="mt-2 text-gray-600 max-w-2xl">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>

      <hr className="my-6 border-gray-200" />

      {/* Content Section */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Form */}
        <form className="space-y-6 bg-white shadow-lg p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            Tell us about yourself
          </h3>

          {/* Name + Age */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative flex items-center">
              <User className="absolute left-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border rounded-xl px-10 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition shadow-sm"
              />
            </div>

            <div className="relative flex items-center">
              <Calendar className="absolute left-3 text-gray-400" size={20} />
              <input
                type="number"
                placeholder="Your Age"
                className="w-full border rounded-xl px-10 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition shadow-sm"
              />
            </div>
          </div>

          {/* Email + Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative flex items-center">
              <Mail className="absolute left-3 text-gray-400" size={20} />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border rounded-xl px-10 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition shadow-sm"
              />
            </div>

            <div className="relative flex items-center">
              <Phone className="absolute left-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Contact"
                className="w-full border rounded-xl px-10 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition shadow-sm"
              />
            </div>
          </div>

          {/* Division */}
          <select
            onChange={handleDivisionChange}
            value={selectedDivision}
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition shadow-sm"
          >
            <option value="">Select Division</option>
            {Object.keys(divisions).map((div) => (
              <option key={div} value={div}>
                {div}
              </option>
            ))}
          </select>

          {/* District (only show when division selected) */}
          {districts.length > 0 && (
            <select className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition shadow-sm">
              <option value="">Select District</option>
              {districts.map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
            </select>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl shadow-md transition"
          >
            Submit
          </button>
        </form>

        {/* Rider Image */}
        <div className="flex justify-center">
          <Image
            src={ApplyRidere}
            alt="Rider"
            width={400}
            height={450}
            className="mt-0 md:mt-0 lg:mt-28"
          />
        </div>
      </div>
    </section>
  );
}
