import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "../css/auth.css"; // Import CSS file


function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = event => setEmail(event.target.value);
  const handlePasswordChange = event => setPassword(event.target.value);

  const handleSubmit = event => {
    event.preventDefault();

    // Create a new user
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => console.log('User created!'))
      .catch(error => console.error('Error creating user:', error));
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={handlePasswordChange} />
        <br />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <a href="/login">Login up here</a></p>
    </div>
  );
}

export default SignUp;
