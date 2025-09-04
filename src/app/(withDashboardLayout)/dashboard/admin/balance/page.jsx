"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function BalancePage() {
  const [data, setData] = useState({ totalBalance: 0, chartData: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await fetch("/api/balance");
        const json = await res.json();
        if (json.success) setData(json);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBalance();
  }, []);

  if (loading) return <p className="text-center p-6">Loading...</p>;

  return (
    <div className="p-6 mt-16">
      {/* Total Balance Card */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-3xl p-8 shadow-xl mb-8 flex flex-col items-center justify-center">
        <p className="text-lg font-medium">Total Balance</p>
        <p className="text-4xl font-bold mt-2">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(data.totalBalance)}
        </p>
      </div>

      {/* Growth Chart */}
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Revenue Growth</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#7c3aed"
              strokeWidth={3}
              dot={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
