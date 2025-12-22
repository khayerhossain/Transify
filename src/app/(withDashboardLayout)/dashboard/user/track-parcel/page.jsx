"use client";

import { useState } from "react";
import { FaSearch, FaTruck, FaCheckCircle, FaClock, FaTimesCircle, FaMapMarkerAlt } from "react-icons/fa";
import axiosInstance from "@/Lib/axiosInstance.js";
import { toast } from "react-hot-toast";
import ProtectedRoute from "@/Components/Shared/ProtectedRoute";

function TrackParcelInner() {
  const [trackingId, setTrackingId] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!trackingId.trim()) {
      toast.error("Please enter a tracking ID");
      return;
    }

    try {
      setLoading(true);
      const res = await axiosInstance.get("/total-orders");
      const orders = res?.data?.orders || [];
      
      // Find order by tracking ID (using last 8 characters of _id)
      const foundOrder = orders.find(o => 
        o._id.slice(-8).toUpperCase() === trackingId.toUpperCase()
      );
      
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        setOrder(null);
        toast.error("Order not found. Please check your tracking ID.");
      }
    } catch (err) {
      toast.error("Failed to search for order");
    } finally {
      setLoading(false);
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
        return <FaClock className="text-gray-500" />;
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

  const getTrackingSteps = (status) => {
    const steps = [
      { id: 1, name: "Order Placed", status: "completed" },
      { id: 2, name: "Processing", status: status === 'pending' ? 'current' : status === 'on-the-way' || status === 'delivered' ? 'completed' : 'pending' },
      { id: 3, name: "In Transit", status: status === 'on-the-way' ? 'current' : status === 'delivered' ? 'completed' : 'pending' },
      { id: 4, name: "Delivered", status: status === 'delivered' ? 'completed' : 'pending' }
    ];

    if (status === 'cancelled') {
      steps[3] = { id: 4, name: "Cancelled", status: 'cancelled' };
    }

    return steps;
  };

  return (
    <div className="p-6 mt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Track Your Parcel</h1>
        <p className="text-gray-600">Enter your tracking ID to get real-time updates</p>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 mb-8">
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Enter tracking ID (e.g., A1B2C3D4)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
            ) : (
              <>
                <FaSearch />
                Track
              </>
            )}
          </button>
        </form>
      </div>

      {/* Results */}
      {order && (
        <div className="space-y-6">
          {/* Order Details */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Tracking Information</h3>
                <div className="space-y-2">
                  <p><span className="text-gray-500">Tracking ID:</span> <span className="font-mono">#{order._id.slice(-8).toUpperCase()}</span></p>
                  <p><span className="text-gray-500">Parcel Type:</span> {order.type || "Package"}</p>
                  <p><span className="text-gray-500">Status:</span> 
                    <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status?.replace('-', ' ').toUpperCase()}
                    </span>
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Delivery Information</h3>
                <div className="space-y-2">
                  <p><span className="text-gray-500">From:</span> {order.senderName}</p>
                  <p><span className="text-gray-500">To:</span> {order.receiverName}</p>
                  <p><span className="text-gray-500">Created:</span> {
                    order.createdAt ? 
                    (typeof order.createdAt === "string" ? 
                      new Date(order.createdAt).toLocaleDateString() : 
                      new Date(order.createdAt.$date).toLocaleDateString()) : 
                    "N/A"
                  }</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tracking Progress */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Tracking Progress</h2>
            <div className="relative">
              {getTrackingSteps(order.status).map((step, index) => (
                <div key={step.id} className="flex items-center mb-8 last:mb-0">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    step.status === 'completed' ? 'bg-green-500 text-white' :
                    step.status === 'current' ? 'bg-blue-500 text-white' :
                    step.status === 'cancelled' ? 'bg-red-500 text-white' :
                    'bg-gray-300 text-gray-600'
                  }`}>
                    {step.status === 'completed' ? <FaCheckCircle /> :
                     step.status === 'current' ? <FaTruck /> :
                     step.status === 'cancelled' ? <FaTimesCircle /> :
                     <FaClock />}
                  </div>
                  <div className="ml-4">
                    <p className={`font-medium ${
                      step.status === 'completed' ? 'text-green-700' :
                      step.status === 'current' ? 'text-blue-700' :
                      step.status === 'cancelled' ? 'text-red-700' :
                      'text-gray-500'
                    }`}>
                      {step.name}
                    </p>
                    {step.status === 'current' && (
                      <p className="text-sm text-gray-500">Currently in progress</p>
                    )}
                  </div>
                  {index < getTrackingSteps(order.status).length - 1 && (
                    <div className={`absolute left-5 top-10 w-0.5 h-8 ${
                      step.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Location Info */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaMapMarkerAlt />
              Location Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Pickup Location</h3>
                <p className="text-gray-600">{order.senderAddress || "Address not provided"}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Delivery Location</h3>
                <p className="text-gray-600">{order.receiverAddress || "Address not provided"}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No Results */}
      {order === null && trackingId && !loading && (
        <div className="bg-white rounded-xl p-10 text-center shadow-lg border border-gray-200">
          <FaSearch className="text-6xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Order Not Found</h3>
          <p className="text-gray-500">Please check your tracking ID and try again.</p>
        </div>
      )}
    </div>
  );
}

export default function TrackParcelPage() {
  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <TrackParcelInner />
    </ProtectedRoute>
  );
}
