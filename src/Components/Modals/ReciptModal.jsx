"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function PaymentReceiptModal({ isOpen, onClose, paymentData }) {
  const [showContent, setShowContent] = useState(false);
  const [animateItems, setAnimateItems] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted (for Next.js SSR)
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Delay content animation for smooth entrance
      setTimeout(() => setShowContent(true), 150);
      setTimeout(() => setAnimateItems(true), 300);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    } else {
      setShowContent(false);
      setAnimateItems(false);
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  // Don't render if not mounted (Next.js SSR fix)
  if (!mounted) return null;

  // Don't render if not open
  if (!isOpen) return null;

  const {
    transactionId = "N/A",
    amount = "0.00",
    senderName = "N/A",
    senderPhone,
    senderAddress,
    receiverName = "N/A",
    receiverPhone,
    receiverAddress,
    parcelType,
    weight,
    paymentDate = new Date().toISOString(),
    bookingId = "N/A",
  } = paymentData || {};

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const modalContent = (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-all duration-300 ${
        isOpen ? "bg-black bg-opacity-50" : "bg-transparent"
      }`}
      onClick={(e) => {
        // Close modal when clicking backdrop
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className={`bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-500 ${
          showContent
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 translate-y-8"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Success Header */}
        <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-2xl relative">
          <div
            className={`inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 transform transition-all duration-700 ${
              animateItems ? "scale-100 rotate-0" : "scale-50 rotate-180"
            }`}
          >
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2
            className={`text-2xl font-bold text-gray-900 mb-2 transform transition-all duration-700 delay-200 ${
              animateItems
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            Payment Successful!
          </h2>
          <p
            className={`text-gray-600 transform transition-all duration-700 delay-300 ${
              animateItems
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            Your courier booking has been confirmed
          </p>
        </div>

        {/* Receipt Content */}
        <div className="p-6 space-y-6">
          {/* Transaction Info */}
          <div
            className={`bg-red-50 rounded-xl p-4 border border-red-100 transform transition-all duration-700 delay-400 ${
              animateItems
                ? "translate-x-0 opacity-100"
                : "translate-x-4 opacity-0"
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-red-800">Total Paid</p>
                <p className="text-2xl font-bold text-red-900">${amount}</p>
              </div>
              <div className="text-red-600">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Transaction Details */}
          <div
            className={`space-y-3 transform transition-all duration-700 delay-500 ${
              animateItems
                ? "translate-x-0 opacity-100"
                : "translate-x-4 opacity-0"
            }`}
          >
            <h3 className="font-semibold text-gray-900 flex items-center">
              <svg
                className="w-4 h-4 text-red-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Transaction Details
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-mono text-gray-900 text-xs break-all">
                  {transactionId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Booking ID:</span>
                <span className="font-mono text-gray-900">{bookingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Date:</span>
                <span className="font-medium text-gray-900">
                  {formatDate(paymentDate)}
                </span>
              </div>
            </div>
          </div>

          {/* Sender Info */}
          <div
            className={`space-y-3 transform transition-all duration-700 delay-600 ${
              animateItems
                ? "translate-x-0 opacity-100"
                : "translate-x-4 opacity-0"
            }`}
          >
            <h3 className="font-semibold text-gray-900 flex items-center">
              <svg
                className="w-4 h-4 text-red-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Sender Information
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium text-gray-900">{senderName}</span>
              </div>
              {senderPhone && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium text-gray-900">
                    {senderPhone}
                  </span>
                </div>
              )}
              {senderAddress && (
                <div className="flex justify-between items-start">
                  <span className="text-gray-600">Address:</span>
                  <span className="font-medium text-gray-900 text-right max-w-48">
                    {senderAddress}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Receiver Info */}
          <div
            className={`space-y-3 transform transition-all duration-700 delay-700 ${
              animateItems
                ? "translate-x-0 opacity-100"
                : "translate-x-4 opacity-0"
            }`}
          >
            <h3 className="font-semibold text-gray-900 flex items-center">
              <svg
                className="w-4 h-4 text-red-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Receiver Information
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium text-gray-900">
                  {receiverName}
                </span>
              </div>
              {receiverPhone && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium text-gray-900">
                    {receiverPhone}
                  </span>
                </div>
              )}
              {receiverAddress && (
                <div className="flex justify-between items-start">
                  <span className="text-gray-600">Address:</span>
                  <span className="font-medium text-gray-900 text-right max-w-48">
                    {receiverAddress}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Parcel Info */}
          {(parcelType || weight) && (
            <div
              className={`space-y-3 transform transition-all duration-700 delay-800 ${
                animateItems
                  ? "translate-x-0 opacity-100"
                  : "translate-x-4 opacity-0"
              }`}
            >
              <h3 className="font-semibold text-gray-900 flex items-center">
                <svg
                  className="w-4 h-4 text-red-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                Parcel Information
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                {parcelType && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium text-gray-900">
                      {parcelType}
                    </span>
                  </div>
                )}
                {weight && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weight:</span>
                    <span className="font-medium text-gray-900">
                      {weight} kg
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div
            className={`flex space-x-3 pt-4 transform transition-all duration-700 delay-900 ${
              animateItems
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <button
              onClick={() => window.print()}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              Print Receipt
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Use portal to render modal at document root
  return createPortal(modalContent, document.body);
}
