// Commit: add POST and GET API routes for rider application
import { NextResponse } from "next/server";
import dbConnect, { collectionNamesObj } from "../../../lib/db.connect";
import { ObjectId } from "mongodb";


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


// GET → fetch only pending riders
export async function GET() {
  try {
    const collection = await dbConnect("applyRiders");
    const pendingRiders = await collection
      .find({ status: "pending" })
      .toArray();

    return NextResponse.json({ success: true, riders: pendingRiders });
  } catch (error) {
    console.error("Error fetching pending riders:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch riders" },
      { status: 500 }
    );
  }
}

// PATCH → toggle active or update status/feedback
export async function PATCH(req) {
  try {
    const { id, status, feedback, active } = await req.json();
    const collection = await dbConnect("applyRiders");

    const updateData = {};
    if (status) updateData.status = status;
    if (feedback !== undefined) updateData.feedback = feedback;
    if (active !== undefined) updateData.active = active;

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.modifiedCount === 1) {
      return NextResponse.json({ success: true, message: "Rider updated" });
    } else {
      return NextResponse.json(
        { success: false, message: "No rider updated" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("❌ Error updating rider:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update rider" },
      { status: 500 }
    );
  }
}