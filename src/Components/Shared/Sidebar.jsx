"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaBox,
  FaSearchLocation,
  FaDollarSign,
  FaInfoCircle,
} from "react-icons/fa";
import { IoMdClose, IoMdMenu } from "react-icons/io";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", icon: <FaHome />, path: "/" },
    {
      name: "Applied Riders",
      icon: <FaBox />,
      path: "/dashboard/admin/applied-riders",
    },
    {
      name: "Approved Riders",
      icon: <FaSearchLocation />,
      path: "/dashboard/admin/approved-riders",
    },
    {
      name: "Orders",
      icon: <FaDollarSign />,
      path: "/dashboard/admin/total-orders",
    },
    {
      name: "Balance",
      icon: <FaInfoCircle />,
      path: "/dashboard/admin/balance",
    },
  ];

  return (
    <div>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-3 text-2xl text-white bg-gray-800 rounded-md md:hidden"
      >
        <IoMdMenu />
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-gray-900 text-white shadow-lg transform transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-gray-900">
          <h1 className="text-xl md:text-2xl font-bold text-white">
            Dashboard
          </h1>
          <button
            onClick={() => setIsOpen(false)}
            className="text-2xl text-white md:hidden"
          >
            <IoMdClose />
          </button>
        </div>

        {/* Menu Items */}
        <ul className="space-y-2 mt-4 px-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.path}
                className={`flex items-center gap-3 p-3 rounded-xl transition font-medium
                  ${
                    pathname === item.path
                      ? "bg-white text-red-600"
                      : "hover:bg-gray-700"
                  }`}
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
