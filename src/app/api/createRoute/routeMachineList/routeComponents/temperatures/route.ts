import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { routeComponentTemperatureSchema } from "@/schema";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || session.user.id !== process.env.ADMIN) {
      throw new Error("Not Authenticated");
    }

    const body = await req.json();
    console.log("Received body:", body);

    const validationResult = routeComponentTemperatureSchema.safeParse(body);
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

    const { routeComponentId, temperature } = validationResult.data;

    const newTemperature = await prisma.routeComponentTemperature.create({
      data: {
        routeComponentId,
        temperature,
      },
    });

    return NextResponse.json(
      {
        message: "Temperature added successfully",
        data: newTemperature,
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating Temperature:", error);
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

    const getTemperature = await prisma.routeComponentTemperature.findMany({
      where: {
        routeComponentId: routeComponentId,
      },
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        temperature: true,
      },
    });

    return NextResponse.json(
      {
        message: "Temperature added successfully",
        data: getTemperature,
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating Temperature:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
