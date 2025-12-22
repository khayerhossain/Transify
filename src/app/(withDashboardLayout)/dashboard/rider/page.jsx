"use client";
import React from "react";
import ProtectedRoute from "@/Components/Shared/ProtectedRoute";
import { Bike, CheckCircle, Map, DollarSign, List, Bell } from "lucide-react";
import Link from "next/link";
import { useAuth } from "../../../../contexts/AuthContext";

const StatGridItem = ({ label, value, icon: Icon, color }) => (
  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
    </div>
    <div className={`p-3 rounded-full ${color} bg-opacity-10 text-opacity-100`}>
      <Icon size={24} className={color.replace("bg-", "text-")} />
    </div>
  </div>
)

function RiderDashboardHome() {
  const { user } = useAuth();
  return (
    <div className="p-6 md:p-8 mt-16 min-h-screen bg-gray-50">

      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Welcome, {user?.name || "Rider"}</h1>
        <p className="text-gray-500 text-sm md:text-base">Ready to roll? Check your assigned deliveries.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatGridItem label="Pending Jobs" value="5" icon={Bike} color="bg-orange-500" />
        <StatGridItem label="Completed Today" value="12" icon={CheckCircle} color="bg-green-500" />
        <StatGridItem label="Total Earnings" value="$148" icon={DollarSign} color="bg-blue-500" />
        <StatGridItem label="Rating" value="4.9" icon={CheckCircle} color="bg-yellow-500" />
      </div>

      {/* Action List */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-800">Job Actions</h3>
          <span className="text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">Active</span>
        </div>
        <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-2">
          <Link href="/dashboard/rider/jobs" className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors group">
            <div className="bg-blue-100 p-3 rounded-lg text-blue-600 group-hover:scale-110 transition-transform">
              <List size={22} />
            </div>
            <div>
              <p className="font-semibold text-gray-800">View Assigned Jobs</p>
              <p className="text-xs text-gray-500">Check pickup and delivery details</p>
            </div>
          </Link>
          <Link href="/dashboard/rider/earnings" className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors group">
            <div className="bg-green-100 p-3 rounded-lg text-green-600 group-hover:scale-110 transition-transform">
              <DollarSign size={22} />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Earnings Report</p>
              <p className="text-xs text-gray-500">View your daily and weekly payouts</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function RiderDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["rider", "admin"]}>
      <RiderDashboardHome />
    </ProtectedRoute>
  );
}
