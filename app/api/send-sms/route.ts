import  { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER!; // Add this to .env.local

const client = twilio(accountSid, authToken);

export  async function POST(req: NextRequest, res: NextResponse) {
 

  const { to, message } = await req.json();

  if (!to || !message) {
    return NextResponse.json({message: "Recipient phone number and message are required" })
  }

  try {
    const response = await client.messages.create({
      body: message,
      from: twilioPhone,
      to,
    });
     return NextResponse.json({ success: true, message: "SMS sent successfully", sid: response.sid })
   
  } catch (error) {
    console.error("❌ Error sending SMS:", error);
    return NextResponse.json({ success: false, message: "Failed to send SMS", error })
  }
}
