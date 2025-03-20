import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcryptjs from 'bcryptjs';

import { registerSchema } from '@/schema';
import { generateVerificationToken } from "@/lib/tokens";

export async function POST(req: Request){
    try {
        const body = await req.json();

        const validatedFields = registerSchema.safeParse(body);
    
        if (!validatedFields.success) {
          return NextResponse.json(
            { message: 'Validation failed', success: false, issues: validatedFields.error.issues },
            { status: 400 }
          );
        }
        const {username, email, password, confirmPassword} = validatedFields.data
        if(password !== confirmPassword) {
          return NextResponse.json(
            { message: 'Passwords do not match', success: false },
            { status: 400 }
          );
        }

        const emailValidator = await fetch(`https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_API}&email=${email}`)
        const validatedEmail = await emailValidator.json();

        if(validatedEmail.deliverability !== 'DELIVERABLE') {
          return NextResponse.json(
            { message: 'Email is not deliverable', success: false },
            { status: 400 }
          )
        }

        const [existingEmail, existingUsername] = await Promise.all([
          prisma.user.findUnique({
            where: { email: email.toLowerCase() }
          }),
          prisma.user.findUnique({
            where: { name: username.toLowerCase() }
          })
        ])

        if(existingEmail || existingUsername) {
          return NextResponse.json(
            {
              message: 'Email or Name already exist', success: false,
            },{status: 400})
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
    
        await prisma.user.create({
          data: {
            name: username.toLowerCase(),
            email: email.toLowerCase(),
            password: hashedPassword,
          },
        });

        await generateVerificationToken(email)
    
        return NextResponse.json({ message: 'User created successfully', success: true}, { status: 201 });
    } catch (error) {
      const err = error as { message?: string }
        console.error('Error in route handler:', error);
        return NextResponse.json({ message: err.message, success: false}, { status: 500 });
    }
}