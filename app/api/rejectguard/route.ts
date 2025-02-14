import { NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import User from "@/models/Roles";

export async function DELETE(req: Request) {
  await connectDB();

  try {
    const { guardId } = await req.json();

    if (!guardId) {
      return NextResponse.json({ error: "Guard ID is required" }, { status: 400 });
    }

    // Delete the guard from the database
    const deletedGuard = await User.findByIdAndDelete(guardId);

    if (!deletedGuard) {
      return NextResponse.json({ error: "Guard not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Guard deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting guard" }, { status: 500 });
  }
}
