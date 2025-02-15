import { NextResponse } from "next/server";
import User from "@/models/Roles";
import connectDB from "@/lib/mongo";
 // Ensure this connects to MongoDB

export async function POST(req: Request) {
    await connectDB(); // Connect to MongoDB

    try {
        const { id } = await req.json(); // Get `id` from frontend request

        if (!id) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        const user = await User.findById(id);

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
