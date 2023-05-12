import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useNavigate } from 'react-router-dom';
import "../css/Login.css"

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
          .catch(error => console.error('Error signing in:', error));
      })
      .catch(error => console.error('Error setting persistence:', error));
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={handlePasswordChange} />
        <br />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/signup">Sign up here</a></p>
    </div>
  );
}

export default Login;

/*

*/