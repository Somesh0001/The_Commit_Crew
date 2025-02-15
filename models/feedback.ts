import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
  {
    ratingCount: { type: Number, min: 1, max: 5, required: true }, // Rating between 1-5
    comment: { type: String, required: true }, // User feedback comment
    givenBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User who gives feedback
    givenTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Guard receiving feedback
    createdAt: { type: Date, default: Date.now } // Timestamp for feedback
  },
  {
    // These options ensure that when converting documents to JSON or plain objects,
    // virtuals (if any) are included and the output is a plain object.
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export default mongoose.models.Feedback || mongoose.model("Feedback", FeedbackSchema);
