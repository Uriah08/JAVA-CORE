import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { equipmentGroupSchema } from "@/schema";

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
      where: {
        areaId,
        isDelete: false,
      },
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

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || (session.user.id !== process.env.ADMIN)) {
      throw new Error("Not Authenticated");
    }

    const body = await req.json();
    const parsedBody = equipmentGroupSchema.parse(body);

    const equipmentGroup = await prisma.equipmentGroup.create({
      data: {
        name: parsedBody.name,
        areaId: parsedBody.areaId,
      },
    });

    return NextResponse.json({ equipmentGroup });
  } catch (error) {
    console.error("Error creating equipment group:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
