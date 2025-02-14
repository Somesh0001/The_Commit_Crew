// pages/api/unapprovedGuards.ts
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

    // Fetch guards where approved is false
    const unapprovedGuards = await User.find({ role: "guard", society, approved: false });

    
    return NextResponse.json(unapprovedGuards);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching unapproved guards" }, { status: 500 });
  }
}
