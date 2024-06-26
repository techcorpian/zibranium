import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ZView from './z-interface/ZView';
import Index from './z-interface/Index';

import './App.css'

function App() {

  return (
    <>
            <Routes>
              <Route index element={<ZView />} />
              <Route path='/index' element={<Index />} />

              {/* My Routes - Your Routes are added here*/}
            </Routes>
    </>
  )
}

export default App
