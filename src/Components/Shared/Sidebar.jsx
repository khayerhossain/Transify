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
            href="/dashboard/send-parcel"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700"
          >
            <FaBox className="h-5 w-5" />
            <span>Send Parcel</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/track"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700"
          >
            <FaSearchLocation className="h-5 w-5" />
            <span>Track Parcel</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/pricing"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700"
          >
            <FaDollarSign className="h-5 w-5" />
            <span>Pricing</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/about"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700"
          >
            <FaInfoCircle className="h-5 w-5" />
            <span>About Us</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
