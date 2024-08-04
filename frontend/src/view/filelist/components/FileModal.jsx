import React, { useState } from 'react';
import ModalLayout from '../../shared/UIElements/ModalLayout';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { LuUpload } from "react-icons/lu";



const FileModal = ({isModalOpen, setIsModalOpen, handleFileUpload, handleFileChange, handleFolderIdChange, folderId}) => {

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            {/* <button onClick={openModal}>Open Modal</button> */}
            {isModalOpen && (
                <ModalLayout onClose={closeModal}>
                    <div className='flex justify-between pb-2'>
                    <div className='text-3xl font-extrabold text-sky-700 '>Add Files</div>
                    <div onClick={closeModal}><IoIosCloseCircleOutline className='text-xl text-red-300 hover:text-red-700'/></div>
                    </div>
                    <div className='mb-4 flex'>
                        <input type="file" id="file-input" className='border p-2' onChange={handleFileChange} />
                        <input type="hidden" value={folderId} onChange={handleFolderIdChange}/>
                        <button onClick={handleFileUpload} className='border py-2 px-3 ml-1 text-[1.4rem]'><LuUpload /></button>
                    </div>
                </ModalLayout>
            )}
        </div>
    );
};

export default FileModal;
