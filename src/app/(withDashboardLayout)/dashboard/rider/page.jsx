"use client";

import { useEffect, useState } from "react";
import axiosInstance from "../../../../lib/axiosInstance";
import { toast } from "react-hot-toast";
import {
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaBox,
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
  FaDollarSign,
} from "react-icons/fa";
import ProtectedRoute from "../../../../Components/Shared/ProtectedRoute";
import { useAuth } from "../../../../contexts/AuthContext";

function RiderDashboardInner() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inTransit: 0,
    delivered: 0,
    earnings: 0
  });

  // Fetch rider's assigned orders
  const fetchRiderOrders = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/total-orders");
      const allOrders = res?.data?.orders || [];
      
      // Filter orders assigned to current rider (in real app, this would be done on backend)
      // For now, show all orders that are not delivered
      const riderOrders = allOrders.filter(order => 
        order.status !== 'delivered' && order.status !== 'cancelled'
      );
      
      setOrders(riderOrders);
      
      // Calculate stats
      const newStats = {
        total: riderOrders.length,
        pending: riderOrders.filter(o => o.status === 'pending').length,
        inTransit: riderOrders.filter(o => o.status === 'on-the-way').length,
        delivered: allOrders.filter(o => o.status === 'delivered').length,
        earnings: allOrders.filter(o => o.status === 'delivered').length * 5 // $5 per delivery
      };
      setStats(newStats);
    } catch (err) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchRiderOrders();
    }
  }, [user]);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const res = await axiosInstance.patch("/total-orders", { 
        id: orderId, 
        status: newStatus 
      });

      if (res?.data?.success) {
        toast.success("Order status updated");
        fetchRiderOrders(); // Refresh orders
      } else {
        toast.error(res?.data?.message || "Failed to update status");
      }
    } catch (err) {
      toast.error("Error updating order");
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <FaClock className="text-yellow-500" />;
      case 'on-the-way':
        return <FaTruck className="text-blue-500" />;
      case 'delivered':
        return <FaCheckCircle className="text-green-500" />;
      case 'cancelled':
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaBox className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return "bg-yellow-100 text-yellow-700";
      case 'on-the-way':
        return "bg-blue-100 text-blue-700";
      case 'delivered':
        return "bg-green-100 text-green-700";
      case 'cancelled':
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="p-6 mt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome, {user?.name || user?.email}!
        </h1>
        <p className="text-gray-600">Manage your delivery assignments and track your progress</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Assignments</p>
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <FaBox className="text-3xl text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Pending Pickup</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <FaClock className="text-3xl text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">In Transit</p>
              <p className="text-2xl font-bold text-blue-600">{stats.inTransit}</p>
            </div>
            <FaTruck className="text-3xl text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Delivered</p>
              <p className="text-2xl font-bold text-green-600">{stats.delivered}</p>
            </div>
            <FaCheckCircle className="text-3xl text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Today's Earnings</p>
              <p className="text-2xl font-bold text-green-600">${stats.earnings}</p>
            </div>
            <FaDollarSign className="text-3xl text-green-500" />
          </div>
        </div>
      </div>

      {/* Current Assignments */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Current Assignments</h2>
        </div>

        {orders.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            <FaTruck className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-lg">No assignments available</p>
            <p className="text-sm">Check back later for new delivery assignments</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left">Tracking ID</th>
                  <th className="px-6 py-4 text-left">Parcel Type</th>
                  <th className="px-6 py-4 text-left">From</th>
                  <th className="px-6 py-4 text-left">To</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Date</th>
                  <th className="px-6 py-4 text-center">Actions</th>
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
                    <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-mono text-sm">
                        #{order._id.slice(-8).toUpperCase()}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                          {order.type || "Package"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium">{order.senderName}</p>
                          <p className="text-xs text-gray-500">{order.senderAddress}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium">{order.receiverName}</p>
                          <p className="text-xs text-gray-500">{order.receiverAddress}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(order.status)}
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status?.replace('-', ' ').toUpperCase()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">{prettyDate}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex gap-2 justify-center">
                          {order.status === 'pending' && (
                            <button
                              onClick={() => handleStatusUpdate(order._id, 'on-the-way')}
                              className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              Start Delivery
                            </button>
                          )}
                          {order.status === 'on-the-way' && (
                            <button
                              onClick={() => handleStatusUpdate(order._id, 'delivered')}
                              className="px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition-colors"
                            >
                              Mark Delivered
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={fetchRiderOrders}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaBox />
            Refresh Assignments
          </button>
          <a
            href="/dashboard/rider/support"
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            <FaPhone />
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}

export default function RiderDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["rider"]}>
      <RiderDashboardInner />
    </ProtectedRoute>
  );
}
