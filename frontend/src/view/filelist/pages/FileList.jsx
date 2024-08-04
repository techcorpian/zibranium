import React, { useState } from 'react';
import axios from 'axios';
import FileTable from '../components/FileTable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { LuUpload } from "react-icons/lu";
import './FileList.css';
import FileModal from '../components/FileModal';

const FileList = () => {
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    const [file, setFile] = useState(null);
    const [filesList, setFilesList] = useState([]);
    const [folderId, setFolderId] = useState('');
    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
      setIsModalOpen(true);
    };

    const handleFileUpload = async () => {
      if (!file) {
        toast.error('Please Choose a File');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder_id', id);
  
      try {
        const response = await axios.post(`${apiUrl}/store/upload`, formData);
        console.log(response.data);
        toast.success('File uploaded successfully');

              // Reset file input field
      setFile(null);
      setFolderId('');
      document.getElementById('file-input').value = '';
  
        // Update files list after successful upload
        const updatedFilesList = await axios.get(`${apiUrl}/store/files/${id}`);
        setFilesList(updatedFilesList.data);
      } catch (error) {
        console.error('Error uploading file:', error);
        toast.error('Error uploading file');
      }
    };
  
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
      // console.log(e.target.files[0]);
    };

    const handleFolderIdChange = (e) => {
      setFolderId(e.target.value);
      // console.log(setFolderId(e.target.value));
    };
    
  return (
      
    <>
    <main>
      <FileModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} handleFileUpload={handleFileUpload} handleFileChange={handleFileChange} folderId={id} handleFolderIdChange={handleFolderIdChange}/>

      {/* <main>
      <div className='flex justify-between'>
        <h2 className='text-left text-[30px]'>Files List</h2>
        <div className='mb-4 flex'>
        <input type="file" id="file-input" className='border p-2' onChange={handleFileChange} />
        <button onClick={handleFileUpload} className='border py-2 px-3 ml-1 text-[1.4rem]'><LuUpload /></button>
        </div>
      </div>
      </main> */}

      <FileTable filesList={filesList} setFilesList={setFilesList} openModal={openModal}/>
      </main>

      {/* Toast container to display notifications */}
      <ToastContainer />
    </>
  )
}

export default FileList