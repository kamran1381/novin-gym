import React from 'react';

function SessionHeader({ sessionCount }) {
  return (
    <div className="flex flex-col items-center pt-8">
      <span className="text-[#E60000] py-6 px-3 text-lg">جلسه {sessionCount}</span>
      <div className="border-b-2 border-gray-200 w-96"></div>
      <span className="text-white text-sm pt-3">حرکات جلسه {sessionCount} را انتخاب کنید</span>
    </div>
  );
}

export default SessionHeader;
