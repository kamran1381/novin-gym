'use client'
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import axiosapi from '@/app/lib/axios';

function Mussleform() {
  const [muscleName, setMuscleName] = useState('');
  const { data: session } = useSession();

  const handleInputChange = (event) => {
    setMuscleName(event.target.value);
  };

  const handleSubmit = () => {
    try {
      let token = session?.user?.token;
      axiosapi
        .post('/categories', { name: muscleName }, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        })
        .then((response) => {
          console.log('Muscle name sent:', response.data);
        })
        .catch((error) => {
          console.error('There was an error!', error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
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
