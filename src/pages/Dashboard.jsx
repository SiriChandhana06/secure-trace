import React from 'react'

export default function Dashboard() {
  return (
    <div className='w-full mt-10 flex flex-wrap'>
      <div className='w-full md:w-1/2 p-4 '>
      <h1 className='text-2xl font-bold capitalize'>About securetrace</h1>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor repudiandae voluptas tenetur soluta unde mollitia nesciunt esse dolorem nemo? Recusandae.</p>
      </div>

      <div className='w-full md:w-1/2 flex justify-center items-center'>
      <div className='w-[80%] border-2 shadow-lg h-96 rounded-xl px-3 pt-5 overflow-auto'>
          <h1 className='text-center text-xl font-medium'>Recent TXS Table</h1>
          <div className='flex mt-4 justify-evenly'>
            <p className='font-medium'>Chain</p>
            <p className='font-medium'>Tx hash</p>
            <p className='font-medium'>Token</p>
            <p className='font-medium'>Holdings</p>
            <p className='font-medium'>USD</p>
          </div>
      </div>

      </div>
      
    </div>
  )
}
