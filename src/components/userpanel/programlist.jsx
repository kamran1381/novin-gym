'use client'
import React, { useState } from 'react';

function Programlist({ onSelect }) {
  const [activeItem, setActiveItem] = useState('سینه');

  const handleItemClick = (item) => {
    setActiveItem(item);
    onSelect(item);
  };

  const items = [
    'سینه',
    'کول',
    'جلو بازو',
    'زیربغل',
    'ساعد',
    'پشت بازو',
    'سر شانه',
  ];

  return (
    <nav className="bg-transparant mt-10">
      <div className="">
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="w-full md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 justify-center w-full">
            {items.map((item) => (
              <li key={item} className="flex-1 text-center text-white">
                <a
                  href="#"
                  className={`block py-2 px-3 ${activeItem === item ? 'underline' : ''}`}
                  onClick={() => handleItemClick(item)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Programlist;
