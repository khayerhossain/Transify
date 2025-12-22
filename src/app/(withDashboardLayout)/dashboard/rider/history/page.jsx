"use client";

import ProtectedRoute from "@/Components/Shared/ProtectedRoute";
import axiosInstance from "@/Lib/axiosInstance.js";
import { useEffect, useState } from "react";
import { FaTruck, FaCheckCircle } from "react-icons/fa";

function RiderHistoryInner() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/total-orders");
        const all = res?.data?.orders || [];
        const delivered = all.filter((o) => o.status === "delivered");
        setOrders(delivered);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin h-10 w-10 border-4 border-red-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="p-6 mt-16 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-900 mb-3">
        Delivery History
      </h1>
      <p className="text-gray-600 mb-6">
        Completed deliveries that have been marked as{" "}
        <span className="font-semibold">delivered</span>.
      </p>
      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center text-gray-500">
          <FaTruck className="text-5xl text-gray-300 mx-auto mb-4" />
          No completed deliveries yet.
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-6 py-4 text-left">Tracking ID</th>
                <th className="px-6 py-4 text-left">Parcel</th>
                <th className="px-6 py-4 text-left">To</th>
                <th className="px-6 py-4 text-left">Delivered On</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => {
                let created = null;
                if (order?.createdAt) {
                  if (typeof order.createdAt === "string") {
                    created = new Date(order.createdAt);
                  } else if (order.createdAt.$date) {
                    created = new Date(order.createdAt.$date);
                  }
                }
                const prettyDate = created ? created.toLocaleDateString() : "-";
                return (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono text-xs">
                      #{order._id.slice(-8).toUpperCase()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-2">
                        <FaCheckCircle className="text-green-500" />
                        {order.type || "Package"}
                      </span>
                    </td>
                    <td className="px-6 py-4">{order.receiverName}</td>
                    <td className="px-6 py-4 text-gray-500">{prettyDate}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function RiderHistoryPage() {
  return (
    <ProtectedRoute allowedRoles={["rider"]}>
      <RiderHistoryInner />
    </ProtectedRoute>
  );
}





