"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { FaCarSide } from "react-icons/fa";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    handleResize(); // first load e check korbe

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // ✅ Public Links
  const navLinks = (
    <>
      <Link href="/">Home</Link>
      <Link href="/be-a-rider">Be a Rider</Link>
      <Link href="/send-parcel">Send Parcel</Link>
      <Link href="/track-map">Track</Link>
    </>
  );

  return (
    <motion.nav
      initial={{ width: "100%", borderRadius: 0 }}
      animate={
        !isMobile && isScrolled
          ? { width: "60%", borderRadius: "9999px", marginTop: "10px" }
          : { width: "100%", borderRadius: 0, marginTop: 0 }
      }
      transition={{ duration: 0.5 }}
      className="
        fixed top-0 left-0 right-0 mx-auto 
        px-6 py-3 flex items-center justify-between z-50
        bg-white md:bg-white/60 md:backdrop-blur-md
      "
    >
      {/* Logo + Title */}
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold">
          <FaCarSide />
        </span>
        {!isScrolled && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-bold text-gray-800"
          >
            Transify
          </motion.span>
        )}
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
        {navLinks}
      </div>

      {/* Search (Desktop only) */}
      <motion.div
        animate={
          !isMobile && isScrolled ? { width: "100px" } : { width: "180px" }
        }
        transition={{ duration: 0.4 }}
        className="hidden md:flex items-center border border-gray-300 rounded-full px-3 py-1 
                   bg-white/20 backdrop-blur-lg shadow-sm overflow-hidden"
      >
        <Search size={18} className="text-gray-600" />
        <input
          type="text"
          placeholder="Search"
          className="outline-none px-2 text-sm w-full bg-transparent text-gray-900 placeholder-gray-600"
        />
      </motion.div>

      {/* Right Side (Desktop) */}
      <div className="hidden md:flex items-center gap-4">
        <Link
          href="/dashboard"
          className="text-gray-700 font-medium hover:text-blue-600"
        >
          Dashboard
        </Link>
        <Link
          href="/login"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg font-medium"
        >
          Login
        </Link>
        <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer">
          <span className="text-sm font-bold text-gray-700">
            {" "}
            Hello, {session?.user?.name || "Guest"}
          </span>
        </div>
      </div>

      {/* ✅ Mobile Hamburger Menu */}
      <div className="dropdown dropdown-end md:hidden">
        <label tabIndex={0} className="btn btn-ghost btn-circle text-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-40 space-y-1"
        >
          <li>{navLinks}</li>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
        </ul>
      </div>
    </motion.nav>
  );
}
