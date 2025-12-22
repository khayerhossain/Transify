"use client";
import React from "react";
import ProtectedRoute from "@/Components/Shared/ProtectedRoute";
import { CreditCard, Plus, Trash2, Star } from "lucide-react";

// Mock data
const mockPayments = [
    { id: 1, type: "Visa", last4: "4242", expiry: "12/25", isDefault: true },
    { id: 2, type: "Mastercard", last4: "5555", expiry: "08/26", isDefault: false },
];

function PaymentMethodsPage() {
    return (
        <div className="p-8 mt-16 min-h-screen bg-gray-50/50">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Payment Methods</h1>
                    <p className="text-gray-500">Manage your payment cards</p>
                </div>
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg transition-all">
                    <Plus size={20} />
                    Add Card
                </button>
            </div>

            {/* Cards List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockPayments.map((card) => (
                    <div
                        key={card.id}
                        className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden ${card.isDefault ? "ring-4 ring-red-500" : ""
                            }`}
                    >
                        {/* Card Pattern */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-8">
                                <CreditCard size={32} />
                                {card.isDefault && (
                                    <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                                        <Star size={12} fill="currentColor" />
                                        Default
                                    </span>
                                )}
                            </div>

                            <div className="mb-6">
                                <p className="text-sm text-gray-400 mb-1">Card Number</p>
                                <p className="text-2xl font-mono tracking-wider">
                                    •••• •••• •••• {card.last4}
                                </p>
                            </div>

                            <div className="flex items-end justify-between">
                                <div>
                                    <p className="text-xs text-gray-400">Expires</p>
                                    <p className="text-sm font-medium">{card.expiry}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-all">
                                        Edit
                                    </button>
                                    <button className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-all">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Transaction History */}
            <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold mb-4">Recent Transactions</h3>
                <div className="space-y-3">
                    {[
                        { date: "Dec 13, 2024", desc: "Parcel Delivery - PKG-2024-003", amount: "-$28.00" },
                        { date: "Dec 12, 2024", desc: "Parcel Delivery - PKG-2024-002", amount: "-$32.50" },
                        { date: "Dec 10, 2024", desc: "Parcel Delivery - PKG-2024-001", amount: "-$45.00" },
                    ].map((txn, i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                            <div>
                                <p className="font-medium text-gray-900">{txn.desc}</p>
                                <p className="text-sm text-gray-500">{txn.date}</p>
                            </div>
                            <p className="font-bold text-gray-900">{txn.amount}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function PaymentsPage() {
    return (
        <ProtectedRoute allowedRoles={["user", "admin", "merchant", "rider"]}>
            <PaymentMethodsPage />
        </ProtectedRoute>
    );
}
