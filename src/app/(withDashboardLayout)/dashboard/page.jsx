// app/dashboard/page.jsx (example)
import { authOptions } from "../../../lib/authOptions";
import { getServerSession } from "next-auth";

export default async function DashboardHomePage() {
  const session = await getServerSession(authOptions);
console.log("Dashboard session", session);
  return (
    <div className="mt-20 text-center text-2xl font-semibold">
      hi there i am dashboard home page
      <span className="text-sm font-bold text-gray-700">
        {" "}
        Hello, {session?.user?.email || "Guest"}
        <hr />
        {JSON.stringify(session)}
      </span>
    </div>
  );
}
