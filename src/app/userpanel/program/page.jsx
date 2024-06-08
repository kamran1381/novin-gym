import React from 'react'
import Link from 'next/link'
import Programtable from '@/components/userpanel/programtable'
function Program() {
    return (
        <div className='bg-[#000000] h-screen '>
            <div className='flex flex-col items-center'>
                <div className='flex mt-10 gap-8'>
                    <form method="GET" action="">
                        <div className="bg-gray-800 shadow p-2 relative rounded-full flex">
                            <span className="flex justify-end items-center text-white p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </span>
                            <input name="episodequery" id="title" className="border-white bg-transparent outline-none border-0 w-full rounded-xl p-2" type="text" placeholder="جستجو" />
                        </div>
                    </form>
                    <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">ساخت برنامه جدید</button>
                </div>
            </div>
            <div className='mx-4 lg:mx-40 mt-10'>
                <span className='text-white pb-3 flex justify-center'>لیست برنامه های موجود(7)</span>
                <Programtable />
            </div>
        </div>
    )
}

export default Program