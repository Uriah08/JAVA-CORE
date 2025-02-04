import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

import { jobSchema } from "@/schema";

export async function POST(req: Request) {
    const body = await req.json()
    try {
        const session = await auth()
        if (!session || (session.user.id !== process.env.ADMIN)) {
            throw new Error('Not Authenticated')
        }

        const validatedFields = jobSchema.safeParse(body)
        
        if (!validatedFields.success) {
            return NextResponse.json(
            { message: 'Validation failed', success: false, issues: validatedFields.error.issues },
            { status: 400 }
            );
        }

        const { 
            client, 
            area, 
            dateSurveyed, 
            jobNo, 
            poNo, 
            woNo, 
            reportNo, 
            jobDescription, 
            method, 
            inspector, 
            inspectionRoute, 
            equipmentUse, 
            dateRegistered, 
            yearWeekNo
        } = validatedFields.data

        await prisma.job.create({
            data: {
                userId: client,
                area,
                dateSurveyed,
                jobNumber: jobNo,
                poNumber: poNo,
                woNumber: woNo,
                reportNumber: reportNo,
                jobDescription,
                method,
                inspector,
                inspectionRoute,
                equipmentUse,
                dateRegistered,
                yearWeekNumber: yearWeekNo,
            },
        })

        return NextResponse.json({ message: 'Job created successfully', success: true}, { status: 201 });
    } catch (error) {
        console.error('Error in route handler:', error);
        return NextResponse.json({ message: 'Internal Server Error', success: false}, { status: 500 });
    }
}

export async function GET() {
    try {
        const session = await auth()
        
        if (!session || (session.user.id!== process.env.ADMIN)) {
            throw new Error('Not Authenticated')
        }
        
        const jobs = await prisma.job.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                    },
                }
            },
        })
        return NextResponse.json({ message: 'Job created successfully', success: true, jobs}, { status: 201 });
    } catch (error) {
        console.error('Error in route handler:', error);
        return NextResponse.json({ message: 'Internal Server Error', success: false}, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const body = await req.json()
    try {
        const session = await auth()
        
        if (!session || (session.user.id!== process.env.ADMIN)) {
            throw new Error('Not Authenticated')
        }

        const { id: ids } = body
        
        await prisma.job.deleteMany({
            where: {
                id: {
                    in: ids,
                }
            },
        })

        return NextResponse.json({ message: 'Job deleted successfully', success: true}, { status: 201 });
    } catch (error) {
        console.error('Error in route handler:', error);
        return NextResponse.json({ message: 'Internal Server Error', success: false}, { status: 500 });
    }
}