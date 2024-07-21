import React from 'react';
import { FaPlus } from 'react-icons/fa';

function ExerciseSelector({
  categories,
  selectedCategory,
  inputVisible,
  selectedExercise,
  handlePlusClick,
  handleInputChange
}) {
  if (!selectedCategory) return null;

  const category = categories.find(cat => cat.id === selectedCategory.id);

  if (!category) return null;

  return (
    <div className="flex items-center gap-3">
      <ul className="text-white flex flex-col">
        {category.exercises.map((exercise) => (
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
        ))}
      </ul>
    </div>
  );
}

export default ExerciseSelector;
