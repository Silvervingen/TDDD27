import React from 'react'
import logo from '../pictures/logo.svg';
import { Link, useParams } from 'react-router-dom'

// Här kommer inlogg finnas
// där loggan och text ska bytas till en log in funktion
function Login() { 
  
    return (
      <div className="App">
  

  
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/pages/Login.js</code> This is the Login page.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
}
export default Login;