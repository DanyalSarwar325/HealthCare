// app/api/signUp/route.ts
import DbConnect from "@/app/lib/dbConnect";
import UserModel from "@/app/models/User";
import bcrypt from "bcryptjs";
// import  {SendVerificationEmail}  from "@/app/helpers/sendVerificationEmail";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
 
  try {
    console.log("Inside backend 567")
     await DbConnect();
    const {username, email, password} = await req.json();
    console.log(username)

     // basic validation
    if (!username || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    }  

    const userExist = await UserModel.findOne({
      email,
     
    });

console.log("User founf")
    if (userExist) {
      return NextResponse.json(
        { success: false, message: "User already exist" },
        { status: 400 }
      );
    }

    // const existingUserByEmail = await UserModel.findOne({ email });
    // // const code = Math.floor(10000 + Math.random() * 13000 + 455).toString();

    // if (existingUserByEmail) {
     
    //     return NextResponse.json(
    //       { success: true, message: "User is already  Registered  Please Log in." },
    //       { status: 200 }
    //     );
    //   } 
    

    // New user
    const hashedPassword = await bcrypt.hash(password, 10);
    // const expiryDate = new Date();
    // const CodeExpiry=expiryDate.setHours(expiryDate.getHours() + 1);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      // verifyCode: code,
      // expiryDate:CodeExpiry,
      // isVerified: false,
      // messages: [],
    });

    await newUser.save();
    // const emailResponse = await SendVerificationEmail(username, email, code);
    // if (!emailResponse.success) {
    //   return NextResponse.json(
    //     { success: false, message: emailResponse.message },
    //     { status: 500 }
    //   );
    // }
     return NextResponse.json(
      { success: true, message: "User Registered Sucessfully" },
      { status: 200 }
    );

  

    

    // return NextResponse.json(
    //   { success: true, message: "User Registered Successfully, Verify your email" },
    //   { status: 201 }
    // );
    
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { success: false, message: "Error During registering User" },
      { status: 500 }
    );
  }
}
