import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ZView from './ZView'
import Index from './Index';

const ZRoutes = () => {
  return (
    <>
    <Route index element={<ZView />} />
    <Route path='/index' element={<Index />} />
    </>
  )
}

export default ZRoutes