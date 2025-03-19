import NextAuth from "next-auth"
import authConfig from "./auth.config"
 
import { prisma } from "./lib/db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { findUserById } from "./schema"

export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if(session.user && token.sub){
        session.user.id = token.sub
      }

      if(session.user && token.role){
          session.user.role = token.role as "admin" | "user"
      }

      return session
    },
    async jwt({token}){
      if(!token.sub) return token
            
            const user = await findUserById(token.sub)

            if(!user) return token

            token.role = user.role
                   
      return token
    }
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})