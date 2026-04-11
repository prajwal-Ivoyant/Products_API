import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo DB connection successful");
  } catch (err) {
    console.error("MongoDB Error:", err.message);
    process.exit(1); // ✅ Exit on DB failure so the server doesn't run blind
  }
};

export default connectDB;
