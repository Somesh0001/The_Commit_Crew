import { ObjectId } from "mongodb";
import mongoose from "mongoose";
const EventSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    body: String,
    briefSummary: String,
    location: String,
    imageUrls: [String], 
  },
  { timestamps: true }
);

export default mongoose.models.Events || mongoose.model("Events", EventSchema);