import mongoose, { Schema, models } from "mongoose";
const OrderSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    hasPaid: { type: Boolean, requied: true },
    amount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Order = models.Order || mongoose.model("Order", OrderSchema);
export default Order;
 