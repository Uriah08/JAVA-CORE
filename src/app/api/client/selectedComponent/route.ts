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
    const componentIds = url.searchParams.getAll("componentIds");

    if (!componentIds.length) {
      return NextResponse.json(
        { message: "Missing componentId(s)", success: false },
        { status: 400 }
      );
    }

    const selectedComponentData = await prisma.component.findMany({
      where: {
        id: { in: componentIds },
      },
      select: {
        id: true,
        name: true,
        routeComponent: {
            select: {
                id: true,
            }
        }
      },
    });

    console.log("data: ", selectedComponentData);

    return NextResponse.json({
      message: "Fetched Success",
      selectedComponentData,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching component", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
