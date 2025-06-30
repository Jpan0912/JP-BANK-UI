import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateAccountPage from './pages/CreateAccountPage'; 

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/open-account" element={<CreateAccountPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;