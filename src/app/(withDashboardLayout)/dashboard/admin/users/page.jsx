"use client";

import ProtectedRoute from "../../../../../Components/Shared/ProtectedRoute";

function AdminUsersInner() {
  return (
    <div className="p-6 mt-16 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-900 mb-3">
        Users & Merchants
      </h1>
      <p className="text-gray-600 mb-6">
        This section will list all registered users and merchants. You can add
        filters, roles and actions here.
      </p>
      <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
        User management UI coming soon. The route and role protection are
        already set up.
      </div>
    </div>
  );
}

export default function AdminUsersPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminUsersInner />
    </ProtectedRoute>
  );
}





