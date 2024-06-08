'use client'
import React, { useState } from 'react';
import Programlist from '@/components/userpanel/programlist';

function Programbuild() {
  const [selectedProgram, setSelectedProgram] = useState('سینه');

  const renderContent = () => {
    switch (selectedProgram) {
      case 'سینه':
        return (
          <div className="flex items-center gap-3">
          
          </div>
        );
      case 'کول':
        return <div className="text-white">Content for کول</div>;
      case 'جلو بازو':
        return <div className="text-white">Content for جلو بازو</div>;
      case 'زیربغل':
        return <div className="text-white">Content for زیربغل</div>;
      case 'ساعد':
        return <div className="text-white">Content for ساعد</div>;
      case 'پشت بازو':
        return <div className="text-white">
           <div className="flex items-center gap-3">
            <span className="bg-white text-black px-5 py-3">18 * 3</span>
            <ul className="text-white flex flex-col ">
              <li>+پشت بازو طناب پشت سر خم </li>
              <li>+ پشت بازو میله 7 پشت سر خم</li>
              <li>+ پشت بازو میله 7 پشت سر خم</li>
              <li>+ پشت بازو سیم کش پشت سر روی زانو دست روی روی میز</li>
              <li>+ پشت بازو جفت دمبل پشت سر نشسته</li>
              <li>+ پشت بازو سیم کش تک دست چکشی مورب</li>
              <li>پشت بازو هالتر دست برعکس خوابیده</li>
              <li>پشت بازو کیک بک دمبل خوابیده</li>
            </ul>
          </div>
        </div>;
      case 'سر شانه':
        return <div className="text-white">Content for سر شانه</div>;
      default:
        return <div className="text-white">Select a program</div>;
    }
  };

  return (
    <div className="bg-[#000000] h-screen">
      <div className="flex flex-col items-center pt-8">
        <span className="text-[#E60000] py-6 px-3 text-lg">جلسه اول</span>
        <div className="border-b-2 border-gray-200 w-96"></div>
        <span className="text-white text-sm pt-3">حرکات جلسه اول را انتخاب کنید</span>
      </div>
      <div className="mx-10">
        <Programlist onSelect={setSelectedProgram} />
      </div>
      <div className="mt-10 px-10 w-4/5">
        <div className="flex justify-end">
          {renderContent()}
        </div>
      </div>

      <div className='mt-10'>
      <div className="flex flex-col items-center pt-8">
        <span className="text-[#E60000] py-6 px-3 text-lg">جلسه دوم</span>
        <div className="border-b-2 border-gray-200 w-96"></div>
        <span className="text-white text-sm pt-3">حرکات جلسه اول را انتخاب کنید</span>
      </div>
      </div>
    </div>
  );
}

export default Programbuild;
