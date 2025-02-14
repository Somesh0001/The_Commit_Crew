import {NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import User from "@/models/Roles";

export async function GET(  req: NextRequest,
    { params }: { params: { id: string } }) {
  await connectDB();
  const { id } = await params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
