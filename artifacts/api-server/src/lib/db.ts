import mongoose from "mongoose";
import { logger } from "./logger";

export async function connectDB(): Promise<void> {
  // Read at call time so dotenv has always been loaded first
  const MONGODB_URI = process.env["MONGODB_URI"];

  if (!MONGODB_URI) {
    logger.warn(
      "MONGODB_URI is not set. MongoDB connection skipped. " +
        "Add MONGODB_URI to your environment secrets to enable database features.",
    );
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    logger.info("Connected to MongoDB");
  } catch (err) {
    logger.error({ err }, "Failed to connect to MongoDB");
    process.exit(1);
  }

  mongoose.connection.on("disconnected", () => {
    logger.warn("MongoDB disconnected");
  });

  mongoose.connection.on("reconnected", () => {
    logger.info("MongoDB reconnected");
  });
}

export { mongoose };
