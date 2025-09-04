import Link from "next/link";
import {
  FaHome,
  FaBox,
  FaSearchLocation,
  FaDollarSign,
  FaInfoCircle,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="min-h-screen p-4 rounded-xl bg-gray-900 text-white">
      <ul className="space-y-4">
        <li>
          <Link
            href="/"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700"
          >
            <FaHome className="h-5 w-5" />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/admin/applied-riders"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700"
          >
            <FaBox className="h-5 w-5" />
            <span>Applied Riders</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/approve-riders"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700"
          >
            <FaSearchLocation className="h-5 w-5" />
            <span>Approved Riders</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/admin/total-orders"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700"
          >
            <FaDollarSign className="h-5 w-5" />
            <span>Orders</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/admin/balance"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700"
          >
            <FaInfoCircle className="h-5 w-5" />
            <span>Balance</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
