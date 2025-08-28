import DbConnect from "@/app/lib/dbConnect";
import UserModel from "@/app/models/User";
import bcrypt from "bcryptjs";
import { SendVerificationEmail } from "@/app/helpers/sendVerificationEmail";
import { success } from "zod";

export async function POST(request: Request) {
    await DbConnect()
    try {
        const { username, email, password } = await request.json()
        const existingUserverified = await UserModel.findOne({
            username,
            isVerified: true
        })
        if (existingUserverified) {
            // console.log("User already exist and is Verified")
            return Response.json({
                success: false,
                message: "User already exist"
            })
        }
        const existingUserByEmail = await UserModel.findOne({ email })
        const code=Math.floor(10000+Math.random()*13000+455).toString()
        if (existingUserByEmail) {
            if(existingUserByEmail.isVerified){
                return Response.json({
                    success:true,
                    message:"User is Register and verified ,Please Log in .."
                })
            }
            else{
                 return Response.json({
                    success:true,
                    message:"Please verify user"
                })
            }
            }
            
            //Todo
        
        else {
            const hashedPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)

         const newUser=  new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode:code,
                expiryDate,
                isVerified: false,
                messages: []
            })
            await newUser.save()
        }
        //send Verificaton Email
        const emailResponse=await SendVerificationEmail(
            username,email,code
        )
        if(!emailResponse.success){
          return Response.json({
                success: false,
                message: emailResponse.message
            },{status:500})
        }
         return Response.json({
                success: true,
                message: "User Registered Succesfully ,Verify your email"
            },{status:500})
        


    } catch (error) {
        return Response.json({
            success: false,
            message: "Error During registering User"
        })

    }

}