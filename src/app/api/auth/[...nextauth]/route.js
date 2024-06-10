import NextAuth from "next-auth/next";
import { auth ,  signIn , signOut } from "@/lib/auth";

const handler = NextAuth(auth , signIn , signOut)

export { handler as GET, handler as POST };


