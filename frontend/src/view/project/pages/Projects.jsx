import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FaHome } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import { FaFolder } from "react-icons/fa";
import { BsFileEarmarkFill } from "react-icons/bs";
import { CiMenuKebab } from "react-icons/ci";
import './Projects.css';
import Table from '../../shared/UIElements/Tables.jsx'; // Import the Table component
import ProjectModal from '../components/ProjectModal';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');
  const [locationId, setLocationId] = useState('');
  const [locationName, setLocationName] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const [search, setSearch] = useState('');
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  const handleProjectUpload = async () => {
    if (!name) {
      toast.error('Please Choose a File');
      return;
    }else if(!locationId){
      toast.error('Please Choose a Location');
      return;
    }

    const formData = { name, location_id: locationId };

    try {
      const response = await axios.post(`${apiUrl}/projects/upload`, formData);
      console.log(response.data);
      toast.success('Project added successfully');

      // Reset project input field
      setName('');
      setLocationId('');

      // Update projects list after successful upload
      const updatedProjectsList = await axios.get(`${apiUrl}/projects/list`);
      setProjects(updatedProjectsList.data);
    } catch (error) {
      console.error('Error uploading folder:', error);
      toast.error('Error uploading folder');
    }
  };

  const handleProjectChange = (e) => {
    // console.log(e.target.value);
    setName(e.target.value);

  };

  const handleLocationChange = (e) => {
    // console.log(e.target.value);
    setLocationId(e.target.value);

  };

  // const handleProjectIdChange = (e) => {
  //   setProjectId(e.target.value);
  // };

  useEffect(() => {
    axios.get(`${apiUrl}/projects/list`)
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios.get(`${apiUrl}/projects/locations`)
      .then((res) => {
        setLocationName(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter(project =>
      project.name.toLowerCase().includes(search.toLowerCase()) 
      // ||
      // project.location_name.toLowerCase().includes(search.toLowerCase()) ||
      // project.type_name.toLowerCase().includes(search.toLowerCase())
    );
  }, [projects, search]);

  return (
    <main>
      <ProjectModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} handleProjectUpload={handleProjectUpload} handleProjectChange={handleProjectChange} locationId={locationId} name={name} handleLocationChange={handleLocationChange} locationName={locationName}/>
      {/* ----------------------- Top Container --------------------- */}
      <div className='px-3 text-md border-b pb-2'>
        {/* <Link to='/home' className='float-right px-4 rounded-full bg-red-800 text-white text-sm py-1'>Back</Link> */}

        {/* ----------------------- Breadcrumbs --------------------- */}
        <div className='flex text-sky-900'>
          <Link to='/home' className='mt-1 text-sky-600'><FaHome /> </Link>
          <span className='px-2 text-sky-600'> / </span>
          Projects
        </div>
      </div>

      {/* ----------------------- Header and Add Button --------------------- */}
      <div className='flex justify-between pb-4 py-3 '>
        <h1 className='text-3xl px-3 font-bold text-sky-700'>Projects</h1>
        <Link onClick={openModal} className="btn2 flex flex-row items-center mx-3 text-md invisible md:visible">Add Projects<span><BiPlus className='icon'></BiPlus></span></Link>
        <Link onClick={openModal} className="md:hidden mx-3"><span className="border border-sky-600 hover:bg-sky-600 hover:text-white text-2xl font-thin text-sky-600 rounded-md px-2 py-0">+</span></Link>
      </div>

      {/* ----------------------- Search Box --------------------- */}
      <div className="mb-4 mx-3 pt-5">
        <input
          type="text"
          className="p-1 px-2 border border-sky-300 rounded-lg "
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-4 gap-6 px-3">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <Link to={`/projects/folders/${project.id}`} className='border-2 border-white bg-white shadow-lg p-3 rounded-lg hover:shadow-lg hover:border-sky-600 cursor-pointer'>
              <Link className='float-right text-lg text-sky-700'><CiMenuKebab /></Link>
              <div className='flex font-light text-sky-600 align-items'>
                <div className='pt-1 pr-2 pb-2'><IoLocationOutline /></div>
                <div className=''>{project.location_name}</div>
              </div>
              <div className='text-xl text-sky-700 font-medium'>{project.name} Project</div>
              <div className='pt-1'><span className='text-xs text-sky-600 border border-sky-400 px-1 bg-sky-100 rounded-md'>{project.type_name}</span></div>

              <hr className='mb-3 mt-6 border-sky-200' />
              <div className='flex'>
                <div className='text-lg text-sky-600 flex'>
                  <span><FaFolder /></span>
                  <span className='text-sm px-2'>{project.folder_count}</span>
                </div>
                <div className='text-md text-sky-600 px-2 flex'>
                  <BsFileEarmarkFill />
                  <span className='text-sm px-2'>{project.file_count}</span>
                </div>
              </div>
            </Link>
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

export default Projects;