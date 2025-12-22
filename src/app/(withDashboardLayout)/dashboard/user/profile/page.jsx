"use client";

import ProtectedRoute from "@/Components/Shared/ProtectedRoute";
import { useAuth } from "../../../../../contexts/AuthContext";

function UserProfileInner() {
  const { user } = useAuth();

  return (
    <div className="p-6 mt-16 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-900 mb-3">Profile</h1>
      <p className="text-gray-600 mb-6">
        View your basic account details for this courier platform.
      </p>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 max-w-xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center text-xl font-semibold">
            {(user?.name || user?.email || "?").charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900">
              {user?.name || "Unnamed user"}
            </p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-500">Role</dt>
            <dd className="font-medium capitalize text-gray-800">
              {user?.role || "user"}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Account Type</dt>
            <dd className="font-medium text-gray-800">Courier Customer</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default function UserProfilePage() {
  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <UserProfileInner />
    </ProtectedRoute>
  );
}





