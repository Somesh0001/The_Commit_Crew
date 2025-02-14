import { NextResponse,NextRequest } from "next/server";
import connectDB from "@/lib/mongo";
import User from "@/models/Roles";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await connectDB();

    const { guardId, society, setDuty } = await req.json();
    console.log("Guard id :" + guardId + " society = " + society + " setDuty : " + setDuty) ; 
    if (!guardId || !society || !setDuty) {
     return NextResponse.json({message:"Missing required fields "})
    }

    console.log("Guard id :" + guardId + " society = " + society + " setDuty : " + setDuty) ;  

    // Find and update the guard's setDuty field
    const updatedGuard = await User.findByIdAndUpdate(
      guardId,
      { setDuty },
      { new: true }
    );

    if (!updatedGuard) {
      return NextResponse.json({message:"Guard not found"})
    }

    return NextResponse.json({message:"Guard Updated "}, updatedGuard)
  } catch (error) {
    console.error("Error assigning guard:", error);
    return NextResponse.json({message:"Internal Server Error "})
  }
}
