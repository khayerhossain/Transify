"use client";
import React, { useState, useEffect } from "react";
import ProtectedRoute from "@/Components/Shared/ProtectedRoute";
import {
  Package,
  Search,
  ChevronRight,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import axiosInstance from "@/Lib/axiosInstance";
import toast from "react-hot-toast";

const statusConfig = {
  delivered: { color: "bg-green-100 text-green-700", icon: CheckCircle },
  in_transit: { color: "bg-blue-100 text-blue-700", icon: Truck },
  pending: { color: "bg-yellow-100 text-yellow-700", icon: Clock },
  cancelled: { color: "bg-red-100 text-red-700", icon: XCircle },
  paid: { color: "bg-blue-100 text-blue-700", icon: CheckCircle }, // assuming paid is like in_transit
};

function OrderHistoryPage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get("/user/order-history");
        if (response.data.success) {
          setOrders(response.data.orders);
        } else {
          setError("Failed to fetch orders");
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders");
        toast.error("Failed to load order history");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesFilter = filter === "all" || order.status === filter;
    const matchesSearch =
      (order._id?.toString() || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (order.parcelName || "").toLowerCase().includes(search.toLowerCase()) ||
      (order.receiverName || "").toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-8 mt-16 min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            Order History
          </h1>
          <p className="text-gray-500">View all your parcel shipments</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by tracking number, parcel name or recipient..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex gap-2">
            {["all", "delivered", "in_transit", "pending", "cancelled"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    filter === status
                      ? "bg-red-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {status.replace("_", " ").charAt(0).toUpperCase() +
                    status.slice(1).replace("_", " ")}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {(() => {
          if (loading) {
            return (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                <p className="text-gray-500">Loading orders...</p>
              </div>
            );
          }
          if (error) {
            return (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                <XCircle className="mx-auto mb-4 text-red-500" size={48} />
                <p className="text-gray-500">{error}</p>
              </div>
            );
          }
          if (filteredOrders.length === 0) {
            return (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                <Package className="mx-auto mb-4 text-gray-300" size={48} />
                <p className="text-gray-500">No orders found</p>
              </div>
            );
          }
          return filteredOrders.map((order) => {
            const StatusIcon = statusConfig[order.status]?.icon || Clock;
            const orderId = order._id?.toString() || "N/A";
            const orderDate = order.createdAt
              ? new Date(order.createdAt).toLocaleDateString()
              : "N/A";
            const recipient = order.receiverName || "N/A";
            const destination = order.receiverAddress || "N/A";
            const amount = order.amount ? `$${order.amount}` : "N/A";
            const parcelName = order.parcelName || orderId;
            return (
              <div
                key={orderId}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">
                        {parcelName}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                          statusConfig[order.status]?.color ||
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        <StatusIcon size={14} />
                        {order.status || "unknown"}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Date:</span> {orderDate}
                      </div>
                      <div>
                        <span className="font-medium">Recipient:</span>{" "}
                        {recipient}
                      </div>
                      <div>
                        <span className="font-medium">Destination:</span>{" "}
                        {destination}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Amount</p>
                      <p className="text-xl font-bold text-gray-900">
                        {amount}
                      </p>
                    </div>
                    <Link
                      href={`/dashboard/user/track-parcel?id=${orderId}`}
                      className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors flex items-center gap-2"
                    >
                      Track
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          });
        })()}
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
