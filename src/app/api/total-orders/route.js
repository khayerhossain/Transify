import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import dbConnect, { collectionNamesObj } from "@/Lib/db.connect.js";

// GET: fetch all orders
export async function GET() {
  try {
    const collection = await dbConnect(
      collectionNamesObj.bookingParcelsCollection
    );
    const orders = await collection.find().sort({ createdAt: -1 }).toArray();

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

//PATCH: update order status
export async function PATCH(req) {
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: "Order ID and status required" },
        { status: 400 }
      );
    }

    const collection = await dbConnect(
      collectionNamesObj.bookingParcelsCollection
    );

    await collection.updateOne({ _id: new ObjectId(id) }, { $set: { status } });

    return NextResponse.json({ success: true, message: "Order updated" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update order" },
      { status: 500 }
    );
  }
}
