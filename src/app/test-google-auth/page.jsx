"use client";

import { useEffect, useState } from "react";

export default function TestGoogleAuth() {
    const [envCheck, setEnvCheck] = useState(null);

    useEffect(() => {
        fetch("/api/test-env")
            .then((res) => res.json())
            .then((data) => setEnvCheck(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="min-h-screen p-8 bg-gray-50">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
                <h1 className="text-3xl font-bold mb-6">🔍 Google Auth Diagnostics</h1>

                {envCheck ? (
                    <div className="space-y-4">
                        <div className="p-4 bg-blue-50 rounded">
                            <h2 className="font-bold mb-2">Environment Variables Status:</h2>
                            <pre className="text-sm">{JSON.stringify(envCheck, null, 2)}</pre>
                        </div>

                        {!envCheck.GOOGLE_CLIENT_ID_SET && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded">
                                <p className="text-red-700 font-bold">❌ GOOGLE_CLIENT_ID is missing!</p>
                                <p className="text-sm mt-2">Add this to your .env.local file:</p>
                                <code className="block mt-2 p-2 bg-gray-100 rounded">GOOGLE_CLIENT_ID=your_client_id_here</code>
                            </div>
                        )}

                        {!envCheck.GOOGLE_CLIENT_SECRET_SET && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded">
                                <p className="text-red-700 font-bold">❌ GOOGLE_CLIENT_SECRET is missing!</p>
                                <p className="text-sm mt-2">Add this to your .env.local file:</p>
                                <code className="block mt-2 p-2 bg-gray-100 rounded">GOOGLE_CLIENT_SECRET=your_client_secret_here</code>
                            </div>
                        )}

                        {envCheck.NEXTAUTH_URL === "MISSING" && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded">
                                <p className="text-red-700 font-bold">❌ NEXTAUTH_URL is missing!</p>
                                <p className="text-sm mt-2">Add this to your .env.local file:</p>
                                <code className="block mt-2 p-2 bg-gray-100 rounded">NEXTAUTH_URL=http://localhost:3000</code>
                            </div>
                        )}

                        {!envCheck.NEXTAUTH_SECRET_SET && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded">
                                <p className="text-red-700 font-bold">❌ NEXTAUTH_SECRET is missing!</p>
                                <p className="text-sm mt-2">Generate one by running:</p>
                                <code className="block mt-2 p-2 bg-gray-100 rounded">openssl rand -base64 32</code>
                                <p className="text-sm mt-2">Then add to .env.local:</p>
                                <code className="block mt-2 p-2 bg-gray-100 rounded">NEXTAUTH_SECRET=generated_secret_here</code>
                            </div>
                        )}

                        {envCheck.DB_CONNECTION?.includes("FAILED") && (
                            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
                                <p className="text-yellow-700 font-bold">⚠️ Database Connection Failed</p>
                                <p className="text-sm mt-2">{envCheck.DB_CONNECTION}</p>
                            </div>
                        )}

                        {envCheck.GOOGLE_CLIENT_ID_SET &&
                            envCheck.GOOGLE_CLIENT_SECRET_SET &&
                            envCheck.NEXTAUTH_SECRET_SET &&
                            envCheck.NEXTAUTH_URL !== "MISSING" && (
                                <div className="p-4 bg-green-50 border border-green-200 rounded">
                                    <p className="text-green-700 font-bold">✅ All Google Auth environment variables are set!</p>
                                    <p className="text-sm mt-2">If Google login still doesn't work, check:</p>
                                    <ul className="list-disc ml-6 mt-2 text-sm">
                                        <li>Your redirect URI in Google Cloud Console matches: <code>{envCheck.NEXTAUTH_URL}/api/auth/callback/google</code></li>
                                        <li>The OAuth consent screen is configured</li>
                                        <li>Your Google Client ID and Secret are correct</li>
                                    </ul>
                                </div>
                            )}
                    </div>
                ) : (
                    <p>Loading diagnostic info...</p>
                )}

                <div className="mt-6 pt-6 border-t">
                    <a href="/login" className="text-blue-600 hover:underline">← Back to Login</a>
                </div>
            </div>
        </div>
    );
}
