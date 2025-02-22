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
    const componentIds = url.searchParams.getAll("componentId") || [];
    const routeMachineId = url.searchParams.get("routeMachineId");

    if (!componentIds?.length || !routeMachineId) {
      return NextResponse.json(
        { message: "Missing component IDs or routeMachineId", success: false },
        { status: 400 }
      );
    }

    const routeComponents = await prisma.routeComponent.findMany({
      where: {
        componentId: { in: componentIds },
        routeMachineId: routeMachineId,
      },
      select: {
        id: true,
        routeMachineId: true,
        action: true,
        note: true,
        image: true,
        reportFigures: true,
        details: true,
        component: {
          select: {
            id: true,
            name: true,
          },
        },
        comments: {
          take: 10,
          orderBy: {
            createdAt: "desc",
          },
          select: {
            severity: true,
            comment: true,
            createdAt: true,
          },
        },
        recommendations: {
          take: 10,
          orderBy: {
            createdAt: "desc",
          },
          select: {
            priority: true,
            recommendation: true,
            createdAt: true,
          },
        },
        temperatures: {
          take: 5,
          orderBy: {
            createdAt: "desc",
          },
          select: {
            temperature: true,
          },
        },
        oilAnalyses: {
          take: 5,
          orderBy: {
            createdAt: "desc",
          },
          select: {
            analysis: true,
          },
        },
      },
    });

    return NextResponse.json({ routeList: routeComponents });
  } catch (error) {
    console.error("Error fetching route component", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
