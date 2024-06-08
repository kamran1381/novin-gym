'use client';
import React, { useState, useRef, useEffect } from 'react';
import Next from '../icons/next';

function Programform() {
  const [progress, setProgress] = useState(0);
  const inputRefs = useRef([]);
  const selectRefs = useRef([]);

  useEffect(() => {
    const handleInputChange = () => {
      const filledInputs = [...inputRefs.current, ...selectRefs.current].filter(input => input.value).length;
      setProgress((filledInputs / 10) * 100);
    };

    inputRefs.current.forEach(ref => ref?.addEventListener('input', handleInputChange));
    selectRefs.current.forEach(ref => ref?.addEventListener('change', handleInputChange));

    return () => {
      inputRefs.current.forEach(ref => ref?.removeEventListener('input', handleInputChange));
      selectRefs.current.forEach(ref => ref?.removeEventListener('change', handleInputChange));
    };
  }, []);

  return (
    <div className="flex flex-col items-center pt-20 ">
      <div className="p-4 rounded-md shadow-md w-full max-w-5xl">
        <div className='flex flex-col items-center '>
          <span className='text-[#E60000]  text-lg pb-3'>ساخت برنامه جدید</span>
          <div className="w-[30%] bg-transparent bg-gray-600 border rounded-full h-4 mb-4">
            <div className="bg-red-700 h-4 rounded-xl" style={{ width: `${progress}%` }}></div>
          </div>
          <span className='text-white'>{progress}%</span>
        </div>

        <p className="mb-9 text-lg font-medium text-white mt-7 ">مشخصات را کامل نمایید</p>
        <div className="flex flex-col md:flex-row md:justify-between gap-10 text-white">
          <div className="w-full md:w-2/5 flex flex-col">
            <label className='pb-2 lg:text-sm'>اسم ورزشکار</label>
            <input ref={el => inputRefs.current[0] = el} type="text" className="mb-10 bg-transparent border border-[#E60000] py-1" />
            <label className='pb-2'>شماره تلفن </label>
            <input ref={el => inputRefs.current[1] = el} type="text" className="mb-10 bg-transparent border border-[#E60000] py-1" />
            <label className='pb-2'>نوع برنامه را بنویسید</label>
            <select ref={el => selectRefs.current[0] = el} className="mb-10 bg-transparent border border-[#E60000] py-1">
              <option value="">انتخاب کنید</option>
              <option value="football">فوتبال</option>
              <option value="basketball">بسکتبال</option>
              <option value="swimming">شنا</option>
              <option value="running">دویدن</option>
            </select>
          </div>
          <div className="w-full md:w-1/5 lg:px-8 flex flex-col">
            <label className='pb-2'>سن ورزشکار</label>
            <input ref={el => inputRefs.current[2] = el} type="text" className="mb-10 bg-transparent border border-[#E60000] py-1" />
            <label className='pb-2'>قد ورزشکار (cm)</label>
            <input ref={el => inputRefs.current[3] = el} type="text" className="mb-10 bg-transparent border border-[#E60000] py-1" />
            <label className='pb-2'>ورزن ورزشکار (cm)</label>
            <input ref={el => inputRefs.current[4] = el} type="text" className="mb-10 bg-transparent border border-[#E60000] py-1" />
          </div>
          <div className="w-full md:w-1/5 lg:px-8 flex flex-col">
            <label className='pb-2'>دور بازو</label>
            <input ref={el => inputRefs.current[5] = el} type="text" className="mb-10 bg-transparent border border-[#E60000] py-1" />
            <label className='pb-2'>دور شکم</label>
            <input ref={el => inputRefs.current[6] = el} type="text" className="mb-10 bg-transparent border border-[#E60000] py-1" />
            <label className='pb-2'>دور ران</label>
            <input ref={el => inputRefs.current[7] = el} type="text" className="mb-10 bg-transparent border border-[#E60000] py-1" />
          </div>
          <div className="w-full md:w-1/5 flex flex-col">
            <label className='pb-2'>انتخاب ورزش</label>
            <select ref={el => selectRefs.current[1] = el} className="mb-10 bg-transparent border border-[#E60000] py-1">
              <option value="">انتخاب کنید</option>
              <option value="football">فوتبال</option>
              <option value="basketball">بسکتبال</option>
              <option value="swimming">شنا</option>
              <option value="running">دویدن</option>
            </select>
          </div>
        </div>
        <button className="bg-[#E60000] text-white font-bold py-2 px-4 rounded-full flex items-center gap-2">
          ادامه <a className='text-xl font-light'>&#8250;</a>
        </button>
      </div>
    </div>
  );
}

export default Programform;
