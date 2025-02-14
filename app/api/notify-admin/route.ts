import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../lib/mongo";
import User from "../../../models/Roles";
import { sendSms } from "../../../utils/sendSms"; // Import the SMS function

export default async function POST(req: NextRequest, res: NextResponse) {
  await connectDB();
   const adminPhoneNumberDefault = "+919044283186";
  try {
    const { guardId, guardName, guardPhone, society } = await req.json();
    if (!guardId || !guardName || !guardPhone || !society) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    // Find admin for the society
    const admin = await User.findOne({ role: "society_owner", society });

    if (!admin) {
      return NextResponse.json({ message: "No admin found for this society" }, { status: 404 });
    }

    const adminPhone = admin.phone;
    const smsMessage = `Alert: Guard ${guardName} (Phone: ${guardPhone}) is absent from duty in ${society}.`;

    // Send SMS to the admin
    // this is done because twilio does not allow sending messages to unverified accounts 
    await sendSms(adminPhoneNumberDefault, smsMessage);

    console.log(`✅ Admin notified: ${smsMessage}`);

    return NextResponse.json({ message: `Admin notified about ${guardName}'s absence` }, { status: 200 });
  } catch (error) {
    console.error("❌ Error notifying admin:", error);
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}
