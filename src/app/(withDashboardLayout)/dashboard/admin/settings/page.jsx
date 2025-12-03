"use client";

import ProtectedRoute from "../../../../../Components/Shared/ProtectedRoute";

function AdminSettingsInner() {
  return (
    <div className="p-6 mt-16 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-900 mb-3">Admin Settings</h1>
      <p className="text-gray-600 mb-6">
        Configure global settings for your courier service such as coverage,
        service levels, and notification preferences.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-2">
            General Settings
          </h2>
          <p className="text-sm text-gray-500">
            Company name, support contact details, and branding options.
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-2">Notification</h2>
          <p className="text-sm text-gray-500">
            Control email/SMS alerts for merchants, riders and internal teams.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AdminSettingsPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminSettingsInner />
    </ProtectedRoute>
  );
}





