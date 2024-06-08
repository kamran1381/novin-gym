import React from 'react'
import localFont from 'next/font/local'
import { Suspense } from 'react';
import "./globals.css";
import Navbar from './layouts/navbar';
// import { Toaster } from 'sonner'
// import { SessionProvider } from 'next-auth/react';


const SansWeb = localFont({ src: [{ path: "./assets/fonts/SansWeb.ttf" }, { path: "./assets/fonts/SansNum.ttf" }] });
export const metadata = {
  title: {
    default: "نوین جیم ",
    template: "%s | novin gym | نوین چیم " 
  },
  description: "نوین جیم",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={SansWeb.className}>
        <Suspense>
          <Navbar/>
              {children}
        </Suspense>
        {/* <Toaster duration={5000} position='top-center' className={`${SansWeb.className} text-center flex justify-center items-center text-sm font-bold `} /> */}
      </body>
    </html>
  );
}

