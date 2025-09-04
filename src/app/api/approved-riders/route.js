import { NextResponse } from "next/server";
import dbConnect, { collectionNamesObj } from "../../../lib/db.connect";

// GET → fetch only approved riders
export async function GET() {
  try {
    const collection = await dbConnect(collectionNamesObj.applyRidersCollection);
    const approvedRiders = await collection
      .find({ status: "approved" })
      .toArray();

    return NextResponse.json({ success: true, riders: approvedRiders });
  } catch (error) {
    console.error("❌ Error fetching approved riders:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch approved riders" },
      { status: 500 }
    );
  }
}
