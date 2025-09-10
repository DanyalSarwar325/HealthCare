import DbConnect from "@/app/lib/dbConnect";
import UserModel from "@/app/models/User";

import { getServerSession } from "next-auth";
import { User } from "next-auth";
import { authOption } from "../auth/[...nextauth]/options";

export async function POST(req: Request) {
  const session = await getServerSession(authOption);
  const user: User = session?.user as User;
  if (!session && !user)
    return Response.json(
      {
        success: false,
        message: "User Not Authenticated",
      },
      { status: 401 }
    );
    const userId=user._id
}
