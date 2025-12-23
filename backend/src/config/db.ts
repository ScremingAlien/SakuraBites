import mongoose from "mongoose";

const MONGO_URL: string = process.env.DB_URL || "";

if (!MONGO_URL) {
  throw new Error("❌ MongoDB connection string (DB_URL) is not defined in environment variables");
}

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URL, {
      // You can still pass options if needed, but from mongoose v7 most defaults are fine
      // dbName: process.env.DB_NAME, // optional if you want separate DB name
    });

    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);

    // Exit process on DB failure (best practice in prod)
    process.exit(1);
  }

  // Handle disconnections after initial connect
  mongoose.connection.on("disconnected", () => {
    console.warn("⚠️ MongoDB disconnected. Attempting to reconnect...");
  });

  mongoose.connection.on("reconnected", () => {
    console.log("🔄 MongoDB reconnected");
  });

  mongoose.connection.on("error", (err) => {
    console.error("❌ MongoDB error:", err);
  });
};

export default connectDB;
