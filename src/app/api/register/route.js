import { NextResponse } from "next/server";
import dbConnect, { collectionNamesObj } from "@/Lib/db.connect.js";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password } = body || {};

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "name, email and password are required" },
        { status: 400 }
      );
    }

    const usersCollection = await dbConnect(
      collectionNamesObj.usersCollection
    );

    const existing = await usersCollection.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { success: false, error: "User already exists" },
        { status: 409 }
      );
    }

    const now = new Date();
    const insertResult = await usersCollection.insertOne({
      name,
      email,
      password: await bcrypt.hash(password, 10), // Hashing password
      role: "user",
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({
      success: true,
      user: { id: insertResult.insertedId.toString(), name, email },
    });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
