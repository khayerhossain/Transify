"use client";
import { useSession } from "next-auth/react";

export default function TestSession() {
  const { data: session, status } = useSession();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Session Test Page</h1>
      <div className="space-y-4">
        <div>
          <strong>Status:</strong> {status}
        </div>
        <div>
          <strong>Session:</strong> 
          <pre className="bg-gray-100 p-4 rounded mt-2">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
        {session && (
          <div className="bg-green-100 p-4 rounded">
            <p>✅ User is logged in!</p>
            <p>Name: {session.user?.name}</p>
            <p>Email: {session.user?.email}</p>
          </div>
        )}
        {!session && status === "unauthenticated" && (
          <div className="bg-red-100 p-4 rounded">
            <p>❌ User is not logged in</p>
          </div>
        )}
      </div>
    </div>
  );
}
