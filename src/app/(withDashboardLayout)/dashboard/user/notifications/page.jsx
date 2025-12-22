"use client";
import React, { useState } from "react";
import ProtectedRoute from "@/Components/Shared/ProtectedRoute";
import { Bell, Package, Megaphone, CheckCircle, Trash2 } from "lucide-react";

// Mock notifications
const mockNotifications = [
    { id: 1, type: "delivery", title: "Package Delivered", message: "Your parcel PKG-2024-001 has been delivered", time: "2 hours ago", read: false },
    { id: 2, type: "update", title: "Shipment Update", message: "PKG-2024-002 is out for delivery", time: "5 hours ago", read: false },
    { id: 3, type: "promo", title: "Special Offer", message: "Get 20% off your next shipment", time: "1 day ago", read: true },
];

const notifIcons = {
    delivery: { icon: Package, color: "bg-green-100 text-green-600" },
    update: { icon: Bell, color: "bg-blue-100 text-blue-600" },
    promo: { icon: Megaphone, color: "bg-purple-100 text-purple-600" },
};

function NotificationsPage() {
    const [notifications, setNotifications] = useState(mockNotifications);

    const markAsRead = (id) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const deleteNotif = (id) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    return (
        <div className="p-8 mt-16 min-h-screen bg-gray-50/50">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Notifications</h1>
                    <p className="text-gray-500">Stay updated on your shipments</p>
                </div>
                <button
                    onClick={markAllAsRead}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-all"
                >
                    <CheckCircle size={20} />
                    Mark All as Read
                </button>
            </div>

            {/* Notifications List */}
            <div className="space-y-4">
                {notifications.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                        <Bell className="mx-auto mb-4 text-gray-300" size={48} />
                        <p className="text-gray-500">No notifications</p>
                    </div>
                ) : (
                    notifications.map((notif) => {
                        const { icon: Icon, color } = notifIcons[notif.type];
                        return (
                            <div
                                key={notif.id}
                                className={`bg-white rounded-2xl shadow-sm border p-6 transition-all hover:shadow-lg ${notif.read ? "border-gray-100 opacity-75" : "border-red-200 bg-red-50/30"
                                    }`}
                            >
                                <div className="flex gap-4">
                                    <div className={`p-3 rounded-xl ${color} flex-shrink-0`}>
                                        <Icon size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <h3 className="font-bold text-gray-900">{notif.title}</h3>
                                            <span className="text-xs text-gray-500 whitespace-nowrap">{notif.time}</span>
                                        </div>
                                        <p className="text-gray-600 mb-3">{notif.message}</p>
                                        <div className="flex gap-2">
                                            {!notif.read && (
                                                <button
                                                    onClick={() => markAsRead(notif.id)}
                                                    className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-lg hover:bg-blue-200"
                                                >
                                                    Mark as Read
                                                </button>
                                            )}
                                            <button
                                                onClick={() => deleteNotif(notif.id)}
                                                className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-lg hover:bg-red-200 flex items-center gap-1"
                                            >
                                                <Trash2 size={14} />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default function NotificationsPageWrapper() {
    return (
        <ProtectedRoute allowedRoles={["user", "admin", "merchant", "rider"]}>
            <NotificationsPage />
        </ProtectedRoute>
    );
}
