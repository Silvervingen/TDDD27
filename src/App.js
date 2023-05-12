import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import Menu from "./menus/Menu";
import Home from "./pages/Home";
import Library from "./pages/Library";
import GameInfo from './pages/GameInfo';
import Login from "./auth/Login";
import SavedGames from "./javascript/SavedGames"
import SignUp from "./auth/SignUp";


import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import logo1 from './pictures/GameTrackr.png';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if a user is already signed in
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    // Clean up the listener
    return unsubscribe;
  }, []);

  const handleLogout = () => {
    firebase.auth().signOut().then(() => {
      setIsAuthenticated(false);
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  }

  return (
    <div className="App">

      <Router>
      <nav>
  <ul>
    <li>
      <Link to="/"><img src={logo1} id="symbol" className="App-logo1" alt="logo1" /></Link>
    </li>
    <li id="Li_library">
      <Link to="/Library" className='nav'>Library</Link>
    </li>
    {isAuthenticated ? (
      <>
        
        <li>
          <Link to="/SavedGames" className='nav'>SavedGames</Link>
        </li>
        <li>
        <button onClick={handleLogout} className="logout_b" href="/">Logout</button>
        </li>
      </>
    ) : (
      <>
        <li>
          <Link to="/Login" className='nav'>Login</Link>
        </li>
      </>
    )}
  </ul>
</nav>


        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Library" element={<Library />} />
          <Route path="/GameInfo/:id" element={<GameInfo />} />
          <Route path="/SavedGames" element={<SavedGames />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
