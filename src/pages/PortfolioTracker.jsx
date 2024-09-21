import React from 'react'

export default function PortfolioTracker() {
  return (
    <div className='w-full mt-10'>
    <div className='w-ful my-10'>
      <input type="text" className=' border px-3 py-1 shadow-lg ml-10 w-52 sm:w-96 rounded-lg ' placeholder='Enter the addres' />
    </div>
    <div className='w-full flex flex-wrap'>
    <div className='w-full md:w-1/2 flex justify-center items-center'>
    <div className='w-[80%] border-2 shadow-lg h-96 rounded-xl px-3 pt-5 overflow-auto'>
        <h1 className='text-center text-xl font-medium'>Address portfolio</h1>
        <div className='flex mt-4 justify-evenly'>
          <p className='font-medium'>Token</p>
          <p className='font-medium'>Holdings</p>
          <p className='font-medium'>USD</p>
        </div>
    </div>
    </div>
    <div className='w-full md:w-1/2 flex justify-center items-center'>
    <div className='w-[80%] border-2 shadow-lg h-96 rounded-xl px-3 pt-5 overflow-auto'>
        <h1 className='text-center text-xl font-medium'>Recent TXS Table for this address</h1>
        <div className='flex mt-4 justify-evenly'>
          <p className='font-medium'>Tx hash</p>
          <p className='font-medium'>Token</p>
          <p className='font-medium'>Holdings</p>
          <p className='font-medium'>USD</p>
        </div>
    </div>
    </div>
    </div>
  </div>

  )
}
