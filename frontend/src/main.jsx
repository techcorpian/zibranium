import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Index from './z-interface/Index';
import { BrowserRouter, Route, Routes as ZibraRoutes } from 'react-router-dom';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    {/* Zibranium Routes */}
      <ZibraRoutes>
        <Route path='/zibra-interface' element={<Index />} />
      </ZibraRoutes>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
)
