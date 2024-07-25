import React from 'react';
import { FaPlus } from 'react-icons/fa';

function ExerciseSelector({
  category,
  inputVisible,
  selectedExercise,
  handlePlusClick,
  handleInputChange
}) {
  if (!category) return null;

  return (
    <div className="text-white">
      <ul className="flex flex-col gap-4">
        {category.exercises.length === 0 ? (
          <li>
            <span>حرکتی ثبت نشده است</span>
          </li>
        ) : (
          category.exercises.map((exercise) => (
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
                  onChange={(e) => handleInputChange(exercise.id, exercise.name, e.target.value)}
                />
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default ExerciseSelector;
