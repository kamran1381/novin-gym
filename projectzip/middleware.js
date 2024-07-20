// import { auth } from "@/auth";
// import { NextResponse } from "next/server";

// export async function middleware(request) {
//   const session = await auth();
//   if (!session && request.nextUrl.pathname.startsWith("/userpanel/account")) {
//     return NextResponse.redirect(new URL("/login", request.nextUrl));
//   }
//   if (
//     session &&
//     (request.nextUrl.pathname.startsWith("/login") ||
//       request.nextUrl.pathname.startsWith("/register") ||
//       request.nextUrl.pathname.startsWith("/forgetPassword"))
//   ) {
//     return NextResponse.redirect(new URL("/userpanel/account", request.nextUrl));
//   }
// }
