import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { equipmentNameSchema } from "@/schema";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("Not Authenticated");
    }

    const url = new URL(req.url);
    const groupId = url.searchParams.get("groupId");

    if (!groupId) {
      return NextResponse.json(
        { message: "Missing group ID", success: false },
        { status: 400 }
      );
    }

    const equipmentNames = await prisma.equipmentName.findMany({
      where: { groupId, isDelete: false },
    });

    return NextResponse.json({ equipmentNames });
  } catch (error) {
    console.error("Error fetching equipment names:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("Not Authenticated");
    }

    const body = await req.json();
    const parsedBody = equipmentNameSchema.parse(body);

    const equipmentName = await prisma.equipmentName.create({
      data: {
        name: parsedBody.name,
        groupId: parsedBody.groupId,
      },
    });

    return NextResponse.json({ equipmentName });
  } catch (error) {
    console.error("Error creating equipment name:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
