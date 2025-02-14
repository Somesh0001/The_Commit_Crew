import { NextResponse } from "next/server";
import connectDB from "@/lib/mongo"; // Ensure you have a MongoDB connection utility
import Feedback from "../../../models/feedback"; // Import the Feedback model
import User from "../../../models/Roles"; // Import User model to verify users

export async function POST(req: Request) {
  await connectDB();

  try {
    const { ratingCount, comment, givenBy, givenTo } = await req.json();

    // Validate required fields
    if (!ratingCount || !comment || !givenBy || !givenTo) {
      return NextResponse.json(
        { error: "All fields (ratingCount, comment, givenBy, givenTo) are required." },
        { status: 400 }
      );
    }

    // Ensure givenBy and givenTo exist in the User collection
    const giver = await User.findById(givenBy);
    const receiver = await User.findById(givenTo);

    if (!giver || !receiver) {
      return NextResponse.json({ error: "Invalid user IDs." }, { status: 404 });
    }

    // Create feedback entry
    const newFeedback = new Feedback({ ratingCount, comment, givenBy, givenTo });
    await newFeedback.save();

    return NextResponse.json({ message: "Feedback submitted successfully!", feedback: newFeedback });
  } catch (error) {
    console.error("Error posting feedback:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
