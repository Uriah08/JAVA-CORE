import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { message: "No active session", success: false },
        { status: 401 }
      );
    }
    const url = new URL(req.url);
    const clientId = url.searchParams.get("clientId");

    if (!clientId) {
      return NextResponse.json(
        { message: "Missing route list ID", success: false },
        { status: 400 }
      );
    }

    const routes = await prisma.routeList.findMany({
      where: {
        clientId: session.user.id,
        
      },
    });

    console.log(routes);

    return NextResponse.json(
      { message: "Route created successfully", routes, success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating route:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
