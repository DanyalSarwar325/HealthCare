import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import DbConnect from "@/app/lib/dbConnect"
import UserModel from "@/app/models/User"

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ loggedIn: false, user: null })
    }

    // Verify and decode token
    const payload = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "fallback-secret"
    ) as any

    // Check if token is expired
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return NextResponse.json({ loggedIn: false, user: null })
    }

    await DbConnect()
    const user = await UserModel.findById(payload.id).select("-password") as { _id: any; email: string; username: string } | null

    if (!user) {
      return NextResponse.json({ loggedIn: false, user: null })
    }

    return NextResponse.json({
      loggedIn: true,
      user: {
        id: user._id.toString(),
        email: user.email,
        username: user.username,
      },
    })
  } catch (error) {
    console.error("Auth verification error:", error)
    return NextResponse.json({ loggedIn: false, user: null })
  }
}
