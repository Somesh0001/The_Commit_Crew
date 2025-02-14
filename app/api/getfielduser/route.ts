import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/mongo"; // MongoDB connection utility
import User from "@/models/Roles"; // Correct model import
import { getToken } from "next-auth/jwt"; // NextAuth token extraction

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findById(token.id).select("-password"); // Exclude password
    if (!user || user.role !== "field_visitor") {
      return NextResponse.json({ error: "User not found or not a field visitor" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching field visitor:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
