import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function Menu() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link> 
          <link type="image/png" sizes="96x96" rel="icon" href=".../icons8-game-library-96.png"></link>
          
        </li>
        <li>
          <Link to="/Library">About</Link>
        </li>
        <li className="login">
          <Link to="/Login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
