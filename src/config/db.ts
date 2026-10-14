import mongoose from "mongoose";

export const connectDB = async (): Promise<typeof mongoose> => {
  try {
    const mongoUri =
      process.env.MONGO_URI || "mongodb://localhost:27017/skm_dev";
    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected Successfully`);
    return conn;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
