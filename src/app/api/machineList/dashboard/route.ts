import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("Not Authenticated");
    }

    const [areas, equipmentGroup, equipmentName, components] = await prisma.$transaction([
      prisma.area.count(),
      prisma.equipmentGroup.count(),
      prisma.equipmentName.count(),
      prisma.component.count(),
    ]);

    return NextResponse.json({ areas, equipmentGroup, equipmentName, components });
  } catch (error) {
    console.error("Error fetching counts:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
