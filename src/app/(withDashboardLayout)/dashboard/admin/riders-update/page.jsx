"use client";

import axiosInstance from "../../../../../lib/axiosInstance";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function RidersUpdatePage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/support");
      setMessages(res?.data?.messages || []);
    } catch (err) {
      toast.error("Failed to load riders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Riders Messages</h1>
      <div className="space-y-4">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg._id}
              className="p-4 border rounded shadow bg-gray-50"
            >
              <p>
                <strong>Name:</strong> {msg.riderName}
              </p>
              <p>
                <strong>Email:</strong> {msg.riderEmail}
              </p>
              <p>
                <strong>Message:</strong> {msg.message}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : ""}
              </p>
            </div>
          ))
        ) : (
          <p>No riders found</p>
        )}
      </div>
    </div>
  );
}
