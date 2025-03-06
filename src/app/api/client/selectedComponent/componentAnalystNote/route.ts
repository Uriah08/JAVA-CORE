import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { RouteComponentNoteSchema } from "@/schema";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("Not Authenticated");
    }

    const body = await req.json();
    console.log("Received body:", body);

    const validationResult = RouteComponentNoteSchema.safeParse(body);
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

    const { componentId, note, analyst } = validationResult.data;

    const newNote = await prisma.routeComponentNote.create({
      data: {
        clientId: session.user.id as string,
        componentId,
        note,
        analyst,
      },
    });

    return NextResponse.json(
      {
        message: "Note added successfully",
        data: newNote,
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating note:", error);
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

    const routeComponentNote = await prisma.routeComponentNote.findMany({
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
        note: true,
        analyst: true,
        createdAt: true,
      },
    });

    const jobs = await prisma.job.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        analyst: true,
      },
    });

    const analyst = jobs.map((job) => job.analyst);

    return NextResponse.json({
      message: "Fetched Success",
      routeComponentNote,
      analyst,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching route component note", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
