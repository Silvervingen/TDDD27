import React from 'react';

import './App.css';

import Menu from "./menus/Menu";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Library from "./pages/Library";

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import logo from './pictures/logo.svg';
import logo1 from './pictures/GameTrackr.png';

function App() { 
  return (
    
    <div className="App">

<Router>
      <nav>
        <ul>
          <li>
            <Link to="/">< img src={logo1} id="symbol" className="App-logo1" alt="logo1" /></Link>
            
          </li>
            <li id="Li_library">
            <Link to="/Library" className='nav'>Library</Link>
          </li>
          <li >
            <Link to="/Login" className='nav'>Login</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Library" element={<Library />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </Router>

    </div>
  );

  const searchText = document.getElementById("search-text");
  const searchForm = document.getElementById("search-form");
  
  searchText.addEventListener("click", function() {
    searchForm.style.display = "block";
  });
  
  document.addEventListener("click", function(event) {
    if (!searchText.contains(event.target) && !searchForm.contains(event.target)) {
      searchForm.style.display = "none";
    }
  });
}

export default App;

