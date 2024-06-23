'use client';
import React, { useState, useEffect } from 'react';
import axiosapi from '@/app/lib/axios';
import { useSession } from 'next-auth/react';

function Programform() {
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    username: '',
    phoneNumber: '',
    age: '',
    height: '',
    weight: '',
    armCircumference: '',
    waistCircumference: '',
    thighCircumference: '',
    sessionCount: '',
  });

  const [errors, setErrors] = useState({});

  const session = useSession();

  useEffect(() => {
    const filledInputs = Object.values(formData).filter(value => value).length;
    setProgress((filledInputs / Object.keys(formData).length) * 100);
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateInputs = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (!formData[key]) {
        newErrors[key] = 'This field is required';
      } else if (key === 'phoneNumber' && !/^\d+$/.test(formData[key])) {
        newErrors[key] = 'Phone number must be numeric';
      } else if ((key === 'age' || key === 'height' || key === 'weight' || key === 'armCircumference' || key === 'waistCircumference' || key === 'thighCircumference' || key === 'sessionCount') && isNaN(formData[key])) {
        newErrors[key] = 'This field must be a number';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;

    const athleteDetails = {
      username: formData.username,
      phone: formData.phoneNumber,
      age: formData.age,
      height: formData.height,
      weight: formData.weight,
      armCircumference: formData.armCircumference,
      waistCircumference: formData.waistCircumference,
      thighCircumference: formData.thighCircumference,
      sessionCount: formData.sessionCount,

    };

    const dataToSend = {
      athleteDetails,
    };

    try {
      let token = session?.data?.user?.token;
      const response = await axiosapi.post('/programs', dataToSend, {
        headers: {
          "Authorization": `Bearer ${token}` ,
          'Accept' : 'application/json'
        }
      });
      console.log('data sent:', response.data);
    } catch (error) {
      console.error('Error:', error.response);
    }
  };

  return (
    <div className="flex flex-col items-center pt-20">
      <div className="p-4 rounded-md shadow-md w-full max-w-5xl">
        <div className='flex flex-col items-center'>
          <span className='text-[#E60000] text-lg pb-3'>ساخت برنامه جدید</span>
          <div className="w-[30%] bg-transparent bg-gray-600 border rounded-full h-4 mb-4">
            <div className="bg-red-700 h-4 rounded-xl" style={{ width: `${progress}%` }}></div>
          </div>
          <span className='text-white'>{Math.round(progress)}%</span>
        </div>

        <p className="mb-9 text-lg font-medium text-white mt-7">مشخصات را کامل نمایید</p>
        <div className="flex flex-col md:flex-row md:justify-between gap-10 text-white">
          <div className="w-full md:w-2/5 flex flex-col">
            <label className='pb-2 lg:text-sm'>اسم ورزشکار</label>
            <input 
              name="username"
              type="text"
              value={formData.athleteName}
              onChange={handleInputChange}
              className="mb-10 bg-transparent border border-[#E60000] py-1"
            />
            {errors.athleteName && <span className="text-red-500">{errors.athleteName}</span>}
            <label className='pb-2'>شماره تلفن </label>
            <input 
              name="phoneNumber"
              type="text"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="mb-10 bg-transparent border border-[#E60000] py-1"
            />
            {errors.phoneNumber && <span className="text-red-500">{errors.phoneNumber}</span>}
          </div>
          <div className="w-full md:w-1/5 lg:px-8 flex flex-col">
            <label className='pb-2'>سن ورزشکار</label>
            <input 
              name="age"
              type="text"
              value={formData.age}
              onChange={handleInputChange}
              className="mb-10 bg-transparent border border-[#E60000] py-1"
            />
            {errors.age && <span className="text-red-500">{errors.age}</span>}
            <label className='pb-2'>قد ورزشکار (cm)</label>
            <input 
              name="height"
              type="text"
              value={formData.height}
              onChange={handleInputChange}
              className="mb-10 bg-transparent border border-[#E60000] py-1"
            />
            {errors.height && <span className="text-red-500">{errors.height}</span>}
            <label className='pb-2'>ورزن ورزشکار (cm)</label>
            <input 
              name="weight"
              type="text"
              value={formData.weight}
              onChange={handleInputChange}
              className="mb-10 bg-transparent border border-[#E60000] py-1"
            />
            {errors.weight && <span className="text-red-500">{errors.weight}</span>}
          </div>
          <div className="w-full md:w-1/5 lg:px-8 flex flex-col">
            <label className='pb-2'>دور بازو</label>
            <input 
              name="armCircumference"
              type="text"
              value={formData.armCircumference}
              onChange={handleInputChange}
              className="mb-10 bg-transparent border border-[#E60000] py-1"
            />
            {errors.armCircumference && <span className="text-red-500">{errors.armCircumference}</span>}
            <label className='pb-2'>دور شکم</label>
            <input 
              name="waistCircumference"
              type="text"
              value={formData.waistCircumference}
              onChange={handleInputChange}
              className="mb-10 bg-transparent border border-[#E60000] py-1"
            />
            {errors.waistCircumference && <span className="text-red-500">{errors.waistCircumference}</span>}
            <label className='pb-2'>دور ران</label>
            <input 
              name="thighCircumference"
              type="text"
              value={formData.thighCircumference}
              onChange={handleInputChange}
              className="mb-10 bg-transparent border border-[#E60000] py-1"
            />
            {errors.thighCircumference && <span className="text-red-500">{errors.thighCircumference}</span>}
          </div>
          <div className="w-full md:w-1/5 flex flex-col">
            <label className='pb-2'>تعداد جلسات</label>
            <input 
              name="sessionCount"
              type="text"
              value={formData.sessionCount}
              onChange={handleInputChange}
              className="mb-10 bg-transparent border border-[#E60000] py-1"
            />
            {errors.sessionCount && <span className="text-red-500">{errors.sessionCount}</span>}
          </div>
        </div>
        <button 
          onClick={handleSubmit}
          className="bg-[#E60000] text-white font-bold py-2 px-4 rounded-full flex items-center gap-2"
        >
          ادامه <a className='text-xl font-light'>&#8250;</a>
        </button>
      </div>
    </div>
  );
}

export default Programform;
