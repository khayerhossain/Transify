import { NextResponse } from "next/server";
import dbConnect, { collectionNamesObj } from "@/Lib/db.connect.js";

// POST: Rider sends message
export async function POST(req) {
  try {
    const body = await req.json();
    const { riderName, riderEmail, message } = body;

    // const client = await clientPromise;
    const collection = await dbConnect(
      collectionNamesObj.supportMessagesCollection
    );

    await collection.insertOne({
      riderName,
      riderEmail,
      message,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// GET: Admin fetch messages
export async function GET() {
  try {
    const collection = await dbConnect(
      collectionNamesObj.supportMessagesCollection
    );
    const messages = await collection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    return NextResponse.json({ success: true, messages });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
