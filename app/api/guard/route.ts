// pages/api/guards.ts
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import User from "@/models/Roles";

export async function POST(req: Request) {
    await connectDB();

  try {
    const { society } = await req.json();
    if (!society) {
      return NextResponse.json({ error: "Society is required" }, { status: 400 });
    }

    const guards = await User.find({ role: "guard", society });
    return NextResponse.json(guards);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching guards" }, { status: 500 });
  }
}
