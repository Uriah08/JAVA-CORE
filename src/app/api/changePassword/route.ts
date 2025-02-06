import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import bycrypt from 'bcryptjs'

import { changePasswordSchema } from "@/schema";

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const session = await auth()
        
        if (!session || (session.user.id!== process.env.ADMIN)) {
            throw new Error('Not Authenticated')
        }

        const validatedFields = changePasswordSchema.safeParse(body)
        if (!validatedFields.success) {
            return NextResponse.json(
            { message: 'Validation failed', success: false, issues: validatedFields.error.issues },
            { status: 400 }
            );
        }

        const { currentPassword, newPassword, confirmPassword } = validatedFields.data

        if(newPassword !== confirmPassword){
            throw new Error('Passwords do not match')
        }

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
        })

        if(!user?.password) {
            throw new Error('Error finding your ID')
        }

        const isMatch = await bycrypt.compare(currentPassword, user.password)
        
        if(!isMatch) {
            throw new Error('Current password is incorrect')
        }
        
        const hashedPassword = await bycrypt.hash(newPassword, 10)

        await prisma.user.update({
            where: { id: session.user.id },
            data: { password: hashedPassword },
        })

        return NextResponse.json({ message: 'Password changed successfully', success: true });
    } catch (error) {
        const err = error as { message?: string }
        console.error('Error in route handler:', error);
        return NextResponse.json({ message: err.message, success: false}, { status: 500 });
    }
}