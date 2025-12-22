// app/dashboard/page.jsx (example)
import { authOptions } from "@/Lib/authOptions";
import { getServerSession } from "next-auth";

export default async function DashboardHomePage() {
  const session = await getServerSession(authOptions);
// console.log("Dashboard session", session);
  return (
    <div className="mt-20 text-center text-2xl font-semibold">
      <span className="text-sm font-bold text-gray-700">
        {" "}
        Hello, {session?.user?.email || "Guest"}
        {/* {JSON.stringify(session)} */}
      </span>
    </div>
  );
}
