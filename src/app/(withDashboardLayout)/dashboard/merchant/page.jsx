"use client";
import React from "react";
import ProtectedRoute from "@/Components/Shared/ProtectedRoute";
import { TrendingUp, Package, Users, DollarSign, Archive, BarChart2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "../../../../contexts/AuthContext";

const MerchantStat = ({ title, value, subtext, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-full hover:shadow-lg transition-all">
        <div className="flex items-start justify-between mb-4">
            <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{title}</p>
                <h3 className="text-3xl font-extrabold text-gray-900 mt-1">{value}</h3>
            </div>
            <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-opacity-100`}>
                <Icon size={24} className={color.replace("bg-", "text-")} />
            </div>
        </div>
        <div className="flex items-center text-sm">
            <span className="text-green-500 font-medium flex items-center gap-1">
                <TrendingUp size={14} /> {subtext}
            </span>
            <span className="text-gray-400 ml-2">vs last month</span>
        </div>
    </div>
);

function MerchantDashboardHome() {
    const { user } = useAuth();
    return (
        <div className="p-8 mt-16 min-h-screen bg-gray-50/50">

            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Merchant Portal</h1>
                    <p className="text-gray-500">Overview of your business performance and logistics.</p>
                </div>
                <div className="flex gap-3">
                    <Link href="/dashboard/merchant/bulk-upload" className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">
                        Bulk Upload
                    </Link>
                    <Link href="/send-parcel" className="px-5 py-2.5 bg-red-600 text-white font-semibold rounded-xl shadow-lg shadow-red-500/20 hover:bg-red-700 transition-colors">
                        New Shipment
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <MerchantStat
                    title="Total Revenue"
                    value="$12,850"
                    subtext="+12.5%"
                    icon={DollarSign}
                    color="bg-green-500"
                />
                <MerchantStat
                    title="Total Shipments"
                    value="1,432"
                    subtext="+8.2%"
                    icon={Package}
                    color="bg-blue-500"
                />
                <MerchantStat
                    title="Delivered"
                    value="1,398"
                    subtext="+98% rate"
                    icon={Archive}
                    color="bg-purple-500"
                />
                <MerchantStat
                    title="Active Customers"
                    value="850"
                    subtext="+5.4%"
                    icon={Users}
                    color="bg-orange-500"
                />
            </div>

            {/* Content Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity / Chart Placeholder */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-gray-800 text-lg">Shipment Analytics</h3>
                        <button className="text-sm font-medium text-red-600 hover:text-red-700">View Report</button>
                    </div>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        <div className="text-center text-gray-400">
                            <BarChart2 size={40} className="mx-auto mb-2 opacity-50" />
                            <p>Analytics Chart Placeholder</p>
                        </div>
                    </div>
                </div>

                {/* Notifications / Quick Links */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-bold text-gray-800 text-lg mb-4">Quick Access</h3>
                    <div className="space-y-3">
                        <Link href="/dashboard/merchant/invoices" className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-red-50 group transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-blue-500" />
                                <span className="font-medium text-gray-700 group-hover:text-red-700">Invoices</span>
                            </div>
                            <span className="text-gray-400 text-sm group-hover:text-red-500">View</span>
                        </Link>
                        <Link href="/dashboard/merchant/settings" className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-red-50 group transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-gray-500" />
                                <span className="font-medium text-gray-700 group-hover:text-red-700">Settings</span>
                            </div>
                            <span className="text-gray-400 text-sm group-hover:text-red-500">Manage</span>
                        </Link>
                        <Link href="/dashboard/merchant/support" className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-red-50 group transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500" />
                                <span className="font-medium text-gray-700 group-hover:text-red-700">Priority Support</span>
                            </div>
                            <span className="text-gray-400 text-sm group-hover:text-red-500">Contact</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function MerchantDashboardPage() {
    return (
        <ProtectedRoute allowedRoles={["merchant", "admin"]}>
            <MerchantDashboardHome />
        </ProtectedRoute>
    );
}
