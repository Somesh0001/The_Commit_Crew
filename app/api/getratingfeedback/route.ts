import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/mongo";
import Feedback from "@/models/feedback";
import { getToken } from "next-auth/jwt";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const token = await getToken({ req });

    if (!token) {
      console.log("🔴 No token found. User unauthorized.");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = token.id;
    console.log("🟢 Extracted User ID:", userId);

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      console.log("🔴 Invalid user ID:", userId);
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    // Fetch feedback where `givenTo` matches logged-in user's ID
    const feedbacks = await Feedback.find({ givenTo: userId })
      .populate("givenBy", "name email")
      .sort({ createdAt: -1 });

    console.log("🟢 Found Feedbacks:", feedbacks);

    return NextResponse.json({ feedbacks }, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching feedback:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
