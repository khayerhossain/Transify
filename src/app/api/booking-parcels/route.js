import { NextResponse } from "next/server";
import dbConnect, { collectionNamesObj } from "@/Lib/db.connect.js";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/Lib/authOptions";

// POST → insert new parcel booking
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const collection = await dbConnect(
      collectionNamesObj.bookingParcelsCollection
    );

    // Add timestamps
    const now = new Date();
    const parcelData = {
      ...body,
      userEmail: session.user.email,
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

// PATCH → update parcel booking (e.g. status)
export async function PATCH(req) {
  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: "id and status are required" },
        { status: 400 }
      );
    }

    const collection = await dbConnect(
      collectionNamesObj.bookingParcelsCollection
    );

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );

    if (result.modifiedCount === 1) {
      return NextResponse.json({
        success: true,
        message: "Parcel status updated",
      });
    }

    return NextResponse.json(
      { success: false, message: "No parcel updated" },
      { status: 400 }
    );
  } catch (error) {
    console.error("❌ Error updating parcel status:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update parcel status" },
      { status: 500 }
    );
  }
}
