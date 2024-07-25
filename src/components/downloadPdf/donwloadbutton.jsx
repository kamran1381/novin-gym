'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axiosapi from '@/app/lib/axios';
import { BASE64_FONTsanNum } from '../base64/sanNum64';
import { BASE64_FONTsanWeb } from '../base64/sansWeb64';

function DownloadButton({ programId }) {
    const { data: session } = useSession();
    const [program, setProgram] = useState(null);

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

            // Add the first font
            doc.addFileToVFS('SansNum.ttf', BASE64_FONTsanNum);
            doc.addFont('SansNum.ttf', 'sansNum', 'normal');

            // Add the second font
            doc.addFileToVFS('SansWeb.ttf', BASE64_FONTsanWeb);
            doc.addFont('SansWeb.ttf', 'sansWeb', 'normal');

            // Set the first font and add the title in Farsi
            doc.setFont('sansNum');
            doc.text(`اسم ورزشکار: ${program.username}`, 195, 20, { align: 'right' });

            // Set the second font for the table
            doc.setFont('sansWeb');

            // Add first table using jsPDF-AutoTable
            doc.autoTable({
                head: [['دور ران ', 'دور شکم ', 'دور بازو', 'وزن ورزشکار (kg)', 'قد ورزشکار (cm)', 'سن ورزشکار', 'شماره تلفن', 'نام ']],
                body: [
                    [program.thighCircumference, program.waistCircumference, program.armCircumference, program.weight, program.height, program.age, program.phoneNumber, program.username]
                ],
                styles: {
                    font: 'sansWeb',
                    font: 'sansNum',
                    fillColor: [211, 211, 211], // Light gray
                    textColor: [0, 0, 0], // Black
                    halign: 'right'
                },
                headStyles: {
                    fillColor: [255, 0, 0], // Red
                    textColor: [255, 255, 255] // White
                },
                rtl: true,
                startY: 30
            });

            // Prepare data for the second table based on sessions
            const sessionKeys = Object.keys(program.sessions).reverse();
            const maxExercises = Math.max(...sessionKeys.map(key => program.sessions[key].length));
            
            // Create table header dynamically
            const sessionHeader = sessionKeys.map(key => `جلسه ${key}`);

            // Create table body dynamically
            const sessionData = [];
            for (let i = 0; i < maxExercises; i++) {
                const row = sessionKeys.map(key => {
                    const exercise = program.sessions[key][i];
                    return exercise ? `${exercise.sets} : ${exercise.exerciseName}` : '';
                });
                sessionData.push(row);
            }

            // Add second table using jsPDF-AutoTable
            doc.autoTable({
                head: [sessionHeader],
                body: sessionData,
                styles: {
                    font: 'sansWeb',
                    font: 'sansNum',
                    fillColor: [211, 211, 211], // Light gray
                    textColor: [0, 0, 0], // Black
                    halign: 'right'
                },
                headStyles: {
                    fillColor: [255, 0, 0], // Red
                    textColor: [255, 255, 255], // White
                    halign: 'right'
                },
                columnStyles: {
                    0: {halign: 'right'},
                    1: {halign: 'right'},
                    2: {halign: 'right'},
                    // Add more if you have more columns dynamically
                },
                rtl: true,
                startY: doc.previousAutoTable.finalY + 10
            });

            console.log(program);
            doc.save(`program_${programId}.pdf`);
            console.log('Downloaded');
        } else {
            console.error('No program details to download');
        }
    };

    return (
        <div>
            <button className="bg-[#E60000] text-white font-bold py-2 px-4 rounded mx-2" onClick={handleDownload}>
                دانلود برنامه
            </button>
        </div>
    );
}

export default DownloadButton;
