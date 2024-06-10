import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { authConfig } from './auth.config';


export const {  auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [

        Credentials({
            async authorize(credentials) {
                const user = JSON.parse(credentials.user);
                if (user) {
                    return user;
                } else {
                    return null;
                }
            }
        })
    ],
    ...authConfig.callbacks,
});
