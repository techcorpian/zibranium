import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ZView from './view/pages/ZView';
import './App.css'

function App() {

  return (
    <>
        <Router>
            <Routes>
              <Route index element={<ZView />} />
              {/* <Route path='/clients' element={<Clients />} /> */}
            </Routes>
        </Router>
    </>
  )
}

export default App
