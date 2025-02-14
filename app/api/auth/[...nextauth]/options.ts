import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

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
                password: { label: "Password:", type: "password", placeholder: "your-awesome-password" }
            },
            async authorize(credentials) {
             
                await connectDB();
                const user = await User.findOne({ email: credentials?.email });

                if (!user) {
                    throw new Error("User not found. Please register first.");
                }

               
                if (credentials?.password !== user.password) {
                    throw new Error("Invalid credentials");
                }

                return user;
            }
        })
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

                console.log("Google Login Success:", user.email);
            }
            return true;
        }
    },
    pages: {
        signIn: "/signin",
        signOut: "/signout"
    }
};
