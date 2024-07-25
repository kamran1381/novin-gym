'use client'
import { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-[#0C0C0C] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="w-2/12 hidden md:flex md:items-center">
            <Image
              src='/assets/header logo/e01ae3a232bc5661de93f4333c7a3b76.png'
              alt='Logo'
              width={150}
              height={150}
            />
          </div>

          {/* Centered navigation links */}
          <div className="hidden md:flex space-x-4">
            <Link href='/' className='hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium'>خانه</Link>
            <Link href='/userpanel/account' className='hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium'>پروفایل</Link>
            <Link href='/about' className='hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium'>درباره ما</Link>
            <Link href='/contact' className='hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium'>سوالی دارید</Link>
          </div>

          {/* Buttons and Burger Menu Icon */}
          <div className="flex items-center gap-2">
            {session ? (
              <button
                onClick={() => signOut()}
                className="bg-[#E60000] text-white font-bold py-2 px-7 rounded-3xl hidden md:block"
              >
                خروج
              </button>
            ) : (
              <>
                <Link href='/login' className="bg-[#E60000] text-white font-bold py-2 px-7 rounded-3xl hidden md:block">
                  ثبت نام
                </Link>
                <Link href='/login' className="bg-transparent text-white font-bold py-2 px-8 rounded-3xl hidden md:block border-2 border-[#E60000]">
                  ورود
                </Link>
              </>
            )}
            <button className="md:hidden text-white" onClick={toggleMenu}>
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0C0C0C] text-white px-4 pt-4 pb-2">
          <div className="flex flex-col space-y-2">
            <Link href="/" className='block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700'>خانه</Link>
            <Link href="/userpanel/account" className='block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700'>پروفایل</Link>
            <Link href="/about" className='block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700'>درباره ما</Link>
            <Link href="/contact" className='block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700'>سوالی دارید</Link>
            {session ? (
              <button
                onClick={() => signOut()}
                className="w-full bg-[#E60000] text-white font-bold py-2 px-4 rounded"
              >
                خروج
              </button>
            ) : (
              <>
                <Link href='/login' className="w-full bg-[#E60000] text-white font-bold py-2 px-4 rounded">
                  ثبت نام
                </Link>
                <Link href='/login' className="w-full bg-transparent border-2 border-[#E60000] text-white font-bold py-2 px-4 rounded">
                  ورود
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
