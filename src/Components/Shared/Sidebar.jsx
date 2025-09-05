"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaBox,
  FaSearchLocation,
  FaDollarSign,
  FaInfoCircle,
} from "react-icons/fa";

const Sidebar = ({ onClick }) => {
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
    <ul className="space-y-2 px-4 h-[100vh]">
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
            onClick={onClick}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;
