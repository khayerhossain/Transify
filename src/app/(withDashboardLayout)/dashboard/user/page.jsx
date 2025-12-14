"use client";
import React from "react";
import ProtectedRoute from "../../../../Components/Shared/ProtectedRoute";
import { Package, Truck, CreditCard, PlusCircle, MapPin, History, Bell, Settings, User } from "lucide-react";
import Link from "next/link";
import { useAuth } from "../../../../contexts/AuthContext";

const StatCard = ({ title, value, subtext, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-opacity-100`}>
        <Icon size={24} className={color.replace("bg-", "text-")} />
      </div>
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
        {title}
      </span>
    </div>
    <h3 className="text-3xl font-bold text-gray-800 mb-1">
      {value}
    </h3>
    <p className="text-sm text-gray-500">{subtext}</p>
  </div>
);

const QuickLink = ({ title, icon: Icon, href, color }) => (
  <Link href={href} className="flex flex-col items-center justify-center p-6 bg-white border border-gray-100 rounded-2xl hover:border-red-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer text-center">
    <div className={`p-4 rounded-full ${color} bg-opacity-10 text-opacity-100 mb-3 group-hover:scale-110 transition-transform`}>
      <Icon size={28} className={color.replace("bg-", "text-")} />
    </div>
    <span className="font-semibold text-gray-700 group-hover:text-red-600 transition-colors">{title}</span>
  </Link>
)

function UserDashboardHome() {
  const { user } = useAuth();
  return (
    <div className="p-8 mt-16 min-h-screen bg-gray-50/50">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Welcome back, {user?.name || "User"}!</h1>
          <p className="text-gray-500">Track your shipments and manage bookings.</p>
        </div>
        <Link href="/send-parcel" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg shadow-red-500/30 transition-all">
          <PlusCircle size={20} />
          Send New Parcel
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard
          title="Active Parcels"
          value="3"
          subtext="In transit"
          icon={Truck}
          color="bg-orange-500"
        />
        <StatCard
          title="Total Sent"
          value="24"
          subtext="Lifetime deliveries"
          icon={Package}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Spent"
          value="$1,240"
          subtext="Shipping costs"
          icon={CreditCard}
          color="bg-green-500"
        />
      </div>

      {/* Actions Grid */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickLink title="Track Parcel" icon={MapPin} href="/dashboard/user/track-parcel" color="bg-indigo-500" />
          <QuickLink title="Order History" icon={History} href="/dashboard/user/history" color="bg-purple-500" />
          <QuickLink title="Address Book" icon={MapPin} href="/dashboard/user/addresses" color="bg-teal-500" />
          <QuickLink title="Create Parcel" icon={PlusCircle} href="/dashboard/user/create-parcel" color="bg-orange-500" />
          <QuickLink title="Payments" icon={CreditCard} href="/dashboard/user/payments" color="bg-green-500" />
          <QuickLink title="Notifications" icon={Bell} href="/dashboard/user/notifications" color="bg-red-500" />
          <QuickLink title="Settings" icon={Settings} href="/dashboard/user/settings" color="bg-gray-500" />
          <QuickLink title="Profile" icon={User} href="/dashboard/user/profile" color="bg-blue-500" />
        </div>
      </div>

    </div>
  );
}

export default function UserDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["user", "admin", "merchant", "rider"]}>
      <UserDashboardHome />
    </ProtectedRoute>
  );
}
