'use client'
import React, { useState, useEffect } from 'react';
import axiosapi from '@/app/lib/axios';
import { TiDelete } from "react-icons/ti";
import { useSession } from 'next-auth/react';
import DownloadButton from '../downloadPdf/donwloadbutton';

function ProgramTable() {
    const [programs, setPrograms] = useState([]);
    const { data: session } = useSession();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = session?.user?.token;

                const programsResponse = await axiosapi.get('/programs', {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Accept": 'application/json',
                    }
                });

                setPrograms(programsResponse.data);
            } catch (error) {
                console.error(error);
            }
        };

        if (session) {
            fetchData();
        }
    }, [session]);

    return (
        <div className="mx-auto overflow-x-auto shadow-md sm:rounded-lg">
            <span className="text-[#F9F9F9] text-sm block">اعمال فیلتر</span>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm border-2 border-[#E60000] text-left rtl:text-right text-white mt-3">
                    <thead className="text-xs text-[#E60000] font-extralight">
                        <tr>
                            <th scope="col" className="px-6 py-4">آیدی</th>
                            <th scope="col" className="px-6 py-4">نام</th>
                            <th scope="col" className="px-6 py-4">تاریخ</th>
                            <th scope="col" className="px-6 py-4"><span className="sr-only">عملیات</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {programs.map((program) => (
                            <tr key={program.id} className="border-b">
                                <td className="px-6 py-4 font-medium text-white whitespace-nowrap">{program.id}</td>
                                <td className="px-6 py-4">{program.username}</td>
                                <td className="px-6 py-4 text-white">{program.created_at}</td>
                                <td className="flex items-center py-4 px-2">
                                    <button className="bg-[#E60000] text-white font-bold rounded-full mx-2">
                                        <TiDelete size={27} />
                                    </button>
                                    <DownloadButton programId={program.id} /> {/* Corrected component usage */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProgramTable;
