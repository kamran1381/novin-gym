'use client'
import React from 'react';
import { useSession } from 'next-auth/react';
import jsPDF from 'jspdf';
import axiosapi from '@/app/lib/axios';
import { useReactToPrint } from 'react-to-print';
import ComponentToPrint from '../componenttoprint/componenttoprint';

function DownloadButton({ programId }) {
    const { data: session } = useSession();
    const componentRef = React.useRef(null);

    const handleDownload = async () => {
        try {
            const token = session?.user?.token;

            if (!token) {
                console.error("No token found");
                return;
            }

            const response = await axiosapi.get(`/programs/${programId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": 'application/json',
                }
            });

            console.log(response)

            if (response.status === 200) {
                const programDetails = response.data;

                const doc = new jsPDF();
                doc.text(JSON.stringify(programDetails, null, 2), 10, 10);
                doc.save(`program_${programId}.pdf`);
                console.log('Downloaded');

            } else {
                console.error(`Failed to fetch details for program ID: ${programId}`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div>
            <button className="bg-[#E60000] text-white font-bold py-2 px-4 rounded mx-2" onClick={handleDownload}>
                دانلود برنامه
            </button>
            <button className="bg-[#00BFFF] text-white font-bold py-2 px-4 rounded mx-2" onClick={handlePrint}>
                چاپ برنامه
            </button>
            <div style={{ display: 'none' }}>
                <ComponentToPrint ref={componentRef} programId={programId} />
            </div>
        </div>
    );
}

export default DownloadButton;
