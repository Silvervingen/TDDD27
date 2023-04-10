import React from 'react'
import logo from '../pictures/logo.svg';
import { Link, useParams } from 'react-router-dom'

// Här kommer alla spel komma i olika divs, kopplas till databasen
// streckad menu
function Library() { 
  
    return (
      <div className="App">
  

  
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>Library.js</code> .This is the library.
          </p>
         
        </header>
      </div>
    );
}
export default Library;