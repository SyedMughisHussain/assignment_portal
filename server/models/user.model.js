import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
    },
    role: {
      type: String,
      default: "GENERAL",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
