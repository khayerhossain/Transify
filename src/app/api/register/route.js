import dbConnect, { collectionNamesObj } from "../../../Lib/db.connect";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    const db = await dbConnect(collectionNamesObj.usersCollection);

    // check if user already exists
    const existingUser = await db.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 400 }
      );
    }

    // insert new user
    const result = await db.insertOne({ name, email, password });

    return NextResponse.json({ success: true, result }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
