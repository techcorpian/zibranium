import React from 'react';
import TimeComponent from '../components/TimeComponent';

const Time = () => {
  return (
    <div className='fixed flex flex-col justify-start align-start w-[100%]'>
      <div className='text-white text-xl bg-sky-800 py-3 text-2xl uppercase text-center'>Time</div>
      <div className='p-6'>Zibranium Framework Creates The Components Are Created Here</div>
      <div className='text-black text-center text-xl py-6 border border-gray-300 rounded-xl shadow-lg mx-6'><TimeComponent /></div>
    </div>
  );
};

export default Time;