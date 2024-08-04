import { useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Login from './view/auth/Login';
import Register from './view/auth/Register';
import ProtectedRoute from './view/auth/ProtectedRoute';
import FilesList from './view/filelist/pages/FileList';
import Projects from './view/project/pages/Projects';
import Folders from './view/folders/pages/Folders';
import MainNavigation from './view/shared/components/MainNavigation';
import './App.css'

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

function App() {
  const location = useLocation();
  return (
    <>
        {location.pathname !== '/' && location.pathname !== '/register' ? <MainNavigation /> : ''}
            <Routes>
              <Route path="/" element={<Login />} />
              {/* <Route path="/register" element={<Register />} /> */}
              <Route path="/home" element={<ProtectedRoute><FilesList /></ProtectedRoute>} />
              <Route path='/projects/folders/files/:id' element={<ProtectedRoute><FilesList /></ProtectedRoute>} />
              <Route path='/projects' element={<ProtectedRoute><Projects /></ProtectedRoute>} />
              <Route path='/projects/folders/:id' element={<ProtectedRoute><Folders /></ProtectedRoute>} />
            </Routes>
    </>
  )
}

export default AppWrapper;
