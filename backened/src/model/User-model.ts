import { Document, Schema, model } from "mongoose";
import { JWT_SECRET } from "../config/config";
import jwt from "jsonwebtoken";

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

UserSchema.methods.generateToken = function () {
  const payload = {
    id: this._id,
  };
  const options = {
    expiresIn: "1h",
  };
  return jwt.sign(payload, JWT_SECRET);
};

export const User = model<Document>("User", UserSchema);
export default User;
