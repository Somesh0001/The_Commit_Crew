import { NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import User from "@/models/Roles";

export async function PUT(req: Request) {
  await connectDB();

  try {
    
    const { guardId } = await req.json();
console.log(guardId);
    if (!guardId) {
      return NextResponse.json({ error: "Guard ID is required" }, { status: 400 });
    }

    // Update the guard's approval status
    const updatedGuard = await User.findByIdAndUpdate(
      guardId,
      { approved: true },
      { new: true }
    );

    if (!updatedGuard) {
      return NextResponse.json({ error: "Guard not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Approval updated successfully", guard: updatedGuard });
  } catch (error) {
    return NextResponse.json({ error: "Error updating approval status" }, { status: 500 });
  }
}
