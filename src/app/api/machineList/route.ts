import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { areaSchema } from "@/schema";

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("Not Authenticated");
    }

    const areas = await prisma.area.findMany({
      where: {
        isDelete: false,
      },
    });

    return NextResponse.json({ areas });
  } catch (error) {
    console.error("Error fetching areas:", error);
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
    const parsedBody = areaSchema.parse(body);

    const area = await prisma.area.create({
      data: {
        name: parsedBody.name,
      },
    });

    return NextResponse.json({ area });
  } catch (error) {
    console.error("Error creating area:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
