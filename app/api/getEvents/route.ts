import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../lib/mongo";
import Events from "../../../models/Events"

interface Event {
    title: String,
    author: String,
    body: String,
    briefSummary: String,
    location: String,
    imageUrls: [String], 
}
export async function GET() {
  try {
    await connectDB();
    const events = await Events.find();
    return NextResponse.json({
      message: "Events data detched successfully ",
      status: 201,
      data: events,
    });
  } catch (error) {
    console.error("Error during event data fetching:", error);
    return NextResponse.json({
      message: "Internal server error",
      status: 500,
    });
  }
}