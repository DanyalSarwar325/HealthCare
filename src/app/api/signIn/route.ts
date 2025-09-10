import UserModel from "@/app/models/User";
import bcrypt from "bcryptjs";
import DbConnect from "@/app/lib/dbConnect";
import { NextResponse } from "next/server";

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

    return NextResponse.json(
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

    // If you want to add verification:
    // if (!user.isVerified) {
    //   return NextResponse.json(
    //     { success: false, message: "Please verify your account" },
    //     { status: 403 }
    //   );
    // }
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Error occurred during login",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
