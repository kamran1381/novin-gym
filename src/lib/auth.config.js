export const authConfig = {
    pages: {
        signIn: "/login"
    },
    secret : process.env.NEXT_PUBLIC_AUTH_SECRET ,    

    trustHost: true,
    providers: [],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.role = token.role;
            return session;
        },
        authorized({ auth, request }) {
            const user = auth?.user;
            // const isOnAdminPanel = request.nextUrl?.pathname.startsWith('/admin');
            const isOnUserPanel = request.nextUrl?.pathname.startsWith('/userpanel');
            const isOnLoginPage = request.nextUrl?.pathname.startsWith('/login');


            // if (isOnAdminPanel) {
            //     if (!user) {
            //         return false;
            //     }
            //     if (user && user?.role !== 'admin') {
            //         return Response.redirect(new URL("/accessdenied", request.nextUrl));
            //     }
            // }


            if (isOnUserPanel && !user) {
                return false;
            }


            if (isOnLoginPage && user) {
                return Response.redirect(new URL("/", request.nextUrl))
            }


            return true;
        }
    }
}  
