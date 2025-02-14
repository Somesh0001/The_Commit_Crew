import { NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import User from "@/models/Roles";

export async function GET() {
  await connectDB();

  try {
    // Fetch all users with roles "guard" and "society_owner"
    const guards = await User.find({ role: "guard" });
    const societies = await User.find({ role: "society_owner" });

    // Count unique societies by creating a Set
    const uniqueSocieties = new Set(societies.map((owner) => owner.society));

    return NextResponse.json({
      totalGuards: guards.length,
      totalSocieties: uniqueSocieties.size,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching statistics" },
      { status: 500 }
    );
  }
}
