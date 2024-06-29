import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Index() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [pages, setPages] = useState([]);
  const [files, setFiles] = useState([]);
  const [isFound, setIsFound] = useState(false);
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFound) {
      toast.error('Page name already exists');
      return;
    }
    try {
      await axios.post(`${apiUrl}/zibranium/create`, { name });
      setName('');
      toast.success('Page Created Successfully');
      const response = await axios.get(`${apiUrl}/zibranium/pages`);
      setPages(response.data);
    } catch (error) {
      console.error('Error creating file:', error);
      toast.error('Error creating page');
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setName(value);
    checkInput(value);
  };

  const checkInput = (value) => {
    const found = pages.some(page => page.name.toLowerCase() === value.toLowerCase());
    setIsFound(found);
  };

  useEffect(() => {
    axios.get(`${apiUrl}/zibranium/pages`)
      .then((res) => {
        setPages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios.get(`${apiUrl}/zibranium/files/${id}`)
      .then((res) => {
        setFiles(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <>
      <div className='fixed text-sky-700 bg-sky-900 w-[100%] p-2 px-4 font-extrabold'>ZIBRANIUM</div>
      <main className="App">
        <form onSubmit={handleSubmit} className="flex flex-row gap-3 text-black mx-3 my-3">
          <label className='flex-1'>
            <input
              type="text"
              value={name}
              className="p-2 border bg-cyan-200 w-[25%] rounded-md border-sky-700 placeholder:text-gray-400"
              placeholder='Enter The File Name....'
              onChange={handleChange}
            />
            {isFound && <p style={{ color: 'red' }}>Page name already exists</p>}
          </label>
          <button type="submit" className='bg-sky-700 hover:bg-sky-800 text-white p-1 px-6 rounded-lg h-[45px]'>Create File</button>
        </form>
        
        <div className='p-3 flex align-items gap-6'>
          <div className='w-[20%]'>
            {pages.map((page) => (
              
                <Link key={page.id} to={`/index/${page.id}`} className={`flex hover:bg-sky-700 ${page.id == id ? 'bg-sky-700 text-white' : 'text-sky-700 '} hover:text-white p-1 px-3`}>{page.name}</Link>
              
            ))}
          </div>
          <div className='border border-gray-200 shadow-lg w-[100%] h-[100%] flex flex-col justify-center align-items gap-4 p-6 bg-white rounded-xl'>
          <div className='text-sky-800 font-extrabold text-xl uppercase'>Frontend Pages</div>
          <div className='flex flex-row justify-start align-items gap-6'>
            {files.map((file) => (
              id == file.page_id && file.location == "frontend" ? 
              <>
              <div key={file.id} className='text-sky-700 border border-sky-700 p-6 rounded-md hover:bg-sky-700 cursor-pointer hover:text-white'>{file.filename}</div> 
              </>
              : ''
            ))}
          </div>
          <div className='text-sky-800 font-extrabold text-xl uppercase mt-6'>Backend Pages</div>
          <div className='flex flex-row justify-start align-items gap-6'>
            {files.map((file) => (
              id == file.page_id && file.location == "backend" ? <div key={file.id} className='text-sky-700 border border-sky-700 p-6 rounded-md hover:bg-sky-700 cursor-pointer hover:text-white'>{file.filename}</div> : ''
            ))}
          </div>
          <div className='flex'>
          <div className='text-sky-800 font-extrabold text-xl mt-6'>PAGE URL:
          {pages.map((page) => (
            page.id == id ?
            <Link to={`/${page.url}`} className='font-thin text-sm ml-4 border border-sky-600 p-1 rounded-lg px-3 bg-sky-200'>Click here to go to URL</Link> : ''
          ))}
          </div>
          </div>
          </div>
        </div>
        <ToastContainer />
      </main>
    </>
  );
}

export default Index;
