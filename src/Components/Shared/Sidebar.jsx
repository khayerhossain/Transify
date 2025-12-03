"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaUserCheck,
  FaUserFriends,
  FaBox,
  FaDollarSign,
  FaTruck,
  FaSearch,
  FaUser,
  FaPhone,
} from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";

const Sidebar = ({ onClick, collapsed = false }) => {
  const pathname = usePathname();
  const { user } = useAuth();

  // Get menu items based on user role
  const getMenuItems = () => {
    const baseItems = [{ name: "Home", icon: <FaHome />, path: "/" }];

    if (user?.role === "admin") {
      return [
        ...baseItems,
        {
          name: "Dashboard",
          icon: <FaHome />,
          path: "/dashboard/admin",
        },
        {
          name: "All Parcels",
          icon: <FaBox />,
          path: "/dashboard/admin/all-parcels",
        },
        {
          name: "Applied Riders",
          icon: <FaUserFriends />,
          path: "/dashboard/admin/applied-riders",
        },
        {
          name: "Approved Riders",
          icon: <FaUserCheck />,
          path: "/dashboard/admin/approved-riders",
        },
        {
          name: "Riders Messages",
          icon: <FaPhone />,
          path: "/dashboard/admin/riders-update",
        },
        {
          name: "Balance & Revenue",
          icon: <FaDollarSign />,
          path: "/dashboard/admin/balance",
        },
        {
          name: "Users",
          icon: <FaUserFriends />,
          path: "/dashboard/admin/users",
        },
        {
          name: "Settings",
          icon: <FaUser />,
          path: "/dashboard/admin/settings",
        },
      ];
    } else if (user?.role === "rider") {
      return [
        ...baseItems,
        {
          name: "Dashboard",
          icon: <FaTruck />,
          path: "/dashboard/rider",
        },
        {
          name: "Assigned Parcels",
          icon: <FaBox />,
          path: "/dashboard/rider/assigned",
        },
        {
          name: "Update Status",
          icon: <FaUserCheck />,
          path: "/dashboard/rider/update-status",
        },
        {
          name: "History",
          icon: <FaUserFriends />,
          path: "/dashboard/rider/history",
        },
        {
          name: "Support",
          icon: <FaPhone />,
          path: "/dashboard/rider/support",
        },
      ];
    } else {
      // Default user menu
      return [
        ...baseItems,
        {
          name: "Dashboard",
          icon: <FaUser />,
          path: "/dashboard/user",
        },
        {
          name: "Create Parcel",
          icon: <FaBox />,
          path: "/dashboard/user/create-parcel",
        },
        {
          name: "Track Parcels",
          icon: <FaSearch />,
          path: "/dashboard/user/track-parcel",
        },
        {
          name: "Profile",
          icon: <FaUser />,
          path: "/dashboard/user/profile",
        },
      ];
    }
  };

  const menuItems = getMenuItems();

  return (
    <ul className="space-y-2 px-3 py-4 h-screen">
      {menuItems.map((item, index) => {
        const active = pathname === item.path;
        return (
          <li key={index}>
            <Link
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl transition font-medium
              ${
                active
                  ? "bg-white text-red-600 shadow-md"
                  : "text-gray-200 hover:bg-red-500/20 hover:text-white"
              }`}
              onClick={onClick}
            >
              <span className="text-lg">{item.icon}</span>
              {!collapsed && (
                <span className="whitespace-nowrap text-sm">{item.name}</span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Sidebar;


