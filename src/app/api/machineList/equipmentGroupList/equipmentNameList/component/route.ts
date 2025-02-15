import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { componentSchema } from "@/schema";

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
      where: { equipmentNameId, isDelete: false },
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

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || (session.user.id !== process.env.ADMIN)) {
      throw new Error("Not Authenticated");
    }

    const body = await req.json();
    const parsedBody = componentSchema.parse(body);

    const component = await prisma.component.create({
      data: {
        name: parsedBody.name,
        equipmentNameId: parsedBody.equipmentNameId,
      },
    });

    return NextResponse.json({ component });
  } catch (error) {
    console.error("Error creating component:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
