import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

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

    const getDetails = await prisma.routeCompoentDetails.findMany({
      where: {
        routeComponentId: routeComponentId,
      },
      select: {
        header: true,
        value: true,
      },
    });

    return NextResponse.json(
      {
        message: "Details successfully fetched",
        data: getDetails,
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error fetching details: ", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}