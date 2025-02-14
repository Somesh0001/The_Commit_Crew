import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../lib/mongo";
import User from "../../../models/Roles";
export default async function POST(req: NextRequest, res: NextResponse) {
  await connectDB();
  try {
    const { guardId, guardName, society } = await req.json();
    if (!guardId || !guardName || !society) return NextResponse.json({message: "All fields are not entered "})
    console.log(`Admin notified: Guard ${guardName} (${guardId}) is absent from society ${society}.`);
    return NextResponse.json({message: `Admin notified about ${guardName}'s absence`})
  } catch (error) {
    return NextResponse.json({message: "Server error", error })
  }
}
