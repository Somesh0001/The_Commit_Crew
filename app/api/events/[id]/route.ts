import {NextRequest, NextResponse } from "next/server";

import Events from "../../../../models/Events";
import connectDB from "../../../../lib/mongo";

interface EventRequest {
  title: string;
  author: string;
  body: string;
  briefSummary: string;
  location: string;
  imageUrls: string[];
}


export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  try {
    console.log("Id received is : ", id);
    await connectDB();
    const _id = id;
    const event = await Events.findById(_id); 
    return NextResponse.json({ message: "Event fetched successfully", event });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
  ) {
    const { id } = await params;
    try {
      console.log("Id received is : ", id);
      await connectDB();
      const _id = id;
      const event = await Events.findByIdAndDelete(_id); 
      return NextResponse.json({ message: "Event deleted successfully", event });
    } catch (error) {
      return NextResponse.json({ error });
    }
  }

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } =  await params;
    try {
      console.log("Id received is : ", id);
      await connectDB();
      const _id = id;
      const event = await Events.findByIdAndUpdate(_id, JSON.parse(await req.text()) as EventRequest, { new: true });
      return NextResponse.json({ message: "Event updated successfully", event });
    } catch (error) {
      return NextResponse.json({ error });
    }
}