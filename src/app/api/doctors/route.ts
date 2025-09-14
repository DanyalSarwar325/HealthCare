import DoctorModel from "../../models/Doctor";    
import { NextResponse } from "next/server";
import DbConnect from "@/app/lib/dbConnect";

export async function GET() {
  try {
    await DbConnect();
    const doctors = await DoctorModel.find({});
    return NextResponse.json({ success: true, data: doctors });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch doctors" }, { status: 500 });
  } 
}   
