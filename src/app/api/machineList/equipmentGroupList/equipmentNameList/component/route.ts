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
    const equipmentNameId = url.searchParams.get("equipmentNameId");

    if (!equipmentNameId) {
      return NextResponse.json(
        { message: "Missing equipment name ID", success: false },
        { status: 400 }
      );
    }

    const components = await prisma.component.findMany({
      where: { equipmentNameId },
    });

    return NextResponse.json({ components });
  } catch (error) {
    console.error("Error fetching components:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
