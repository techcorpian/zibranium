import React, { useState } from 'react';
import axios from 'axios';

function Index() {
  const [name, setName] = useState('');

  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/zibranium/create`, { name });
      console.log(response.data);
    } catch (error) {
      console.error('Error creating file:', error);
    }
  };

  return (
    <>
    <div className='fixed text-gray-500 bg-gray-700 w-[100%] p-2 px-4 font-extrabold'>ZIBRANIUM</div>
    <main className="App">
      <form onSubmit={handleSubmit} className="flex flex-row gap-3 text-white">
        <label className='flex-1'>
          <div>Enter The File Name</div>
          
          <input
            type="text"
            value={name}
            className="p-2 border w-[25%] rounded-md bg-gray-800"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button type="submit" className='bg-green-700 hover:bg-green-800 p-3 px-6 rounded-lg'>Create File</button>
      </form>
    </main>
    </>
  );
}

export default Index;
