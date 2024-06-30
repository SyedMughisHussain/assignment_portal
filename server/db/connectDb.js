import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("Connecting to Dataase Successfully");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;