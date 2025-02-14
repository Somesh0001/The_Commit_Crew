import { NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import User from "@/models/Roles";

export async function GET() {
    await connectDB();

    try {
        const today = new Date().toISOString().split("T")[0]; 
        console.log("Today : " + today);
        const activeGuards = await User.find({ role: "guard", setDuty: today });

        return NextResponse.json(activeGuards);
    } catch (error) {
        return NextResponse.json({ error: "Error fetching active guards" }, { status: 500 });
    }
}
