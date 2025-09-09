import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const middleware = async (req) => {
    const token=await getToken({req});
    if(token)
        console.log("Middleware token",token);
  return NextResponse.next();
};
