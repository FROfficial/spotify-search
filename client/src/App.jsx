import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './components/Search';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/search' element={<Search/>}/>
      </Routes>
    </Router>
  )
}

export default App
