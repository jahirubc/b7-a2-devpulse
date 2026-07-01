import dotenv from "dotenv";
import app from "./app";
import { pool } from "./config/db";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await pool.query("SELECT NOW()");
    console.log("PostgreSQL Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to PostgreSQL");
    console.error(error);
  }
}

startServer();
