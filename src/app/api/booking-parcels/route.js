// Commit: add POST and GET API routes for booking parcels
import { NextResponse } from "next/server";
import dbConnect, { collectionNamesObj } from "../../../lib/db.connect";
import { ObjectId } from "mongodb";

// POST → insert new parcel booking
export async function POST(req) {
  try {
    const body = await req.json();
    const collection = await dbConnect(
      collectionNamesObj.bookingParcelsCollection
    );

    // Add timestamps
    const now = new Date();
    const parcelData = {
      ...body,
      createdAt: now,
      date: now.getDate(),
      month: now.getMonth() + 1,
      year: now.getFullYear(),
      time: now.toLocaleTimeString("en-US", { hour12: true }),
      status: "pending", // optional
    };

    const result = await collection.insertOne(parcelData);

    return NextResponse.json(
      { success: true, message: "Parcel booked successfully", result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error inserting parcel:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// GET → fetch all parcels
export async function GET() {
  try {
    const collection = await dbConnect(
      collectionNamesObj.bookingParcelsCollection
    );
    const parcels = await collection.find().toArray();

    return NextResponse.json({ success: true, parcels });
  } catch (error) {
    console.error("Error fetching parcels:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch parcels" },
      { status: 500 }
    );
  }
}

// PATCH → update rider status + feedback
export async function PATCH(req) {
  try {
    const { id, status, feedback } = await req.json();
    const collection = await dbConnect(
      collectionNamesObj.applyRidersCollection
    );

    const updateData = { status };
    if (feedback !== undefined) {
      updateData.feedback = feedback;
    }

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.modifiedCount === 1) {
      return NextResponse.json({ success: true, message: "Status updated" });
    } else {
      return NextResponse.json(
        { success: false, message: "No rider updated" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("❌ Error updating rider status:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update status" },
      { status: 500 }
    );
  }
}
