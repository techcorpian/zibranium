import React from 'react'
import { LuDownload } from "react-icons/lu";
import axios from 'axios';

const DownloadButton = ({file}) => {
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const handleDownload = async (filename) => {
        try {
          const response = await axios.get(`${apiUrl}/store/download/${filename}`, {
            responseType: 'blob',
          });
    
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', filename);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        } catch (error) {
          console.error('Error downloading file:', error);
          toast.error('Error downloading file');
        }
      };
  return (
    <button className='text-[1.1rem] border py-1 px-1' onClick={() => handleDownload(file.filename)}><LuDownload /></button>
  )
}

export default DownloadButton