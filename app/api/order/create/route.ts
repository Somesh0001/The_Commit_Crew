import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { v4 as uuid } from "uuid";

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const totalAmt = Number(searchParams.get("amount"));
  const amt = totalAmt * 100;
  const options = {
    amount: amt.toString(),
    currency: "INR",
    receipt: uuid(),
  };
  const order = await instance.orders.create(options);
  return NextResponse.json({
    message: "Order is successfully created  ",
    order,
  });
}