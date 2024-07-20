'use client';
import React, { useState, useEffect } from 'react';
import axiosapi from '@/app/lib/axios';
import Programlist from '@/components/userpanel/programlist';
import { useSession } from 'next-auth/react';
import { FaPlus } from 'react-icons/fa';

function Programbuild() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [inputVisible, setInputVisible] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [inputValues, setInputValues] = useState([]);
  const [sessionCount, setSessionCount] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    // Fetch sessionCount from localStorage
    const fetchSessionCount = () => {
      const formDataJSON = localStorage.getItem('LocalStorageformData');
      if (formDataJSON) {
        const formData = JSON.parse(formDataJSON);
        setSessionCount(formData.sessionCount);
      }
    };

    fetchSessionCount();

    const fetchCategories = async () => {
      try {
        let token = session?.user?.token;
        const response = await axiosapi.get('/categories', {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": 'application/json',
          }
        });

        if (response.status === 200) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchPrograms = async () => {
      try {
        let token = session?.user?.token;
        const response = await axiosapi.get('/programs', {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": 'application/json',
          }
        });

        if (response.status === 200) {
          setPrograms(response.data);
        }
      } catch (error) {
        console.error('Error fetching programs:', error);
      }
    };

    if (session) {
      fetchCategories();
      fetchPrograms();
    }
  }, [session]);

  const handlePlusClick = (exerciseId) => {
    setInputVisible(inputVisible === exerciseId ? null : exerciseId);
    setSelectedExercise(inputVisible === exerciseId ? null : exerciseId);
  };

  const handleSubmit = async () => {
    const formDataJSON = localStorage.getItem('LocalStorageformData');
    const formDataToSend = JSON.parse(formDataJSON);

    const dataToSend = {
      username: formDataToSend.username,
      data: {
        ...formDataToSend,
        sets: inputValues
      }
    };

    console.log(dataToSend);

    // Add your axios post request here to send dataToSend to your server
    try {
      let token = session?.user?.token;
      const response = await axiosapi.post('/programs', dataToSend, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (response.status === 200) {
        console.log('Data sent successfully');
      } else {
        console.error('Failed to send data:', response);
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  const handleInputChange = (index, exerciseName, value) => {
    setInputValues(prevValues => {
      const updatedValues = [...prevValues];
      updatedValues[index] = { exerciseName, sets: value };
      return updatedValues;
    });
  };

  const renderContent = () => {
    if (!selectedCategory) return null;

    const category = categories.find(cat => cat.id === selectedCategory.id);

    if (!category) return null;

    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          <ul className="text-white flex flex-col">
            {category.exercises.map((exercise, index) => (
              <li key={exercise.id} className="flex flex-col gap-2 relative">
                <div className="flex items-center gap-2">
                  <span className='text-lg'>{exercise.name}</span>
                  <FaPlus
                    className={`cursor-pointer ml-1 ${selectedExercise === exercise.id ? 'text-[#E60000]' : 'text-white'}`}
                    onClick={() => handlePlusClick(exercise.id)}
                    size={17}
                  />
                </div>
                {inputVisible === exercise.id && (
                  <input
                    type="text"
                    className="bg-white text-black w-28 h-7 text-center rounded mt-2"
                    placeholder="تعداد ست"
                    onChange={(e) => handleInputChange(index, exercise.name, e.target.value)}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#000000] h-screen">
      <div className="flex flex-col items-center pt-8">
        <span className="text-[#E60000] py-6 px-3 text-lg">جلسه {sessionCount}</span>
        <div className="border-b-2 border-gray-200 w-96"></div>
        <span className="text-white text-sm pt-3">حرکات جلسه {sessionCount} را انتخاب کنید</span>
      </div>
      <div className="mx-10">
        <Programlist onSelect={setSelectedCategory} />
      </div>
      <div className="mt-10 px-10 w-4/5">
        <div className="flex justify-end">
          {renderContent()}
        </div>
      </div>
      <div className='flex justify-center mt-6'>
        <button
          className="bg-red-800 text-white font-bold py-2 px-6 rounded"
          onClick={handleSubmit}
        >
          ارسال
        </button>
      </div>
    </div>
  );
}

export default Programbuild;
