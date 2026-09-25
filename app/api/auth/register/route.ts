import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { signToken } from "@/lib/auth";
import { z } from "zod";
const schema = z.object({
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(6),
});
export async function POST(req: NextRequest) {
  try {
    const body = schema.parse(await req.json());
    await connectDB();
    if (await User.exists({ email: body.email.toLowerCase() }))
      return NextResponse.json(
        {
          success: false,
          message: "An account with this email already exists.",
        },
        { status: 409 },
      );
    const user = await User.create({
      name: body.name,
      email: body.email.toLowerCase(),
      password: await bcrypt.hash(body.password, 10),
    });
    const res = NextResponse.json(
      {
        success: true,
        data: { name: user.name, email: user.email, role: user.role },
      },
      { status: 201 },
    );
    res.cookies.set(
      "jobflow_token",
      signToken({
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      }),
      {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      },
    );
    return res;
  } catch (e: any) {
    return NextResponse.json(
      {
        success: false,
        message: e?.issues?.[0]?.message || "Invalid registration data.",
      },
      { status: 400 },
    );
  }
}
