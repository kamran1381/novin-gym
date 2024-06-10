import React from 'react'
import { TiDelete } from "react-icons/ti";
function Programtable() {
    //  modal baraye moshahdede barname va download
    return (
        <div className="mx-auto overflow-x-auto shadow-md sm:rounded-lg">
            <span className='text-[#F9F9F9] text-sm'>اعمال فیلتر</span>
            <table className="min-w-full text-sm border-2 border-[#E60000] text-left rtl:text-right text-white mt-3">
                <thead className="text-xs text-[#E60000] font-extralight ">
                    <tr>
                        <th scope="col" className="px-6 py-4">آیدی</th>
                        <th scope="col" className="px-6 py-4">نام</th>
                        <th scope="col" className="px-6 py-4">تاریخ</th>
                        <th scope="col" className="px-6 py-4"><span className="sr-only"></span></th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b">
                        <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap ">Apple MacBook Pro 17"</th>
                        <td className="px-6 py-4">Silver</td>
                        <td className="px-6 py-4">Laptop</td>
                        <td className=" flex items-center py-4 px-2">
                            <button class="bg-[#E60000] text-white font-bold  rounded-full mx-2 ">
                                <TiDelete size={27} />
                            </button>
                            <button class="bg-[#E60000] text-white font-bold py-2 px-4   rounded mx-2">
                            مشاهده برنامه 

                            </button>

                        </td>
                    </tr>
                    <tr className="border-b">
                        <th scope="row" className="px-6 py-4 font-medium text-white">Microsoft Surface Pro</th>
                        <td className="px-6 py-4">White</td>
                        <td className="px-6 py-4">Laptop PC</td>
                        <td className=" flex items-center py-4 px-2">
                        <button class="bg-[#E60000] text-white font-bold  rounded-full mx-2 ">
                                <TiDelete size={27} />
                            </button>
                            <button class="bg-[#E60000] text-white font-bold py-2 px-4   rounded mx-2">
                            مشاهده برنامه 

                            </button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" className="px-6 py-4 font-medium text-white">Magic Mouse 2</th>
                        <td className="px-6 py-4">Black</td>
                        <td className="px-6 py-4">Accessories</td>
                        <td className=" flex items-center py-4 px-2">
                        <button class="bg-[#E60000] text-white font-bold  rounded-full mx-2 ">
                                <TiDelete size={27} />
                            </button>
                            <button class="bg-[#E60000] text-white font-bold py-2 px-4   rounded mx-2">
                              مشاهده برنامه 
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Programtable