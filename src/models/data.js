import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
  },
  { timestamps: true },
);

const Data = mongoose.model("Data", dataSchema);

export default Data;
