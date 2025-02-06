import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("Not Authenticated");
    }

    const url = new URL(req.url);
    const areaId = url.searchParams.get("areaId");

    if (!areaId) {
      return NextResponse.json(
        { message: "Missing area ID", success: false },
        { status: 400 }
      );
    }

    const equipmentGroups = await prisma.equipmentGroup.findMany({
      where: { areaId },
    });

    return NextResponse.json({ equipmentGroups });
  } catch (error) {
    console.error("Error fetching equipment groups:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
