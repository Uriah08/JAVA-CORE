import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { routeComponentRecommendationSchema } from "@/schema";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || session.user.id !== process.env.ADMIN) {
      throw new Error("Not Authenticated");
    }

    const body = await req.json();
    console.log("Received body:", body);

    const validationResult = routeComponentRecommendationSchema.safeParse(body);
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

    const { routeComponentId, priority, recommendation } =
      validationResult.data;

    const newRecommendation = await prisma.routeComponentRecommendation.create({
      data: {
        routeComponentId,
        priority,
        recommendation,
      },
    });

    return NextResponse.json(
      {
        message: "Recommendation added successfully",
        data: newRecommendation,
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating recommendation:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
