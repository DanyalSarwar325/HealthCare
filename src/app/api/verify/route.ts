import UserModel from "@/app/models/User";
import DbConnect from "@/app/lib/dbConnect";

export async function POST(request:Request) {
  const {verifyCode}  =await request.json()
  
    
}