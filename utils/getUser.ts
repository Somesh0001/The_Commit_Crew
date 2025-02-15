"use server";

import User from "@/models/Roles";

export const getUser = async (email: string) => {
  try {
    const user = await User.findOne({ email }).lean();
    // Convert to a plain object
    const plainUser = JSON.parse(JSON.stringify(user));
    return { data: plainUser };
  } catch (error: any) {
    return { error: error.message };
  }
};
