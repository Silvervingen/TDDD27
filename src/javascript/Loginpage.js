import React, { useState } from 'react';
import logo1 from '../pictures/GameTrackr.png';

import '../css/styles.css';


function Loginpage() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (username === 'hej' && password === 'hejhej') {
      setLoggedIn(true);
    } else {
      setError('Invalid username or password');
    }
  }

  return (
   
    <div className="loginform">
      < img src={logo1} id="symbol" className="App-logo1" alt="logo1" />
    <div>
      {loggedIn ? (
        <div>You are now logged in!</div>
      ) : (
        <form onSubmit={handleSubmit}>
        
          <div>
            <label>Username:</label>
            <input type="text" value={username} onChange={handleUsernameChange} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={handlePasswordChange} />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
          {error && <div>{error}</div>}
        </form>
      )}
    </div>

    </div>

  );
}

export default Loginpage;