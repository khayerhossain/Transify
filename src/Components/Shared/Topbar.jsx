"use client";

import { useSession } from "next-auth/react";
import { IoNotificationsOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi2";
import { BsGrid3X3Gap } from "react-icons/bs";

export default function Topbar() {
  const { data: session } = useSession();
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Get user initials for avatar
  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const userName = session?.user?.name || "Guest User";
  const userEmail = session?.user?.email || "";
  const userImage = session?.user?.image;

  return (
    <div className="sticky top-0 z-30 bg-black shadow-lg">
      <div className="flex items-center justify-between px-6 py-2.5">
        {/* Left Section - Greeting */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <h2 className="text-base font-semibold text-white">{getGreeting()}!</h2>
            <p className="text-xs text-gray-400">Welcome back to your dashboard</p>
          </div>
        </div>

        {/* Right Section - Actions & Profile */}
        <div className="flex items-center gap-3">
          {/* Quick Actions Button */}
          <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
            <BsGrid3X3Gap className="text-lg" />
          </button>

          {/* Notification Bell */}
          <button className="relative p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
            <IoNotificationsOutline className="text-lg" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>

          {/* Divider */}
          <div className="h-8 w-px bg-white/20 mx-1"></div>

          {/* User Profile */}
          <div className="flex items-center gap-3 cursor-pointer hover:bg-white/10 rounded-lg px-3 py-1.5 transition-all duration-200">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-white">{userName}</p>
              <p className="text-xs text-gray-400">{userEmail || "Administrator"}</p>
            </div>
            {userImage ? (
              <img
                src={userImage}
                alt={userName}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-white/30"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white text-sm font-semibold shadow-lg ring-2 ring-white/30">
                {getInitials(userName)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

