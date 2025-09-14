import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import DbConnect from "@/app/lib/dbConnect";
import UserModel from "@/app/models/User";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const payload: any = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "fallback-secret"
    );

    await DbConnect();
    const user = await UserModel.findById(payload.id).select("-password");

    if (!user) {
      return NextResponse.json({ user: null }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("GET /api/profile error:", error);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const payload: any = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "fallback-secret"
    );

    const body = await req.json();

    await DbConnect();
    const updatedUser = await UserModel.findByIdAndUpdate(
      payload.id,
      {
        username: body.username,
        phone: body.phone,
        address: body.address,
        gender: body.gender,
        image: body.image,
      },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error("PUT /api/profile error:", error);
    return NextResponse.json({ message: "Error updating profile" }, { status: 500 });
  }
}
