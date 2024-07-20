
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
// Your own logic for dealing with plaintext password strings; be careful!
import { postlogin } from "./api/postlogin"
export const { handlers, signIn, signOut, auth } = NextAuth({
    trustHost : true ,
    providers: [
        Credentials({
            authorize: async (credentials) => {
                let user = null

                const formData = {
                    username: await credentials.username,
                    password: await credentials.password
                }

                user =  await postlogin(formData).then((res)=>{
                     return res
                })
             
                if (!user) {

                    throw new Error("User not found.")
                }

                return user
            },
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
            return { ...token, ...user }
        },
        session({ session, token, user }) {
            session.user = token
            return session
        },


    },


})

