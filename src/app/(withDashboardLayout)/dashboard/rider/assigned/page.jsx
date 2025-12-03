"use client";

import { Package, ClipboardList } from "lucide-react";

export default function RiderAssignedPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="bg-gray-800 text-white p-6 rounded-2xl w-full max-w-xl shadow-lg border border-gray-700">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Package className="w-7 h-7 text-blue-400" />
          <h1 className="text-2xl font-bold text-center">
            Rider Assignment Dashboard
          </h1>
        </div>

        <p className="text-gray-300 text-center leading-relaxed">
          Ei page ta ekhon completely static rakhlam so build error ar ashbe na.
          Jokon backend connect korba tokhon assigned delivery list ekhane show
          korbo.
        </p>

        <div className="mt-6 bg-gray-700 p-4 rounded-xl text-center flex flex-col items-center gap-2">
          <ClipboardList className="w-6 h-6 text-gray-300" />
          <p className="text-gray-300">
            No assigned deliveries available right now
          </p>
        </div>
      </div>
    </div>
  );
}


