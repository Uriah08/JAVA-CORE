import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

export async function POST(req: Request) {
    const body = await req.json()
    try {
        const session = await auth()
        if (!session || (session.user.id !== process.env.ADMIN)) {
            throw new Error('Not Authenticated')
        }
        
        const { status, analyst, reviewer, id } = body;

        const dateFinished = status === "Report Submitted" ? new Date() : undefined;

        await prisma.job.update({
            where: {
                id
            },
            data: {
                status,
                analyst,
                reviewer,
                dateFinished
            }
        })
        
        
        return NextResponse.json({ message: 'Job created successfully', success: true}, { status: 201 });
    } catch (error) {
        console.error('Error in route handler:', error);
        return NextResponse.json({ message: 'Internal Server Error', success: false}, { status: 500 });
    }
}