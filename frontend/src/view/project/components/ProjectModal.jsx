import React, { useState } from 'react';
import ModalLayout from '../../shared/UIElements/ModalLayout';
import { IoIosCloseCircleOutline } from "react-icons/io";

const ProjectModal = ({ isModalOpen, setIsModalOpen, handleProjectUpload, handleProjectChange, locationId, name, locationName, handleLocationChange }) => {

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            {/* <button onClick={openModal}>Open Modal</button> */}
            {isModalOpen && (
                <ModalLayout onClose={closeModal}>
                    <div className='flex justify-between pb-2'>
                        <div className='text-3xl font-extrabold text-sky-700 '>Add Projects</div>
                        <div onClick={closeModal}><IoIosCloseCircleOutline className='text-xl text-red-300 hover:text-red-700'/></div>
                    </div>
                    <div className='mb-4 flex'>
                        <input type="text" className='border p-2' value={name} onChange={handleProjectChange} />
                        <select>
                            {
                        locationName.map((location) => (
                            <option value={locationId} onChange={handleLocationChange}>{location.name}</option>
                            ))
        }
                        </select>
                        <button onClick={handleProjectUpload} className='border py-2 px-3 ml-1 text-[1.4rem]'>Save</button>
                    </div>
                </ModalLayout>
            )}
        </div>
    );
};

export default ProjectModal;
