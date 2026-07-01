import bcrypt from "bcrypt";
import { pool } from "../../config/db";
import { IUser } from "./auth.interface";

export const signupUser = async (user: IUser) => {
  // Step 1: Check duplicate email
  const existingUser = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [user.email],
  );

  if (existingUser.rows.length > 0) {
    throw new Error("Email already exists");
  }

  // Step 2: Hash password
  const hashedPassword = await bcrypt.hash(user.password, 10);

  // Step 3: Insert user
  const result = await pool.query(
    `
    INSERT INTO users(name, email, password, role)
    VALUES($1,$2,$3,$4)
    RETURNING id,name,email,role,created_at,updated_at
    `,
    [user.name, user.email, hashedPassword, user.role],
  );

  return result.rows[0];
};
