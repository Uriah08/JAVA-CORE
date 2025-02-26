import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { routeComponentOilAnalysisSchema } from "@/schema";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || session.user.id !== process.env.ADMIN) {
      throw new Error("Not Authenticated");
    }

    const body = await req.json();
    console.log("Received body:", body);

    const validationResult = routeComponentOilAnalysisSchema.safeParse(body);
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

    const { routeComponentId, analysis } = validationResult.data;

    const newOilAnalysis = await prisma.routeComponentOilAnalysis.create({
      data: {
        routeComponentId,
        analysis,
      },
    });

    return NextResponse.json(
      {
        message: "Oil Analysis added successfully",
        data: newOilAnalysis,
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating oil analysis:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session || session.user.id !== process.env.ADMIN) {
      throw new Error("Not Authenticated");
    }

    const { searchParams } = new URL(req.url);
    const routeComponentId = searchParams.get("routeComponentId");

    if (!routeComponentId) {
      return NextResponse.json(
        { message: "Missing routeComponentId", success: false },
        { status: 400 }
      );
    }

    const getOilAnalysis = await prisma.routeComponentOilAnalysis.findMany({
      where: {
        routeComponentId: routeComponentId,
      },
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        analysis: true,
      },
    });

    return NextResponse.json(
      {
        message: "Oil analysis successfully fetched",
        data: getOilAnalysis,
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating oil analysis:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
