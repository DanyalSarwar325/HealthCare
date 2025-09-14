// app/api/seed/route.ts
import { NextResponse } from "next/server";
import { seedDoctors } from "@/app/lib/seedDoctors";  // move your function here

export async function GET() {
  try {
    await seedDoctors();
    return NextResponse.json({ success: true, message: "Doctors seeded successfully!" });
  } catch (error) {
    console.error("Seeding failed:", error);
    return NextResponse.json({ success: false, error: "Failed to seed doctors" }, { status: 500 });
  }
}
