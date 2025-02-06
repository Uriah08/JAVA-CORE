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

    const updatedComponents = await prisma.component.updateMany({
      where: {
        id: { in: ids },
      },
      data: {
        isDelete: true,
      },
    });

    return NextResponse.json({ updatedComponents });
  } catch (error) {
    console.error("Error soft deleting components:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
