"use client";
import React, { useState } from "react";
import ProtectedRoute from "@/Components/Shared/ProtectedRoute";
import { Package, Search, Filter, ChevronRight, Truck, CheckCircle, Clock, XCircle } from "lucide-react";
import Link from "next/link";

const statusConfig = {
    delivered: { color: "bg-green-100 text-green-700", icon: CheckCircle },
    in_transit: { color: "bg-blue-100 text-blue-700", icon: Truck },
    pending: { color: "bg-yellow-100 text-yellow-700", icon: Clock },
    cancelled: { color: "bg-red-100 text-red-700", icon: XCircle },
};

// Mock data - replace with API call
const mockOrders = [
    { id: "PKG-2024-001", date: "2024-12-10", recipient: "John Doe", destination: "New York, NY", status: "delivered", amount: "$45.00" },
    { id: "PKG-2024-002", date: "2024-12-12", recipient: "Jane Smith", destination: "Los Angeles, CA", status: "in_transit", amount: "$32.50" },
    { id: "PKG-2024-003", date: "2024-12-13", recipient: "Bob Johnson", destination: "Chicago, IL", status: "pending", amount: "$28.00" },
];

function OrderHistoryPage() {
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");

    const filteredOrders = mockOrders.filter(order => {
        const matchesFilter = filter === "all" || order.status === filter;
        const matchesSearch = order.id.toLowerCase().includes(search.toLowerCase()) ||
            order.recipient.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="p-8 mt-16 min-h-screen bg-gray-50/50">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Order History</h1>
                    <p className="text-gray-500">View all your parcel shipments</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by tracking number or recipient..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="flex gap-2">
                        {["all", "delivered", "in_transit", "pending", "cancelled"].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-4 py-2 rounded-xl font-medium transition-all ${filter === status
                                        ? "bg-red-600 text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                {status.replace("_", " ").charAt(0).toUpperCase() + status.slice(1).replace("_", " ")}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
                {filteredOrders.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                        <Package className="mx-auto mb-4 text-gray-300" size={48} />
                        <p className="text-gray-500">No orders found</p>
                    </div>
                ) : (
                    filteredOrders.map((order) => {
                        const StatusIcon = statusConfig[order.status].icon;
                        return (
                            <div
                                key={order.id}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all"
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-bold text-gray-900">{order.id}</h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${statusConfig[order.status].color}`}>
                                                <StatusIcon size={14} />
                                                {order.status.replace("_", " ")}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                                            <div>
                                                <span className="font-medium">Date:</span> {order.date}
                                            </div>
                                            <div>
                                                <span className="font-medium">Recipient:</span> {order.recipient}
                                            </div>
                                            <div>
                                                <span className="font-medium">Destination:</span> {order.destination}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500">Amount</p>
                                            <p className="text-xl font-bold text-gray-900">{order.amount}</p>
                                        </div>
                                        <Link
                                            href={`/dashboard/user/track-parcel?id=${order.id}`}
                                            className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors flex items-center gap-2"
                                        >
                                            Track
                                            <ChevronRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default function HistoryPage() {
    return (
        <ProtectedRoute allowedRoles={["user", "admin", "merchant", "rider"]}>
            <OrderHistoryPage />
        </ProtectedRoute>
    );
}
