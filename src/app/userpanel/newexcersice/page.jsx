import React from 'react'
import Sidebar from '@/components/userpanel/sidebar'
import NewExerciseForm from '@/components/userpanel/newexcersizeform'
function Newexcersice() {
  return (
    <div className='bg-[#000000] flex w-full min-h-screen'>
        <div className='sm:w-3/4 w-full flex flex-col lg:flex-row lg:space-x-3 lg:space-x-reverse px-1 space-y-3 lg:space-y-0'>
                <div className='lg:w-1/5'>
                    <Sidebar />
                </div>
                <div className='lg:w-4/5 flex  justify-center'>
                 <NewExerciseForm/>
                </div>
            </div>
    </div>
  )
}

export default Newexcersice