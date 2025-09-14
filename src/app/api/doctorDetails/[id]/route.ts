import { NextResponse } from "next/server";
import DbConnect from "@/app/lib/dbConnect";
import DoctorModel from "@/app/models/Doctor";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ Await params

  await DbConnect();
  const doctor = await DoctorModel.findById(id);

  return new Response(JSON.stringify(doctor), { status: 200 });
}
