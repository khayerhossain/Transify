"use client";

import ProtectedRoute from "../../../../Components/Shared/ProtectedRoute";

function AdminDashboardHome() {
  return (
    <div className="p-6 mt-16 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Admin Dashboard
      </h1>
      <p className="text-gray-600 mb-8">
        Overview of parcels, riders and users for your courier operation.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Parcels</p>
          <p className="text-3xl font-bold text-red-500 mt-2">All Parcels</p>
          <p className="text-xs text-gray-400 mt-2">
            Manage and track every shipment in the network.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Riders</p>
          <p className="text-3xl font-bold text-red-500 mt-2">Rider Panel</p>
          <p className="text-xs text-gray-400 mt-2">
            Approve, activate and monitor delivery partners.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Users</p>
          <p className="text-3xl font-bold text-red-500 mt-2">Merchants</p>
          <p className="text-xs text-gray-400 mt-2">
            View and manage merchants using your courier service.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminDashboardHome />
    </ProtectedRoute>
  );
}





