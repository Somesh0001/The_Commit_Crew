"use server";

import User from "@/models/Roles";
export interface UserInterface {
    email: string;
}

export const getUser = async (email: string) => {
    try {
        const user = await User.findOne({ email });
        return user;
    } catch (error) {
        return error;
    }
};
