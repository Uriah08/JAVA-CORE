import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

export async function POST(req: Request) {
  const ids = await req.json();
  try {
    const session = await auth();
    if (!session || (session.user.id !== process.env.ADMIN)) {
      throw new Error("Not Authenticated");
    }

    const updatedNames = await prisma.equipmentName.updateMany({
      where: {
        id: { in: ids },
      },
      data: {
        isDelete: true,
      },
    });

    return NextResponse.json({ updatedNames });
  } catch (error) {
    console.error("Error soft deleting equipment names:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
