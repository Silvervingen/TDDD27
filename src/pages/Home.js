import React from 'react'
import { Link, useParams } from 'react-router-dom'
import logo from '../pictures/GameTrackr.png';

function Home() { 
//import SearchBar from './SearchBar';, 
//skapa en search, som först står bara search sedan när man trycker på dem så expanderar den till en vanlig searchbar. Om man klickar utanför så går den tillbaka till bara text
    return (
      <div className="App">
  

  
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
          The purpose of the website is to offer a platform for users to keep track of the games they like. This can be useful for players who want a list of the games 
          they have played or the games they want to play in the future. By creating an account and adding games to their list, users can keep track of which games they
           have played, which games they have liked, and which games they want to play next.
          </p>
          
        </header>
      </div>
    );
    }
    export default Home;