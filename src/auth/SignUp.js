import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "../css/Login.css"; // Import CSS file
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleEmailChange = event => setEmail(event.target.value);
  const handlePasswordChange = event => setPassword(event.target.value);

  const handleSubmit = event => {
    event.preventDefault();

    // Create a new user
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User created!');
        navigate('/');
      })
      .catch(error => {
        console.error('Error creating user:', error);
        setError(error.message);
      });
  };

  return (
    <div className='loginbox'> 
      <p class="sign" align="center">Sign Up</p>
      <form className='log1' onSubmit={handleSubmit}>
        <input className='un' placeholder='Email' type="email" value={email} onChange={handleEmailChange} />
        <input className='pass' placeholder='Password' type="password" value={password} onChange={handlePasswordChange} />
        <button className='submit' type="submit">Sign Up</button>
      </form>
      <p className='sign' style={{ fontSize: 15 }} >Already have an account? <a href="/login">Login here</a></p>
      {error && <div className="error-message">{error}</div>}

    </div>
  );
}

export default SignUp;
