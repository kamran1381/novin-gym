'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axiosapi from '@/app/lib/axios';
import Programlist from '@/components/userpanel/programlist';
import { useSession } from 'next-auth/react';
import SessionHeader from '@/components/sessionheader/sessionheader';
import ExerciseSelector from '@/components/exerciseselector/exerciseselector';
function Programbuild() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [inputVisible, setInputVisible] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [inputValues, setInputValues] = useState([]);
  const [sessionCount, setSessionCount] = useState(null);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
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

  const handleInputChange = (exerciseId, exerciseName, value) => {
    setInputValues(prevValues => {
      const updatedValues = [...prevValues];
      const existingIndex = updatedValues.findIndex(item => item.exerciseId === exerciseId);
      if (existingIndex > -1) {
        updatedValues[existingIndex] = { exerciseId, exerciseName, sets: value };
      } else {
        updatedValues.push({ exerciseId, exerciseName, sets: value });
      }
      return updatedValues;
    });
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

    try {
      let token = session?.user?.token;
      const response = await axiosapi.post('/programs', dataToSend, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      router.push('/userpanel/program');
      if (response.status === 200) {
        console.log('Data sent successfully');
      } else {
        console.error('Failed to send data:', response);
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div className="bg-[#000000] h-screen">
      <SessionHeader sessionCount={sessionCount} />
      <div className="mx-10">
        <Programlist onSelect={setSelectedCategory} />
      </div>
      <div className="mt-10 px-10 w-4/5">
        <ExerciseSelector
          categories={categories}
          selectedCategory={selectedCategory}
          inputVisible={inputVisible}
          selectedExercise={selectedExercise}
          handlePlusClick={handlePlusClick}
          handleInputChange={handleInputChange}
        />
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
