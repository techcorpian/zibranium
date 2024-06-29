import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ZView from './z-interface/ZView';
import Index from './z-interface/Index';
import './App.css'

// My Imports - Your Imports are added here
import Time from './view/Time/pages/Time';


function App() {

  return (
    <>
            <Routes>
              <Route index element={<ZView />} />
              <Route path='/index' element={<Index />} />
              <Route path='/index/:id' element={<Index />} />

              {/* My Routes - Your Routes are added here*/}
<Route path='/Time' element={<Time />} />

              
            </Routes>
    </>
  )
}

export default App
