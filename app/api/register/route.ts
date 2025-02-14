import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../lib/mongo";
import User from "../../../models/Roles";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

     const body = await req.json();  
    console.log("Parsed Request Body:", body);

    const user = await User.create(body);

    return NextResponse.json({
      message: "User created successfully",
      user: user,
    });
  } catch (error: any) {
    console.error("Error creating user:", error);
    return NextResponse.json({
      message: "Error creating user",
      error: error.message,
    }, { status: 400 });
  }
}
