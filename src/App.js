import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

import Menu from "./menus/Menu";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Loginpage from "./javascript/Loginpage";
import Auth from "./auth/Auth"
import LOGNOW from "./javascript/LogNow"
import GameInfo from './pages/GameInfo';


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
            <Link to="/Auth" className='nav'>Login</Link>
          </li>
        </ul>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Library" element={<Library />} />
        <Route path="/Auth" element={<Auth />} />
        <Route path="/GameInfo/:id" element={<GameInfo />} />
        </Routes>
    </Router>

    </div>
  );

}

export default App;

