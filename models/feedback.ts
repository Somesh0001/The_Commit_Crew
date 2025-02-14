import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
  {
    ratingCount: { type: Number, min: 1, max: 5, required: true }, // Rating between 1-5
    comment: { type: String, required: true }, // User feedback comment
    givenBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User who gives feedback
    givenTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Guard receiving feedback
    createdAt: { type: Date, default: Date.now }, // Timestamp for feedback
  }
);

export default mongoose.models.Feedback || mongoose.model("Feedback", FeedbackSchema);
