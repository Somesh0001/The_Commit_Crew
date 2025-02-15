import { NextResponse, NextRequest } from "next/server";
import Payments from "@/models/Payments";

interface Payment {
  orderId: string;
  paymentId: string;
  email: string;
  amount: number;
}

async function savePayment(
  payment: Payment
): Promise<{ success: boolean; message?: string; payment?: Payment }> {
  try {
    const newPayment = new Payments({
      orderId: payment.orderId,
      email: payment.email,
      paymentId: payment.paymentId,
      amount: payment.amount,
    });

    // Here you should save newPayment to the database
    await newPayment.save(); // Assuming Mongoose or similar ORM

    return {
      success: true,
      message: "Payment saved successfully",
      payment: newPayment,
    };
  } catch (error) {
    console.error("Error saving payment to database:", error);
    return { success: false, message: "Internal server error" };
  }
}

// Fixing the POST method
export async function POST(req: NextRequest) {
  try {
    const paymentData: Payment = await req.json(); // Fix: Use req.json() to parse the request body

    const saveResult = await savePayment(paymentData);

    if (saveResult.success) {
      return NextResponse.json({
        success: true,
        message: "Payment saved successfully",
        payment: saveResult.payment,
      });
    } else {
      return NextResponse.json(
        { success: false, message: saveResult.message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error handling save payment request:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
