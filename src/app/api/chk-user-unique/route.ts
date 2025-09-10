import UserModel from "@/app/models/User";
import {z} from "zod"
import {UserNameValidation} from "@/app/schemas/signUpSchema"
import { NextRequest, NextResponse } from "next/server";
import DbConnect from "@/app/lib/dbConnect";


export const UserQuerySchema=z.object({
    username:UserNameValidation
})

export async function GET(req:Request){
    await DbConnect()
    console.log(` Request Obj${req.method}`)
    const { searchParams } = new URL(req.url);
    const queryParams = {
        username: searchParams.get("username")
    }
    //validate with zod
    const result=UserQuerySchema.safeParse(queryParams)
    console.log(result)
    if(!result.success){
       const UserNameErrors=result.error.format().username?._errors||[]
       return NextResponse.json({
        success:false,
        message:"Invalid username"
       })

    }
    const {username}=result.data
    const existingUserVerified=await UserModel.findOne({username,isVerified:true})
    if(existingUserVerified){
         return NextResponse.json({
        success:false,
        message:"Username Already Taken"
       })

    }

    return NextResponse.json({
        success:true,
        message:"Username Available"
       })

    

    }