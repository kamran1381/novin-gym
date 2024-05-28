import React from 'react';
import Navbar from '@/components/navbar/navbar';
import Image from 'next/image';

function Sectionone() {
    return (
        <>
            <div className='relative'>
                <Navbar />
            </div>
            <header className="relative h-screen">
                <Image
                    src="/assets/header image/gorilla-freak-wt5jg8_WrJg-unsplash.jpg"
                    layout="fill"
                    objectFit="cover"
                    alt="Background Image"
                    className="absolute z-0 w-full h-full bg-center"
                />
                <div className="absolute top-0 right-0  z-10">
                    <div className=" text-white pr-12 pt-14 ">
                        <span className="text-3xl font-bold text-[#E60000]">با نوین جیم<br /> در کمترین زمان<br /> برنامه ورزشی بنویس!</span>
                        <p className="mt-4 text-lg text-[#F7B0B0] ">میتونی به راحتی برنامه تمرینی  رو<br /> بنویسی و با شاگردهات در ارتباط باشی.</p>
                    </div>
                </div>
                <div class="flex h-screen justify-center items-center flex-col">
                    <div
                        class="w-full h-screen  bg-cover bg-center">
                        <div class="w-full h-full flex  justify-center items-center backdrop-brightness-50">
                        </div>
                    </div>
                </div>

            </header>
        </>
    );
}

export default Sectionone;
