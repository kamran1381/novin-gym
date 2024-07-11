'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import jsPDF from 'jspdf';
import axiosapi from '@/app/lib/axios';
import { useReactToPrint } from 'react-to-print';
import ComponentToPrint from '../componenttoprint/componenttoprint';

function DownloadButton({ programId }) {
    const { data: session } = useSession();
    const [program, setProgram] = useState(null);
    const componentRef = React.useRef(null);

    useEffect(() => {
        const fetchProgram = async () => {
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

                if (response.status === 200) {
                    setProgram(response.data);
                } else {
                    console.error(`Failed to fetch details for program ID: ${programId}`);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchProgram();
    }, [session, programId]);

    const handleDownload = () => {
        if (program) {
            const doc = new jsPDF();
    
           
            doc.addFont('SansWeb-normal');
       
    
            // Render the text in Farsi
            doc.text('جزئیات برنامه', 10, 10);
            doc.text(`نام کاربری: ${program.name}`, 10, 20);
            doc.text(`وزن: ${program.weight}`, 10, 30);
    
            doc.save(`program_${programId}.pdf`);
            console.log('Downloaded');
        } else {
            console.error('No program details to download');
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
                <ComponentToPrint ref={componentRef} program={program} />
            </div>
        </div>
    );
}

export default DownloadButton;
