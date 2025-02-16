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
    const routeListId = url.searchParams.get("routeListId");

    if (!routeListId) {
      return NextResponse.json(
        { message: "Missing route list ID", success: false },
        { status: 400 }
      );
    }

    const routeMachineList = await prisma.routeMachineList.findMany({
      where: {
        routeId: routeListId,
      },
    });

    return NextResponse.json({ routeMachineList });
  } catch (error) {
    console.error("Error fetching machine list", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
