import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, index: true },
    url: { type: String, required: true },
    clicks: { type: Number, default: 0 },
    last_clicked: { type: Date }
  },
  { timestamps: true }
);

export default mongoose.model("Link", linkSchema);
