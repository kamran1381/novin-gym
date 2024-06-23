'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import Pencil from '../icons/pencil';
import { signOut } from 'next-auth/react';

const Sidebar = () => {
    const path = usePathname();
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut({ redirect: false });
        router.push('/');
    };

    return (
        <div className='w-full flex flex-col items-center mx-10 mt-14'>
            <div className='w-full'>
                <div className='flex items-center gap-4 border-b border-gray-200 pb-4 w-full justify-center'>
                    <div className='w-20 h-20 relative'>
                        <Image
                            src='/assets/header logo/e01ae3a232bc5661de93f4333c7a3b76.png'
                            alt='Logo'
                            layout='fill'
                            className='rounded-full object-cover'
                        />
                    </div>
                    <div className='flex-2'>
                        <span className='text-white text-lg'> محمد رضا صادقی</span>
                        <Pencil />
                    </div>
                </div>
            </div>
            {/* Sidebar links */}
            <div className='w-full flex flex-col items-center space-y-10 mt-8 text-base'>
                <Link href='newprogram' className={`${path === '/userpanel/newprogram' ? 'text-red-500' : 'text-white'}`}>
                    ساخت برنامه جدید
                </Link>
                <Link href='program' className={`${path === '/userpanel/program' ? 'text-red-500' : 'text-white'}`}>
                    برنامه ها
                </Link>
                <Link href='newexcersice' className={`${path === 'userpanel/newexcersice' ? 'text-red-500' : 'text-white'}`}>
                    اضافه کردن حرکت جدید
                </Link>
                {/* <Link href='/userpanel/' className={`${path === '' ? 'text-red-500' : 'text-white'}`}>
                    اضافه کردن عضله جدید
                </Link> */}
                <button onClick={handleSignOut} className='text-white'>
                    خروج از حساب
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
