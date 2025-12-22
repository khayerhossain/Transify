"use client";
import React, { useState } from "react";
import ProtectedRoute from "@/Components/Shared/ProtectedRoute";
import { MapPin, Plus, Edit, Trash2, Star } from "lucide-react";

// Mock data
const mockAddresses = [
    { id: 1, label: "Home", address: "123 Main St, Apt 4B", city: "New York", state: "NY", zip: "10001", isDefault: true },
    { id: 2, label: "Office", address: "456 Corporate Blvd", city: "Manhattan", state: "NY", zip: "10005", isDefault: false },
];

function AddressBookPage() {
    const [addresses, setAddresses] = useState(mockAddresses);
    const [showForm, setShowForm] = useState(false);

    const setDefault = (id) => {
        setAddresses(addresses.map(addr => ({ ...addr, isDefault: addr.id === id })));
    };

    const deleteAddress = (id) => {
        if (confirm("Are you sure you want to delete this address?")) {
            setAddresses(addresses.filter(addr => addr.id !== id));
        }
    };

    return (
        <div className="p-8 mt-16 min-h-screen bg-gray-50/50">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Address Book</h1>
                    <p className="text-gray-500">Manage your saved addresses</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg transition-all"
                >
                    <Plus size={20} />
                    Add New Address
                </button>
            </div>

            {/* Add Form (Simple placeholder) */}
            {showForm && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                    <h3 className="text-lg font-bold mb-4">Add New Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" placeholder="Label (e.g., Home)" className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" />
                        <input type="text" placeholder="Street Address" className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" />
                        <input type="text" placeholder="City" className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" />
                        <input type="text" placeholder="State" className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" />
                        <input type="text" placeholder="ZIP Code" className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" />
                    </div>
                    <div className="flex gap-3 mt-4">
                        <button className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700">Save Address</button>
                        <button onClick={() => setShowForm(false)} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300">Cancel</button>
                    </div>
                </div>
            )}

            {/* Addresses List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.map((addr) => (
                    <div
                        key={addr.id}
                        className={`bg-white rounded-2xl shadow-sm border p-6 transition-all ${addr.isDefault ? "border-red-500 ring-2 ring-red-100" : "border-gray-100 hover:shadow-lg"
                            }`}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <MapPin className="text-red-600" size={20} />
                                <h3 className="font-bold text-gray-900">{addr.label}</h3>
                                {addr.isDefault && (
                                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full flex items-center gap-1">
                                        <Star size={12} fill="currentColor" />
                                        Default
                                    </span>
                                )}
                            </div>
                        </div>

                        <p className="text-gray-700 mb-1">{addr.address}</p>
                        <p className="text-gray-500 text-sm mb-4">
                            {addr.city}, {addr.state} {addr.zip}
                        </p>

                        <div className="flex gap-2 pt-4 border-t border-gray-100">
                            {!addr.isDefault && (
                                <button
                                    onClick={() => setDefault(addr.id)}
                                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 text-sm font-medium"
                                >
                                    Set as Default
                                </button>
                            )}
                            <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100">
                                <Edit size={16} />
                            </button>
                            <button
                                onClick={() => deleteAddress(addr.id)}
                                className="px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function AddressesPage() {
    return (
        <ProtectedRoute allowedRoles={["user", "admin", "merchant", "rider"]}>
            <AddressBookPage />
        </ProtectedRoute>
    );
}
