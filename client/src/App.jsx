import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Form from './pages/FormPage'



function App() {

  return (
    <Router>
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/add' element={<Form/>}></Route>
        </Routes>
    </Router>
  )
}

export default App
