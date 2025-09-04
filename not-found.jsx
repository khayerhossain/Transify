import Link from "next/link";
import { FC } from "react";

const NotFoundPage = () => {
  return (
    <div className="w-[90%] mx-auto flex flex-col items-center justify-center min-h-screen text-center space-y-6">
      <h1 className="text-3xl md:text-4xl font-bold text-white">
        Oops! Page Not Found
      </h1>
      <p className="text-white">
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>

      <Link
        href="/"
        className="mt-4 inline-block px-6 py-3 bg-red-500 text-white text-lg font-medium rounded-lg shadow hover:bg-red-600 transition-all duration-200"
      >
        ⬅ Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
