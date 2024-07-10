'use client'
import React, { useState, useEffect } from 'react';
import axiosapi from '@/app/lib/axios';
import { useSession } from 'next-auth/react';

function Programlist({ onSelect }) {
  const [items, setItems] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
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
          setItems(response.data);
          console.log(items)
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    if (session) {
      fetchCategories();
    }
  }, [session]);

  const handleItemClick = (item) => {
    onSelect(item); // Pass the whole item object
    console.log(item)
  };

  return (
    <nav className="bg-transparent mt-10">
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
              <li key={item.id} className="flex-1 text-center text-white">
                <button
                  className="block py-2 px-3"
                  onClick={() => handleItemClick(item)}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Programlist;
