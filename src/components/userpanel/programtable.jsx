'use client'
import React, { useState, useEffect } from 'react';
import axiosapi from '@/app/lib/axios';
import { TiDelete } from "react-icons/ti";
import { useSession } from 'next-auth/react';
import Donwloadbutton from '../downloadPdf/donwloadbutton';
function Programtable() {
    const [programs, setPrograms] = useState([]);
    const { data: session } = useSession();

    const fetchData = async () => {
        try {
            const token = session?.user?.token;

            if (!token) {
                console.error("No token found");
                return;
            }
            const programsResponse = await axiosapi.get('/programs', {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": 'application/json',
                }
            });

            // if (programsResponse.status === 200) {
            //     const programsData = programsResponse.data;
            //     if (programsData.length === 0) {
            //         console.error("No programs found");
            //         return;
            //     }

            //     const programDetailsPromises = programsData.map(async (program) => {
            //         const programResponse = await axiosapi.get(`/programs/${program.id}`, {
            //             headers: {
            //                 "Authorization": `Bearer ${token}`,
            //                 "Accept": 'application/json',
            //             }
            //         });

            //         if (programResponse.status === 200) {
            //             return programResponse.data;
            //         } else {
            //             console.error(`Failed to fetch details for program ID: ${program.id}`);
            //             return null;
            //         }
            //     });

            //     const programDetails = await Promise.all(programDetailsPromises);

            //     const validProgramDetails = programDetails.filter(details => details !== null);
                
            //     setPrograms(validProgramDetails);
            //     console.log(programs)
            // }
            setPrograms(programsResponse.data)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="mx-auto overflow-x-auto shadow-md sm:rounded-lg">
            <button className='text-white bg-red-900' onClick={fetchData}>Fetch Data</button>
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
                    {programs.map((program) => (
                        <tr key={program.id} className="border-b">
                            <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">{program.id}</th>
                            <td className="px-6 py-4">{program.username}</td>
                            <td className="px-6 py-4 text-white">{program.created_at}</td>
                            <td className="flex items-center py-4 px-2">
                                <button className="bg-[#E60000] text-white font-bold rounded-full mx-2">
                                    <TiDelete size={27} />
                                </button>
                               <Donwloadbutton programId={program.id}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Programtable;
