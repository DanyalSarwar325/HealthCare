import UserModel from "@/app/models/User";
import bcrypt from "bcryptjs";
import DbConnect from "@/app/lib/dbConnect";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    await DbConnect();
    const { email, password } = await request.json();

    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User is not registered" },
        { status: 404 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Password is incorrect" },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username,
        
      },
      process.env.NEXTAUTH_SECRET || "fallback-secret",
      { expiresIn: "24h" }
    );

    // Prepare response
    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      },
      { status: 200 }
    );

    // Attach cookie
    response.cookies.set("auth-token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60, // 24 hours
      path: "/", // available everywhere
    });

    return response;
  } catch (error: unknown) {
     let message = "Error occurred during login";
    return NextResponse.json(
      {
        success: false,
        message: message,
        
      },
      { status: 500 }
    );
  }
}
