import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["guard", "police", "society_owner", "field_visitor"],
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    phone: { type: String, required: true },
    aadhar: { type: String, required: true },
    society: { type: String, default: "" },
    address: { type: String, required: true },
    approved: { type: Boolean, required: true },
    setDuty: { type: String, default: null }, 
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
