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


    const routeComponents = await prisma.routeComponent.findMany({
      where: {
        id: { in: routeComponentIds }, 
      },
      select: {
        id: true,
        action: true,
        note: true,
        image: true,
        reportFigures: true,
        comments: {
          select: {
            id: true,
            severity: true,
            comment: true,
            createdAt: true,
          },
          orderBy: { createdAt: "desc" }, 
        },
      },
    });

    const mergedComments = routeComponents.flatMap(rc => rc.comments);

    const top10Comments = mergedComments.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ).slice(0, 10);

    return NextResponse.json({ top10Comments, success: true });
  } catch (error) {
    console.error("Error fetching route component comments", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
