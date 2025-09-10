import UserModel from "@/app/models/User";
import DbConnect from "@/app/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request:Request) {

  try {
    await DbConnect()
    const {code,username}  =await request.json()
   const decodedUser= decodeURIComponent(username)
   console.log(decodedUser)
    const user=await UserModel.findOne({username:decodedUser})
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }

    const isCodeValid=user?.verifyCode==code
    if (!user.expiryDate) {
  return NextResponse.json({
    success: false,
    message: "No expiry date found for this user",
  });
}
    const codeNotExpiry=new Date(user.expiryDate) >new Date()
   if(isCodeValid && codeNotExpiry){
    user.isVerified=true
    await user.save()
    return NextResponse.json({
        success: true,
        message: "User verified successfully",
      });
      
  
      
    
  

   }
   else if(!codeNotExpiry){
    return Response.json({
            success:false,
            message:"verfication code expired,Please SignUp"
           })

   }
   

  } 
  catch (error) {
       return Response.json({
            success:false,
            message:"Error verifying user"
           })
  }
  
    
}