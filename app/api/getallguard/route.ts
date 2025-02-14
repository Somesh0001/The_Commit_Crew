import { NextResponse } from "next/server";
import connectDB from "@/lib/mongo"; // Ensure MongoDB connection utility
import User from "@/models/Roles"; // Import the correct User model

export async function GET() {
  await connectDB();

  try {
    const guards = await User.find({ role: "guard" }).select("-password"); // Exclude passwords for security

    if (!guards.length) {
      return NextResponse.json({ message: "No guards found" }, { status: 404 });
    }

    return NextResponse.json({ guards }, { status: 200 });
  } catch (error) {
    console.error("Error fetching guards:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
