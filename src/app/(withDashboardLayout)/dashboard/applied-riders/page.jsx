"use client";

import { useEffect, useState } from "react";
import axiosInstance from "../../../../lib/axiosInstance";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

export default function AppliedRidersPage() {
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState(null);

  // fetch riders
  const fetchRiders = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/apply-riders");
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

  // update status
  const handleStatusUpdate = async (id, status, feedback) => {
    try {
      setSavingId(id);
      const res = await axiosInstance.patch("/apply-riders", {
        id,
        status,
        feedback,
      });

      if (res?.data?.success) {
        toast.success("Status updated");
        fetchRiders();
      } else {
        toast.error(res?.data?.message || "Update failed");
      }
    } catch (err) {
      toast.error("Error updating status");
    } finally {
      setSavingId(null);
    }
  };

  // Reject with SweetAlert2 modal
  const handleReject = async (id) => {
    const { value: feedback } = await Swal.fire({
      title: "Reject Rider?",
      text: "Please provide a reason for rejection (optional).",
      input: "text",
      inputPlaceholder: "Enter feedback...",
      showCancelButton: true,
      confirmButtonText: "Reject",
      confirmButtonColor: "#dc2626",
      cancelButtonText: "Cancel",
      background: "#f9fafb",
      customClass: {
        popup: "rounded-2xl shadow-xl",
        confirmButton: "px-6 py-2 rounded-lg text-white font-medium",
        cancelButton: "px-6 py-2 rounded-lg font-medium",
      },
    });

    if (feedback !== undefined) {
      await handleStatusUpdate(id, "rejected", feedback || undefined);
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
    <div className="p-8 mt-16">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Applied Riders</h1>

      {riders.length === 0 ? (
        <div className="bg-white shadow-md rounded-xl p-10 text-center text-gray-500">
          No riders applied yet.
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
          <table className="min-w-full text-sm">
            <thead className="bg-gradient-to-r from-blue-50 to-blue-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Phone</th>
                <th className="px-6 py-4 text-left">Applied At</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Feedback</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {riders.map((rider) => {
                // createdAt fix
                let created = null;
                if (rider?.createdAt) {
                  if (typeof rider.createdAt === "string") {
                    created = new Date(rider.createdAt);
                  } else if (rider.createdAt.$date) {
                    created = new Date(rider.createdAt.$date);
                  }
                }
                const prettyDate = created ? created.toLocaleString() : "-";

                return (
                  <tr
                    key={rider._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium">
                      {rider.name || "-"}
                    </td>
                    <td className="px-6 py-4">
                      {rider.contact || rider.phone || "-"}
                    </td>
                    <td className="px-6 py-4">{prettyDate}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                          rider.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : rider.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {rider.status || "pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {rider.feedback || "-"}
                    </td>
                    <td className="px-6 py-4 flex items-center gap-3 justify-center">
                      <button
                        onClick={() =>
                          handleStatusUpdate(rider._id, "approved")
                        }
                        disabled={savingId === rider._id}
                        className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-md hover:opacity-90 transition disabled:opacity-50"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(rider._id)}
                        disabled={savingId === rider._id}
                        className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-md hover:opacity-90 transition disabled:opacity-50"
                      >
                        Reject
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
