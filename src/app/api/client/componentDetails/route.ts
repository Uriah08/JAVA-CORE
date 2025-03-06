import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { RouteComponentDetailsSchema } from "@/schema";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("Not Authenticated");
    }

    const body = await req.json();
    console.log("Received body:", body);

    const validationResult = RouteComponentDetailsSchema.safeParse(body);
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

    const { componentId, header, value } = validationResult.data;

    const newDetails = await prisma.routeComponentDetails.create({
      data: {
        clientId: session.user.id as string,
        componentId,
        header,
        value,
      },
    });

    console.log("Created data: ", newDetails);

    return NextResponse.json(
      {
        message: "Details added successfully",
        data: newDetails,
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating Details:", error);
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

    const routeComponentDetails = await prisma.routeComponentDetails.findMany({
      where: {
        componentId: componentId as string,
        clientId: session.user.id,
      },
      select: {
        id: true,
        header: true,
        value: true,
      },
    });

    return NextResponse.json({
      message: "Fetched Success",
      routeComponentDetails,
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
