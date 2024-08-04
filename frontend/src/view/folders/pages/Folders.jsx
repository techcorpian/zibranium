import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { BiPlus } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoFolderOpenSharp } from "react-icons/io5";
import { CiMenuKebab } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import FolderModal from '../components/FolderModal';

const Folders = () => {
    const [name, setName] = useState('');
    const [projectId, setProjectId] = useState('');
    const [foldersDatas, setFoldersDatas] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projectDatas, setProjectDatas] = useState([]);
    const [search, setSearch] = useState('');
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const { id } = useParams();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const handleFolderUpload = async () => {
        if (!name) {
            toast.error('Folder Name Is Required');
            return;
          }

        const formData = { name, project_id: id };

        try {
            const response = await axios.post(`${apiUrl}/folders/upload`, formData);
            console.log(response.data);
            toast.success('Folder uploaded successfully');

            // Reset folder input field
            setName('');
            setProjectId('');

            // Update folders list after successful upload
            const updatedFoldersList = await axios.get(`${apiUrl}/folders/${id}`);
            setFoldersDatas(updatedFoldersList.data);
        } catch (error) {
            console.error('Error uploading folder:', error);
            toast.error('Error uploading folder');
        }
    };

    const handleFolderChange = (e) => {
        console.log(e.target.value);
        setName(e.target.value);

    };

    const handleProjectIdChange = (e) => {
        setProjectId(e.target.value);
    };

    useEffect(() => {
        axios.get(`${apiUrl}/folders/${id}`)
            .then((res) => {
                setFoldersDatas(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    useEffect(() => {
        axios.get(`${apiUrl}/folders/projects/${id}`)
            .then((res) => {
                setProjectDatas(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const filteredFoldersDatas = useMemo(() => {
        return foldersDatas.filter(folder =>
            folder.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [foldersDatas, search]);

    return (
        <main>
            <FolderModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} handleFolderUpload={handleFolderUpload} handleFolderChange={handleFolderChange} projectId={id} handleProjectIdChange={handleProjectIdChange} name={name} />
            <div className='px-3 text-md border-b pb-2'>
                {/* <Link to='/home' className='float-right px-4 rounded-full bg-red-800 text-white text-sm py-1'>Back</Link> */}
                <div className='flex text-sky-900'>
                    <Link to='/home' className='mt-1 text-sky-600'><FaHome /> </Link>
                    <span className='px-2 text-sky-600'> / </span>
                    <Link to='/projects' className='text-sky-600'>Projects</Link>
                    <span className='px-2 text-sky-600'> / </span>
                    <span> Folders </span>
                </div>
            </div>
            {projectDatas.map((projectData) => (
                <div className='flex justify-between pb-4 py-3 '>
                    <div key={projectData.id} className='text-[4vh] w-[50%] text-sky-700 font-bold px-3 leading-[28px]'>{projectData.name} Project</div>
                    <Link onClick={openModal} className="btn2 flex flex-row items-center mx-3 text-md invisible md:visible">Add Folders<span><BiPlus className='icon'></BiPlus></span></Link>
                    <Link onClick={openModal} className="md:hidden mx-3"><span className="border border-sky-600 hover:bg-sky-600 hover:text-white text-2xl font-thin text-sky-600 rounded-md px-2 py-0">+</span></Link>
                </div>
            ))}
            <div className="mb-4 mx-3 pt-5">
                <input
                    type="text"
                    className="p-1 px-2 border border-sky-300 rounded-lg "
                    placeholder="Search folders..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="grid md:grid-cols-6 grid-cols-2 gap-4 py-4 text-center px-3">

                {filteredFoldersDatas.length > 0 ? (
                    filteredFoldersDatas.map((folder) => (
                        <div className='flex flex-col items-center justify-center'>
                            <Link
                                to={`/projects/folders/files/${folder.id}`}
                                className='w-full h-full bg-white border-2 border-white shadow-lg rounded-lg px-3 py-2 pt-3 hover:border-2 hover:border-sky-400'
                                key={folder.id}
                            >
                                <div className='flex flex-row justify-end'>
                                    <Link className='hover:text-sky-500 text-sky-900'><CiMenuKebab /></Link></div><br />
                                <div className='flex flex-col items-center justify-center pb-6'>
                                    <div className='text-4xl md:text-6xl text-yellow-500 pb-3'><IoFolderOpenSharp /></div>
                                    <div className='text-sm md:text-md text-sky-700'>{folder.name}</div>
                                </div>
                                <div className='flex flex-col pb-4'>
                                    <div className='text-[0.8rem] text-gray-400 font-thin'>{folder.created_date}</div>
                                    {/* <div className='float-left'>asdaadsa</div> */}

                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center text-sky-700 bg-sky-100 border border-sky-300 py-2">
                        No data found
                    </div>
                )}

            </div>

            {/* Toast container to display notifications */}
            <ToastContainer />
        </main>
    );
};

export default Folders;
