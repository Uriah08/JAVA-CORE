import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { RouteComponentActionSchema } from "@/schema";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("Not Authenticated");
    }

    const body = await req.json();
    console.log("Received body:", body);

    const validationResult = RouteComponentActionSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: "Invalid data",
          errors: validationResult.error.errors,
          success: false,
        },
        { status: 400 }
      );
    }

    const { componentId, action, woNumber } = validationResult.data;

    const newAction = await prisma.routeComponentAction.create({
      data: {
        clientId: session.user.id as string,
        componentId,
        action,
        woNumber,
      },
    });

    return NextResponse.json(
      {
        message: "Action added successfully",
        data: newAction,
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating action:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("Not Authenticated");
    }

    const url = new URL(req.url);
    const componentId = url.searchParams.get("componentId");

    if (!componentId) {
      return NextResponse.json(
        { message: "Missing componentId", success: false },
        { status: 400 }
      );
    }

    const routeComponentAction = await prisma.routeComponentAction.findMany({
      where: {
        componentId: componentId as string,
        clientId: session.user.id,
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

    const jobs = await prisma.job.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        woNumber: true,
      },
    });

    const woNumbers = jobs.map((job) => job.woNumber);

    return NextResponse.json({
      message: "Fetched Success",
      routeComponentAction,
      woNumbers,
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
