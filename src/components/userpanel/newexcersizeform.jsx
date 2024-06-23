import React from 'react';

function NewExerciseForm() {
  return (
    <div className="flex flex-col items-center mt-5 w-full">
      <input 
        type="text" 
        placeholder="First Input" 
        className="mb-4 p-2 max-w-md border border-gray-300 rounded"
      />
      <input 
        type="text" 
        placeholder="Second Input" 
        className="mb-4 p-2 w-52 border border-gray-300 rounded"
      />
      <button className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700">
        Send
      </button>
    </div>
  );
}

export default NewExerciseForm;
