'use client'
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import axiosapi from '@/app/lib/axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
function Mussleform() {
  const [muscleName, setMuscleName] = useState('');
  const { data: session } = useSession();
  const router =  useRouter()
  const handleInputChange = (event) => {
    setMuscleName(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      let token = session?.user?.token;
      await axiosapi.post('/categories', { name: muscleName }, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      console.log('Muscle name sent');
      // Show SweetAlert2 popup
      Swal.fire({
        title: "<span style='font-size:1.2em'>با موفقیت ارسال شد</span>",
        icon: 'success',
        confirmButtonColor: '#28a745',
        confirmButtonText: 'تایید'
      });
      // Clear the input
      setMuscleName('');
      router.push('/userpanel/programbuild')

    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <div className="flex mt-10 h-screen">
      <div className="w-full max-w-4xl p-4">
        <label className="text-white block">نام عضله</label>
        <input
          type="text"
          value={muscleName}
          onChange={handleInputChange}
          className="w-full p-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Enter text here..."
        />
        <button
          onClick={handleSubmit}
          className="bg-red-800 text-white font-bold py-2 px-4 border border-blue-700 rounded mt-4 block w-full md:w-auto"
        >
          ارسال
        </button>
      </div>
    </div>
  );
}

export default Mussleform;
