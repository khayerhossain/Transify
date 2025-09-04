"use client";

import { useEffect, useState } from "react";
import axiosInstance from "../../../../../lib/axiosInstance";
import { toast } from "react-hot-toast";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState(null);

  // fetch all orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/total-orders");
      setOrders(res?.data?.orders || []);
    } catch (err) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // update order status
  const handleStatusChange = async (id, status) => {
    try {
      setSavingId(id);
      const res = await axiosInstance.patch("/total-orders", { id, status });

      if (res?.data?.success) {
        toast.success("Order status updated");
        setOrders((prev) =>
          prev.map((order) => (order._id === id ? { ...order, status } : order))
        );
      } else {
        toast.error(res?.data?.message || "Failed to update status");
      }
    } catch (err) {
      toast.error("Error updating order");
    } finally {
      setSavingId(null);
    }
  };

  if (loading) return <p className="text-center p-6">Loading...</p>;

  return (
    <div className="p-6 mt-16">
      <h1 className="text-2xl font-bold mb-6">All Orders</h1>
      {orders.length === 0 ? (
        <div className="bg-white shadow-md rounded-xl p-10 text-center text-gray-500">
          No orders found.
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
          <table className="min-w-full text-sm">
            <thead className="bg-gradient-to-r from-blue-50 to-blue-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 text-left">Parcel Type</th>
                <th className="px-6 py-4 text-left">Sender</th>
                <th className="px-6 py-4 text-left">Receiver</th>
                <th className="px-6 py-4 text-left">Created At</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
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
                const prettyDate = created ? created.toLocaleString() : "-";

                // 🎨 Badge color for parcel type
                const typeColors = {
                  Document: "bg-blue-100 text-blue-700",
                  Fragile: "bg-red-100 text-red-700",
                  Electronics: "bg-purple-100 text-purple-700",
                  default: "bg-gray-100 text-gray-700",
                };

                return (
                  <tr
                    key={order._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* Parcel Type */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          typeColors[order.type] || typeColors.default
                        }`}
                      >
                        {order.type || "-"}
                      </span>
                    </td>

                    {/* Sender */}
                    <td className="px-6 py-4">{order.senderName}</td>

                    {/* Receiver */}
                    <td className="px-6 py-4">{order.receiverName}</td>

                    {/* Created At */}
                    <td className="px-6 py-4">{prettyDate}</td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : order.status === "on-the-way"
                            ? "bg-blue-100 text-blue-700"
                            : order.status === "delivered"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    {/* Action: Change Status */}
                    <td className="px-6 py-4 text-center">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        disabled={savingId === order._id}
                        className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="on-the-way">On the Way</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
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
