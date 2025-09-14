import { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import DbConnect from "@/app/lib/dbConnect";
import UserModel, { IUser } from "@/app/models/User";
import CredentialsProvider from "next-auth/providers/credentials";

interface Credentials {
  email: string;
  password: string;
}

export const authOption: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Credentials | undefined): Promise<IUser | null> {
        await DbConnect();
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = await UserModel.findOne({
          $or: [{ email: credentials.email }, { username: credentials.email }],
        }) as IUser | null;

        if (!user) {
          throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error("Incorrect Password");
        }

        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as IUser;
        token._id = u._id.toString();
        token.username = u.username;
        token.isVerified = u.isVerified;
        token.isAcceptingMessages = u.isAcceptingMessages;
        token.email = u.email;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          _id: token._id!,
          username: token.username!,
          isVerified: token.isVerified!,
          isAcceptingMessages: token.isAcceptingMessages!,
          email: token.email!,
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
    maxAge: 30 * 60, // 30 minutes
  },

  secret: process.env.NEXT_AUTH_SECRET,
};
