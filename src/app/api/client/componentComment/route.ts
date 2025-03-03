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
    const routeComponentIds = url.searchParams.getAll("routeComponentId");

    if (!routeComponentIds.length) {
      return NextResponse.json(
        { message: "Missing routeComponentId(s)", success: false },
        { status: 400 }
      );
    }

    const routeComponentComments = await prisma.routeComponent.findMany({
      where: {
        id: { in: routeComponentIds },
        clientId: session.user.id,
      },
      select: {
        id: true,
        action: true,
        note: true,
        comments: {
          take: 10,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            severity: true,
            comment: true,
            createdAt: true,
          },
        },
      },
    });

    return NextResponse.json({ routeComponentComments, success: true });
  } catch (error) {
    console.error("Error fetching route component comments", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
