// Commit: add POST and GET API routes for rider application
import { NextResponse } from "next/server";
import dbConnect, { collectionNamesObj } from "../../../Lib/db.connect";

// POST → insert new rider
export async function POST(req) {
  try {
    const body = await req.json();
    const collection = await dbConnect(collectionNamesObj.applyRidersCollection);

    // Add timestamps
    const now = new Date();
    const riderData = {
      ...body,
      createdAt: now,
      date: now.getDate(),
      month: now.getMonth() + 1,
      year: now.getFullYear(),
      time: now.toLocaleTimeString("en-US", { hour12: true }),
       status: "pending",
    };

    const result = await collection.insertOne(riderData);

    return NextResponse.json(
      { success: true, message: "Rider applied successfully", result },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error inserting rider:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// GET → fetch all riders
export async function GET() {
  try {
    const collection = await dbConnect(collectionNamesObj.applyRidersCollection);
    const riders = await collection.find().toArray();

    return NextResponse.json({ success: true, riders });
  } catch (error) {
    console.error("❌ Error fetching riders:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch riders" },
      { status: 500 }
    );
  }
}
