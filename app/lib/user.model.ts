// models/User.js
import mongoose, { Schema, model, models } from "mongoose";

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Avoid model reinitialization
export const User = models.User || model<IUser>("User", UserSchema);
