import dbConnect, { collectionNamesObj } from "@/Lib/db.connect";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/Lib/authOptions";


// GET: user's order history
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const userEmail = session.user.email;

    const collection = await dbConnect(
      collectionNamesObj.bookingParcelsCollection
    );
    const orders = await collection.find({ userEmail }).sort({ createdAt: -1 }).toArray();

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}