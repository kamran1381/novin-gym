'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { postlogin } from '@/api/postlogin';
function Loginform() {
    const [formData, setformData] = useState({
        username: '',
        password: ''
    });
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const handleLogin = async (e) => {
        e.preventDefault();
    
        // console.time('Login Process');
        try {
            // console.time('signIn');
            const result = await signIn('credentials', {
                ...formData,
                redirect: false,
                callbackUrl: '/'
            });
            // console.timeEnd('signIn');
    
            if (result?.error) {
                setErrorMessage('Invalid username or password.');
            } else {
                console.time('Router Push');
                router.push('/userpanel/account');
                console.timeEnd('Router Push');
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('An unexpected error occurred');
        }
        console.timeEnd('Login Process');
    };
    

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-sm p-4">
                <form className="border border-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-white" onSubmit={handleLogin}>
                    <div className="flex justify-center mb-4">
                        <Image
                            src="/assets/header logo/e01ae3a232bc5661de93f4333c7a3b76.png"
                            alt="Logo"
                            width={150}
                            height={50}
                            className="object-contain"
                        />
                    </div>
                    <div className="mt-6 mb-12">
                        <span className="text-xl">ورود کاربر</span>
                    </div>
                    <div className="mb-4 px-10">
                        <label className="block text-[#F9F9F9] text-xs mb-2" htmlFor="username">
                            نام کاربری
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-transparent"
                            id="username"
                            name="username"
                            type="text"
                            placeholder=""
                            onChange={(e) => setformData({ ...formData, [e.target.name]: e.target.value })}
                        />
                    </div>
                    <div className="pt-5 px-10">
                        <label className="block text-[#F9F9F9] text-xs mb-2" htmlFor="password">
                            لطفا رمز عبور را وارد کنید
                        </label>
                        <input
                            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline bg-transparent"
                            id="password"
                            name="password"
                            type="password"
                            placeholder=""
                            onChange={(e) => setformData({ ...formData, [e.target.name]: e.target.value })}
                        />
                    </div>
                    <div className="px-10 pt-5">
                        <button
                            className="bg-[#E60000] text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            ورود
                        </button>
                    </div>
                    <div className="text-center text-gray-500 text-xs pt-4">
                        <p>
                            ورود شما به معنای پذیرش <b className="text-[#5F6A9C]">قوانین</b> و <b className="text-[#5F6A9C]">شرایط نوین</b> جیم می باشد
                        </p>
                    </div>
                    {errorMessage && (
                        <div className="text-red-500 text-xs pt-4">
                            {errorMessage}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Loginform;
