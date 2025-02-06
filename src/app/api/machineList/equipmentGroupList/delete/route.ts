import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("Not Authenticated");
    }

    const body = await req.json();
    const { ids } = body;

    const updatedGroups = await prisma.equipmentGroup.updateMany({
      where: {
        id: { in: ids },
      },
      data: {
        isDelete: true,
      },
    });

    return NextResponse.json({ updatedGroups });
  } catch (error) {
    console.error("Error soft deleting equipment groups:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
