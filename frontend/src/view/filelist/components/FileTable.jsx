import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiPlus } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DownloadButton from './DownloadButton';
import Table from '../../shared/UIElements/Tables.jsx'; // Import the Table component

const FileTable = ({filesList, setFilesList, openModal}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const { id } = useParams();

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };
  
    useEffect(() => {
      async function fetchFiles() {
        try {
          const response = await axios.get(`${apiUrl}/store/files/${id}`);
          setFilesList(response.data);
        } catch (error) {
          console.error('Error fetching files:', error);
        }
      }
  
      fetchFiles();
    }, []);

        const columns = [
            { key: 'filename', title: 'File Name', class: 'bg-sky-50 text-left ', sort: 'filename' },
            { key: 'action', title: 'Action', class: 'w-[1%] bg-sky-50 text-right', sort: '' },
            // Add more columns as needed
          ];

          // Concatenate 'firstname' and 'lastname' keys into 'fullname' key
const columnsDatas = filesList.map((file) => ({
    ...file,
    filename: `${file.filename}`,
    action: <div className='flex justify-center'>
        <td className='text-right py-2 px-4'><DownloadButton file={file}/></td>
  </div>
  
  }));
  
  const filteredCustomers = columnsDatas.filter((file) =>
  file.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>

      <div className='px-3 text-md border-b pb-2'>
      {/* <Link to='/home' className='float-right px-4 rounded-full bg-red-800 text-white text-sm py-1'>Back</Link> */}
          <div className='flex text-sky-900'>
              <Link to='/home' className='mt-1 text-sky-600'><FaHome/> </Link>
              <span className='px-2 text-sky-600'> / </span>
              <Link to='/projects' className='text-sky-600'>Projects</Link>
              <span className='px-2 text-sky-600'> / </span>
              <Link onClick={handleGoBack} className='text-sky-600'> Folders </Link>
              <span className='px-2 text-sky-600'> / </span>
              <span> Files </span>
          </div>
      </div>
      <div className='flex justify-between pb-4 py-3 '>
      <h1 className='text-3xl px-3 font-bold text-sky-700'>File Storage</h1>
      <Link onClick={openModal} className="btn2 flex flex-row items-center mx-3 text-md invisible md:visible">Add Files<span><BiPlus className='icon'></BiPlus></span></Link>
      <Link onClick={openModal} className="md:hidden my-2 mx-3"><span className="border border-sky-600 hover:bg-sky-600 hover:text-white text-2xl font-thin text-sky-600 rounded-md px-2 py-0">+</span></Link>
      </div>

      <div className='layout-box mx-3'>

      {/* Use the Table component with pagination props */}
      <Table
        datas={filesList}
        data={filteredCustomers}
        columns={columns}
        setSearchTerm={(e) => setSearchTerm(e.target.value)}
        searchTerm={searchTerm}

      />
      </div>
    </>
  )
}

export default FileTable