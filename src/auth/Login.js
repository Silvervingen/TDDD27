import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useNavigate } from 'react-router-dom';

import "../css/Login.css"

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if a user is already signed in
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        navigate('/');
      }
    });

    // Clean up the listener
    return unsubscribe;
  }, [navigate]);

  const handleEmailChange = event => setEmail(event.target.value);
  const handlePasswordChange = event => setPassword(event.target.value);

  const handleSubmit = event => {
    event.preventDefault();

    // Set persistence to LOCAL
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        // Sign in the user
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then(() => navigate('/'))
          .catch(error => setErrorMessage(error.message));
      })
      .catch(error => console.error('Error setting persistence:', error));
  };

  return (
    <div className='loginbox'> 
    <p class="sign" align="center">Login</p>
      <form className='log1' onSubmit={handleSubmit}>
       
        <input className='un' placeholder='Email' type="email" value={email} onChange={handleEmailChange} />
    
        <input className='pass' placeholder='Password' type="password" value={password} onChange={handlePasswordChange} />

        <button className='submit' type="submit">Login</button>
      </form>
      <p className='sign' style={{ fontSize: 15 }} >Don't have an account? <a href="/signup">Sign up here</a></p>

      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

export default Login;
