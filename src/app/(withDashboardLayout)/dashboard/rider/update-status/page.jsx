

import ProtectedRoute from "@/Components/Shared/ProtectedRoute";
import RiderDashboardPage from "../page.jsx";

export default function RiderUpdateStatusPage() {
  // Status update controls already live inside the main rider dashboard table.
  return (
    <ProtectedRoute allowedRoles={["rider"]}>
      <RiderDashboardPage />
    </ProtectedRoute>
  );
}





