import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../lib/mongo";
import User from "../../../models/Roles";
export default async function POST(req: NextRequest, res: NextResponse) {
  await connectDB();
  try {
    const { guardId } =await req.json();  
    if (!guardId) return NextResponse.json({message: "Guard ID required "})
    const guard = await User.findById(guardId);
    if (!guard || guard.role !== "guard") return NextResponse.json({message: "Guard not found"})
    console.log(`Notified guard ${guard.name} (${guard.email}) about their duty.`);
    return NextResponse.json({message:`Notified ${guard.name}`})
  } catch (error) {
    return NextResponse.json({message: "Server error", error })
  }
}
