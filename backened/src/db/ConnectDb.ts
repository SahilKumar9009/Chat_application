import mongoose from "mongoose";
import { MONGODB_URI } from "../config/config";

export const connectDb = async () => {
  await mongoose.connect(MONGODB_URI);
};
