'use client'
import React, { useState, useEffect } from 'react';
import axiosapi from '@/app/lib/axios';
import { useSession } from 'next-auth/react';

function NewExerciseForm() {
  const [options, setOptions] = useState([]);
  const [formData, setFormData] = useState({
    selectedOption: '',
    firstInput: '',
    secondInput: '',
    thirdInput: null, // Adjusted for file upload
  });
  const { data: session, status } = useSession();

  useEffect(() => {
    const getDataCategories = async () => {
      if (status === 'authenticated') {
        try {
          const token = session?.user?.token;
          if (!token) throw new Error('No token found');

          const response = await axiosapi.get('/categories', {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Accept": 'application/json',
            }
          });
          setOptions(response.data);
        } catch (error) {
          console.error('Error fetching options:', error);
        }
      }
    };

    getDataCategories();
  }, [session, status]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: files[0],
    }));
  };

  const handleSubmit = async () => {
    const selectedOption = options.find(option => option.name === formData.selectedOption);
    const categoryId = selectedOption ? selectedOption.id : '';

    const form = new FormData();
    form.append('name', formData.firstInput);
    form.append('category_id', categoryId);
    form.append('description', formData.secondInput);
    form.append('video', formData.thirdInput); // Adjusted for file upload

    try {
      const token = session?.user?.token;
      if (!token) throw new Error('No token found');

      const response = await axiosapi.post('/exercises', form, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": 'application/json',
        }
      });
      console.log('Data sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending data:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="flex flex-col items-center mt-5 w-full">
      <label className='text-white'>نام عضله:</label>
      <select
        name="selectedOption"
        value={formData.selectedOption}
        onChange={handleChange}
        className="mb-4 p-2 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg border border-gray-300 rounded bg-white"
      >
        <option value="">یک گزینه را انتخاب کنید</option>
        {options.map(option => (
          <option key={option.id} value={option.name}>{option.name}</option>
        ))}
      </select>

      <label className='text-white'>نام حرکت:</label>
      <input
        type="text"
        name="firstInput"
        placeholder="نام حرکت"
        value={formData.firstInput}
        onChange={handleChange}
        className="mb-4 p-2 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg border border-gray-300 rounded"
      />

      <label className='text-white'>توضیحات:</label>
      <input
        type="text"
        name="secondInput"
        placeholder="توضیحات"
        value={formData.secondInput}
        onChange={handleChange}
        className="mb-4 p-2 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg border border-gray-300 rounded"
      />

      <label className='text-white'>ارسال ویدیو:</label>
      <input
        type="file"
        name="thirdInput"
        accept="video/mp4"
        onChange={handleFileChange}
        className="mb-4 p-2 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg border border-gray-300 rounded"
      />

      <button
        onClick={handleSubmit}
        className="py-2 px-5 bg-red-800 text-white rounded-md"
      >
        ارسال
      </button>
    </div>
  );
}

export default NewExerciseForm;
