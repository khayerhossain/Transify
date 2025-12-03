"use client";

import ProtectedRoute from "../../../../../Components/Shared/ProtectedRoute";
import SendParcelPage from "../../../../(withCommonLayouts)/send-parcel/page";

export default function UserCreateParcelPage() {
  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <SendParcelPage />
    </ProtectedRoute>
  );
}


