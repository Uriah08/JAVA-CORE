import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("Not Authenticated");
    }

    const areas = await prisma.area.findMany({});

    return NextResponse.json({ areas });
  } catch (error) {
    console.error("Error fetching areas:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
