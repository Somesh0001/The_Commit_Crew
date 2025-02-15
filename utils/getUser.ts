"use server";

import connectDB from "@/lib/mongo";
import User from "@/models/Roles";
export interface UserInterface {
    email: string;
}

export const getUser = async (email: string) => {
    await connectDB()
    try {
        const user = await User.findOne({ email });
        console.log(user);
        return user;
    } catch (error) {
        return error;
    }
};
