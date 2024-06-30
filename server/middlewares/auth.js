import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyJWT = async (req, _, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    // console.log(token);
    if (!token) {
      throw new Error("Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new Error("Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new Error(error?.message || "Invalid access token");
  }
};
