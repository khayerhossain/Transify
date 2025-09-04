"use client";

import { useEffect, useState } from "react";
import axiosInstance from "../../../../lib/axiosInstance";
import { toast } from "react-hot-toast";

export default function ApprovedRidersPage() {
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState(null);

  // fetch approved riders (both active & inactive)
  const fetchRiders = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/approved-riders");
      setRiders(res?.data?.riders || []);
    } catch (err) {
      toast.error("Failed to load riders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRiders();
  }, []);

  // toggle active/inactive
  const handleToggle = async (rider) => {
    try {
      setSavingId(rider._id);
      const newActive = !rider.active;

      const res = await axiosInstance.patch("/apply-riders", {
        id: rider._id,
        active: newActive,
      });

      if (res?.data?.success) {
        toast.success(`Rider ${newActive ? "activated" : "deactivated"}`);
        // update state without removing row
        setRiders((prev) =>
          prev.map((r) =>
            r._id === rider._id ? { ...r, active: newActive } : r
          )
        );
      } else {
        toast.error(res?.data?.message || "Toggle failed");
      }
    } catch (err) {
      toast.error("Error toggling rider");
    } finally {
      setSavingId(null);
    }
  };

  if (loading) return <p className="text-center p-6">Loading...</p>;

  return (
    <div className="p-6 mt-16">
      <h1 className="text-2xl font-bold mb-6">Approved Riders</h1>
      {riders.length === 0 ? (
        <div className="bg-white shadow-md rounded-xl p-10 text-center text-gray-500">
          No approved riders.
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
          <table className="min-w-full text-sm">
            <thead className="bg-gradient-to-r from-blue-50 to-blue-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 text-left">Profile</th>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Applied At</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {riders.map((rider) => {
                let created = null;
                if (rider?.createdAt) {
                  if (typeof rider.createdAt === "string") {
                    created = new Date(rider.createdAt);
                  } else if (rider.createdAt.$date) {
                    created = new Date(rider.createdAt.$date);
                  }
                }
                const prettyDate = created ? created.toLocaleString() : "-";

                const isActive = rider.active !== false;

                return (
                  <tr
                    key={rider._id}
                    className={`hover:bg-gray-50 transition-colors ${
                      !isActive ? "opacity-60" : ""
                    }`}
                  >
                    {/* Profile */}
                    <td className="px-6 py-4">
                      <img
                        src="https://i.pravatar.cc/40"
                        alt="profile"
                        className="w-10 h-10 rounded-full border"
                      />
                    </td>

                    {/* Name */}
                    <td className="px-6 py-4 font-medium">
                      {rider.name || "-"}
                    </td>

                    {/* Applied At */}
                    <td className="px-6 py-4">{prettyDate}</td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {rider.status || "approved"}
                      </span>
                    </td>

                    {/* Action Toggle */}
                    <td className="px-6 py-4 flex justify-center">
                      <button
                        onClick={() => handleToggle(rider)}
                        disabled={savingId === rider._id}
                        className={`px-4 py-2 rounded-lg text-white font-medium shadow-md transition ${
                          savingId === rider._id
                            ? "bg-gray-400 cursor-not-allowed"
                            : isActive
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                      >
                        {isActive ? "Deactivate" : "Activate"}
                      </button>
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
