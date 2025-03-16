import { v4 as uuidv4 } from 'uuid'
import { getVerificationTokenByEmail } from './verification-token'
import { prisma } from './db'

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 30 * 1000)

    const existingToken = await getVerificationTokenByEmail(email)
    if(existingToken) {
        await prisma.verificationToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }

    const verificationToken = await prisma.verificationToken.create({
        data: {
            email,
            token,
            expires
        }
    })

    return verificationToken
} 