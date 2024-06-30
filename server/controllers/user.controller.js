import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("Please enter a valid email.");
    }

    if (!password) {
      throw new Error("Please enter a valid password.");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User does not exist.");
    }

    const isPasswordtrue = bcrypt.compareSync(password, user.password);

    if (!isPasswordtrue) {
      throw new Error("Incorrect password.");
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.email,
      },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successfully",
      user,
      token,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

const SignUpUser = async (req, res) => {
  try {
    const { name, email, password, courseName } = req.body;

    console.log(req.file);

    // if (!name) {
    //   throw new Error("Please provide name");
    // }
    // if (!email) {
    //   throw new Error("Please provide email");
    // }
    // if (!password) {
    //   throw new Error("Please provide password");
    // }
    // if (courseName) {
    //   throw new Error("Please provide course course name");
    // }

    const user = await User.findOne({ email });

    // if (user) {
    //   throw new Error("User already exist");
    // }

    const avatarLocalPath = req.file?.path;

    console.log(avatarLocalPath);
    // if (!avatarLocalPath) {
    //   throw new Error("Please upload an Profile Picture.");
    // }

    const profilePicture = await uploadOnCloudinary(avatarLocalPath);

    console.log(profilePicture);

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const payload = {
      name: name,
      email: email,
      password: hash,
      courseName: courseName,
      profilePicture: profilePicture.url,
      role: "GENERAL",
    };

    const newUser = await User.create(payload);

    res.status(201).json({
      message: "User created successfully",
      newUser,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

export { LoginUser, SignUpUser };
