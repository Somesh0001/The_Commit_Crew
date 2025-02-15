import mongoose, { Schema, models } from "mongoose";
const PaymentSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    orderId: { type: Boolean, requied: true },
    amount: { type: Number, required: true },
    paymentId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Payments = models.Payments || mongoose.model("Payments", PaymentSchema);
export default Payments;