import { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import DbConnect from "@/app/lib/dbConnect";
import UserModel   from "@/app/models/User";
import CredentialsProvider from "next-auth/providers/credentials";
import { threadId } from "worker_threads";

export const authOption:NextAuthOptions={
providers:[
    CredentialsProvider({
        id:"credentials",
        name:"Credentials",
       credentials: {
      email: { label: "email", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials:any):Promise<any>{
        await DbConnect()
        try{
const user=await UserModel.findOne({
    $or:[{email:credentials.identifier
    },{username:credentials.identifier}]
})
if(!user){
    throw new Error("user not found")
}
if(!user.isVerified)
{
     throw new Error("please verify your account before Login")
        }

       const isPasswordValid= await bcrypt.hash(credentials.password,user.password)
       if(!isPasswordValid){
        throw new Error("Incorrect Passwpord")
       }

    }
        catch(err){
throw new Error()
        }

    }

    })
],
callbacks: {
    
    async session({ session, token }) {
        if(token){
            session.user._id=token._id?.toString()
            session.user.isVerified=token.isVerified;
            session.user.isAcceptingMessages=token.isAcceptingMessages,
            session.user.username=token.username
        }
      return session
    },
    async jwt({ token, user  }) {
        if(user){
            token._id=user._id?.toString(),
            token.isVerified=user.isVerified;
            token.isAcceptingMessages=user.isAcceptingMessages,
            token.username=user.username
        }
      return token
    }

},
pages:{
    signIn:'/signIn'
},
session:{
    strategy:"jwt"
},

secret:process.env.NEXT_AUTH_SECRET,
}