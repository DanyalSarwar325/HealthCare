import UserModel from "@/app/models/User";
import bcrypt from "bcryptjs";
import DbConnect from "@/app/lib/dbConnect";

export async function POST(request:Request){
    try {
        
    
    await DbConnect()
    const {email,password}= await request.json()
    const User=await UserModel.findOne({email})
    if(!User){
        return Response.json({
            success:false,
            message:"User is not registered"

        })
    }
    const isPasswordValid= await bcrypt.compare(password,User.password)
    if(!isPasswordValid){
          return Response.json({
            success:false,
            message:"Password Is Incorrect"

        })
    }
    const UserVerified= User.isVerified
    if(!UserVerified){
         return Response.json({
            success:false,
            message:"Please Verify the User"

        })
    }
    return Response.json({
        
      success: true,
      message: "Login successful",
      user: {
        id: User._id,
        username: User.username,
        email: User.email,
      },
    });
    } catch (error) {
        
         return Response.json({
            success:false,
            message:"Error Occured During Log In ,",error

        })
    }
    
    

}