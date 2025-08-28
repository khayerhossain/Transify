"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { FaCarSide } from "react-icons/fa";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ width: "100%", borderRadius: 0 }}
      animate={
        isScrolled
          ? { width: "60%", borderRadius: "9999px", marginTop: "10px" }
          : { width: "100%", borderRadius: 0, marginTop: 0 }
      }
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 mx-auto bg-white/60 backdrop-blur-md shadow-md px-6 py-3 flex items-center justify-between z-50"
      // style={{ maxWidth: "1200px" }}
    >
      {/* Logo + Title */}
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold"><FaCarSide />
</span>
        {!isScrolled && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-xl font-bold text-gray-800"
          >
            Transify
          </motion.span>
        )}
      </div>

      {/* Links */}
      <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
        <a href="#">Home</a>
        <a href="#">Rides</a>
        <a href="#">My Bookings</a>
      </div>

      {/* Search (Glass style, shrink when scrolled) */}
      <motion.div
        animate={
          isScrolled
            ? { width: "100px" } // Smaller on scroll
            : { width: "180px" } // Normal size
        }
        transition={{ duration: 0.4 }}
        className="flex items-center border border-gray-300 rounded-full px-3 py-1 
                   bg-white/20 backdrop-blur-lg shadow-sm overflow-hidden"
      >
        <Search size={18} className="text-gray-600" />
        <input
          type="text"
          placeholder="Search"
          className="outline-none px-2 text-sm w-full 
                     bg-transparent text-gray-900 placeholder-gray-600"
        />
      </motion.div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <a
          href="#"
          className="text-gray-700 font-medium hover:text-blue-600 hidden md:inline"
        >
          Dashboard
        </a>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg font-medium">
          Login
        </button>
        <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer">
          <span className="text-sm font-bold text-gray-700">KH</span>
        </div>
      </div>
    </motion.nav>
  );
}
