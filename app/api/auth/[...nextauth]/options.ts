import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import connectDB from "../../../../lib/mongo";
import User from "../../../../models/Roles";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email:", type: "text", placeholder: "your-cool-username" },
        password: { label: "Password:", type: "password", placeholder: "your-awesome-password" },
       
         fingerprintVerified: {
          label: "Fingerprint Verified",
          type: "hidden",
        },
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({ email: credentials?.email });

        if (!user) {
          throw new Error("User not found. Please register first.");
        }

        if (!user.approved) {
          throw new Error("Your account is not approved yet. Please contact admin.");
        }

        if (credentials?.password !== user.password) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        await connectDB();
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          console.log("Unauthorized Google Login Attempt:", user.email);
          return false;
        }

        if (!existingUser.approved) {
          console.log("Google Login Attempt Blocked (Not Approved):", user.email);
          return false;
        }

        console.log("Google Login Success:", user.email);
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.approved = user.approved;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.approved = token.approved;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    signOut: "/signout",
  },
};
