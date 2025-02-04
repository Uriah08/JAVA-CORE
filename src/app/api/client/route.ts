import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

// export async function POST(req: Request) {
//     const body = await req.json()
//     try {
//         const { client } = body
//         const session = await auth()
        
//         if (!session || (session.user.id !== process.env.ADMIN)) {
//             throw new Error('Not Authenticated')
//         }

//         await prisma.client.create({
//             data: {
//                 client,
//             },
//         })
        
//         return NextResponse.json({ message: 'Client created successfully', success: true}, { status: 201 });
//     } catch (error) {
//         console.error('Error in route handler:', error);
//         return NextResponse.json({ message: 'Internal Server Error', success: false}, { status: 500 });
//     }
// }

export async function GET() {
    try {
        const session = await auth()
        
        if (!session || (session.user.id !== process.env.ADMIN)) {
            throw new Error('Not Authenticated')
        }
        const clients = await prisma.user.findMany({
            where: {
                role: 'user',
            },
        })
        
        return NextResponse.json({ message: 'Client fetched successfully', clients, success: true});
    } catch (error) {
        console.error('Error in route handler:', error);
        return NextResponse.json({ message: 'Internal Server Error', success: false}, { status: 500 });
    }
}