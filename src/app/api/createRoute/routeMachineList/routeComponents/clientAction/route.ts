import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session || session.user.id !== process.env.ADMIN) {
      throw new Error("Not Authenticated");
    }

    const url = new URL(req.url);
    const componentId = url.searchParams.get("componentId");
    const clientId = url.searchParams.get("clientId");

    if (!componentId || !clientId) {
      return NextResponse.json(
        { message: "Missing componentId or clientId", success: false },
        { status: 400 }
      );
    }

    const routeComponentAction = await prisma.routeComponentAction.findMany({
      where: {
        componentId: componentId,
        clientId: clientId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 2,
      select: {
        id: true,
        action: true,
        woNumber: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      message: "Fetched Success",
      routeComponentAction,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching route component action", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
