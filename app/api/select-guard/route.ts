import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/mongo";
import User from "@/models/Roles";
import { sendSms } from "@/utils/sendSms"; // Import the sendSms function

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { guardId, society, setDuty } = await req.json();
    console.log(`Guard id: ${guardId}, society: ${society}, setDuty: ${setDuty}`);

    if (!guardId || !society || !setDuty) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Find and update the guard's setDuty field
    const updatedGuard = await User.findByIdAndUpdate(
      guardId,
      { setDuty },
      { new: true }
    );

    if (!updatedGuard) {
      return NextResponse.json({ message: "Guard not found" }, { status: 404 });
    }

    // Send SMS notification
    if (updatedGuard.phone) {
      const smsMessage = `Dear ${updatedGuard.name}, you have been assigned duty on ${setDuty} for society ${society}. Please report on time.`;
      const smsResponse = await sendSms(updatedGuard.phone, smsMessage);

      if (!smsResponse.success) {
        console.error("❌ Error sending SMS:", smsResponse.error);
      }
    }

    return NextResponse.json({ message: "Guard Updated", guard: updatedGuard });
  } catch (error) {
    console.error("❌ Error assigning guard:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
