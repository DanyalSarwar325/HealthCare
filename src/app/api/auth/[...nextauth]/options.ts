import { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import DbConnect from "@/app/lib/dbConnect";
import UserModel from "@/app/models/User";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOption: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await DbConnect();
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Missing credentials");
          }

          // Find user by email OR username
          const user = await UserModel.findOne({
            $or: [{ email: credentials.email }, { username: credentials.email }],
          });

          if (!user) {
            throw new Error("User not found");
          }

          // Compare password
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("Incorrect Password");
          }

          return user;
        } catch (error: any) {
          throw new Error(error.message || "Invalid Credentials");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = (user as any)._id?.toString();
        token.username = (user as any).username;
        token.isVerified = (user as any).isVerified;
        token.isAcceptingMessages = (user as any).isAcceptingMessages;
        token.email = (user as any).email;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          _id: token._id as string,
          username: token.username as string,
          isVerified: token.isVerified as boolean,
          isAcceptingMessages: token.isAcceptingMessages as boolean,
          email: token.email as string,
        };
      }
      return session;
    },
  },

  pages: {
    signIn: "/signIn",
    signOut: "/signOut",
    
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 60, // ⏰ 30 minutes
  },

  secret: process.env.NEXT_AUTH_SECRET,
};
