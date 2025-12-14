"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";

export default function ProtectedRoute({ allowedRoles, children }) {
  const router = useRouter();
  const { user, initialized, loading } = useAuth();

  useEffect(() => {
    if (!initialized || loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    // Temporarily disabled role-based protection for development
    // if (allowedRoles && !allowedRoles.includes(user.role)) {
    //   router.replace("/403");
    // }
  }, [user, initialized, loading, allowedRoles, router]);

  if (!initialized || loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin h-10 w-10 border-4 border-red-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  // Temporarily disabled role-based protection for development
  // if (allowedRoles && !allowedRoles.includes(user.role)) {
  //   return null;
  // }

  return <>{children}</>;
}





