import { NextResponse } from "next/server";
import dbConnect from "../../../Lib/db.connect";

export async function GET() {
    const debugInfo = {
        NEXTAUTH_URL: process.env.NEXTAUTH_URL ? process.env.NEXTAUTH_URL : "MISSING",
        NEXTAUTH_SECRET_SET: !!process.env.NEXTAUTH_SECRET,
        GOOGLE_CLIENT_ID_SET: !!process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET_SET: !!process.env.GOOGLE_CLIENT_SECRET,
        MONGODB_URI_SET: !!process.env.MONGODB_URI,
        NODE_ENV: process.env.NODE_ENV,
    };

    try {
        // Test DB Connection
        await dbConnect("test");
        debugInfo.DB_CONNECTION = "SUCCESS";
    } catch (error) {
        debugInfo.DB_CONNECTION = "FAILED: " + error.message;
    }

    return NextResponse.json(debugInfo);
}
