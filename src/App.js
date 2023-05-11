import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

import Menu from "./menus/Menu";
import Home from "./pages/Home";
import Library from "./pages/Library";
import LOGNOW from "./javascript/LogNow"
import GameInfo from './pages/GameInfo';
import Login from "./auth/Login";
import SavedGames from "./javascript/SavedGames"


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
          <li >
            <Link to="/SavedGames" className='nav'>SavedGames</Link>
          </li>
        </ul>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Library" element={<Library />} />
        <Route path="/GameInfo/:id" element={<GameInfo />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SavedGames" element={<SavedGames />} />
        </Routes>
    </Router>

    </div>
  );

}

export default App;

