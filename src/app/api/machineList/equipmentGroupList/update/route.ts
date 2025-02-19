import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const session = await auth();
    if (!session || session.user.id !== process.env.ADMIN) {
      throw new Error("Not Authenticated");
    }

    const { id, name } = body;

    if (!id || !name) {
      return NextResponse.json(
        { message: "Missing required fields: id and name", success: false },
        { status: 400 }
      );
    }

    const updateEquipmentGroup = await prisma.equipmentGroup.update({
      where: { id },
      data: { name },
    });

    return NextResponse.json(
      {
        message: "Equipment group updated successfully",
        success: true,
        data: updateEquipmentGroup,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in route handler:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
