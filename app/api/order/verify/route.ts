import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "@/models/Order";
import { v4 as uuid } from "uuid";
import connectDB from "@/lib/mongo";

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

export async function POST(req: NextRequest, res: NextResponse) {
  const { razorpayOrderId, razorpaySignature, razorpayPaymentId, email } =
    await req.json();
  const body = razorpayOrderId + "|" + razorpayPaymentId;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpaySignature;

  if (!isAuthentic) {
    return NextResponse.json(
      { message: "invalid payment signature", error: true },
      { status: 400 }
    );
  }

  // connect db and update data
  await connectDB();
  await Order.findOneAndUpdate({ email: email }, { hasPaid: true });

  return NextResponse.json(
    { message: "payment success", error: false },
    { status: 200 }
  );
}