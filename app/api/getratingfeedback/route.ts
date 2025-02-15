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
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = token.id;
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const feedbacks = await Feedback.find({ givenTo: userId })
      .populate("givenBy", "name email")
      .sort({ createdAt: -1 })
      .lean();

    // Convert the feedbacks to plain objects (if needed)
    const plainFeedbacks = JSON.parse(JSON.stringify(feedbacks));

    return NextResponse.json({ feedbacks: plainFeedbacks }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
