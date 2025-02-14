import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../lib/mongo";
import User from "../../../models/Roles";
import { sendSms } from "../../../utils/sendSms";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { guardId } = await req.json();

    if (!guardId) {
      return NextResponse.json({ message: "Guard ID required" }, { status: 400 });
    }

  
    const guard = await User.findById(guardId);
    if (!guard || guard.role !== "guard") {
      return NextResponse.json({ message: "Guard not found" }, { status: 404 });
    }

   
    const phoneNumber = guard.phone;
    if (!phoneNumber) {
      return NextResponse.json({ message: "Guard phone number not found" }, { status: 400 });
    }

  
    const message = `Hello ${guard.name}, you are absent from your duty today. Please report immediately if this is a mistake.`;

 
    const smsResponse = await sendSms(phoneNumber, message);

    if (smsResponse.success) {
      console.log(`✅ Notified guard ${guard.name} (${guard.phone}) about their absence.`);
      return NextResponse.json({ message: `Notified ${guard.name} via SMS` }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Failed to send SMS", error: smsResponse.error }, { status: 500 });
    }
  } catch (error) {
    console.error("❌ Server error:", error);
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}
