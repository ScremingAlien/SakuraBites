import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname in ES modules
const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

// Pick env file based on argument
const envFile: string = process.argv.includes("--production") ? ".env.production" : ".env";

// Load dotenv
dotenv.config({
  path: path.resolve(__dirname, `../../${envFile}`),
});

console.log(`✅ Loaded environment from ${envFile}`);

// Define expected env variables (strong typing)
interface Env {
  NODE_ENV: "development" | "production" | "test";
  PORT: string;
  DB_URL: string;
  DB_NAME?: string;
}

export const env: Env = {
  NODE_ENV: (process.env.NODE_ENV as Env["NODE_ENV"]) || "development",
  PORT: process.env.PORT || "5000",
  DB_URL: process.env.DB_URL || "",
  DB_NAME: process.env.DB_NAME,
};

if (!env.DB_URL) {
  throw new Error("❌ DB_URL is missing in environment variables");
}
