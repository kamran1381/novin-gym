'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axiosapi from '@/app/lib/axios';
import Programlist from '@/components/userpanel/programlist';
import { useSession } from 'next-auth/react';
import SessionHeader from '@/components/sessionheader/sessionheader';
import ExerciseSelector from '@/components/exerciseselector/exerciseselector';
import Swal from 'sweetalert2';

function Programbuild() {
  const [sessionCategories, setSessionCategories] = useState({});
  const [categories, setCategories] = useState([]);
  const [inputVisible, setInputVisible] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [inputValues, setInputValues] = useState({});
  const [sessionCount, setSessionCount] = useState(1);
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
          // Handle the response if needed
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

  const handleInputChange = (sessionIndex, exerciseId, exerciseName, value) => {
    setInputValues(prevValues => {
      const updatedValues = { ...prevValues };
      if (!updatedValues[sessionIndex]) {
        updatedValues[sessionIndex] = [];
      }
      const existingIndex = updatedValues[sessionIndex].findIndex(item => item.exerciseId === exerciseId);
      if (existingIndex > -1) {
        updatedValues[sessionIndex][existingIndex] = { exerciseId, exerciseName, sets: value };
      } else {
        updatedValues[sessionIndex].push({ exerciseId, exerciseName, sets: value });
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
        sessions: inputValues
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
        Swal.fire({
          title: "<span style='font-size:1.1em'>  برنامه با موفقیت ساخته شد</span>",
          icon: 'success',
          confirmButtonColor: '#28a745',
          confirmButtonText: 'تایید'
        });
        router.push('/userpanel/program')
      } else {
        console.error('Failed to send data:', response);
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  const handleCategorySelect = (sessionIndex, category) => {
    setSessionCategories(prevState => ({
      ...prevState,
      [sessionIndex]: category
    }));
  };

  const renderSessions = () => {
    const sessions = [];
    for (let i = 1; i <= sessionCount; i++) {
      sessions.push(
        <div key={i}>
          <SessionHeader sessionCount={i} />
          <div className="mx-10">
            <Programlist onSelect={(category) => handleCategorySelect(i, category)} />
          </div>
          <div className="mt-10 px-10 flex flex-wrap gap-8">
            <div className='border-red-400 border-t-2 w-full py-3'></div>
            {categories.map((category) => (
              <div
                key={category.id}
                className={`flex flex-col gap-4 ${sessionCategories[i]?.id === category.id ? 'block' : 'hidden'}`}
              >
                <h2 className="text-xl font-bold text-white mb-2">{category.name}</h2>

                <ExerciseSelector
                  sessionIndex={i}
                  category={category}
                  inputVisible={inputVisible}
                  selectedExercise={selectedExercise}
                  handlePlusClick={handlePlusClick}
                  handleInputChange={(exerciseId, exerciseName, value) => handleInputChange(i, exerciseId, exerciseName, value)}
                />
              </div>
            ))}
          </div>
        </div>
      );
    }
    return sessions;
  };

  return (
    <div className="bg-[#000000] min-h-screen">
      {renderSessions()}
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
