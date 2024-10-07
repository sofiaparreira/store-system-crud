import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Form from './pages/FormPage';
import DetailPage from './pages/DetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add' element={<Form />} />
        <Route path='/detail/:id' element={<DetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
