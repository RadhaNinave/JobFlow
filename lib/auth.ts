import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { connectDB } from "./db";
import User from "@/models/User";
const secret = process.env.JWT_SECRET || "dev-secret-change-me";
export type Session = {
  id: string;
  role: "user" | "admin";
  name: string;
  email: string;
};
export function signToken(s: Session) {
  return jwt.sign(s, secret, { expiresIn: "7d" });
}
export async function getSession(): Promise<Session | null> {
  const token = (await cookies()).get("jobflow_token")?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, secret) as Session;
  } catch {
    return null;
  }
}
export async function requireSession() {
  const s = await getSession();
  if (!s) throw new Error("UNAUTHORIZED");
  return s;
}
export async function requireAdmin() {
  const s = await requireSession();
  if (s.role !== "admin") throw new Error("FORBIDDEN");
  return s;
}
export async function getCurrentUser() {
  const s = await getSession();
  if (!s) return null;
  await connectDB();
  return User.findById(s.id).select("-password").lean();
}
