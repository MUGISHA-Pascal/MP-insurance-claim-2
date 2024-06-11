import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'
const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/register', { username, password });
    alert('User registered');
  };

  return (
    <div className='form'>
          <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div className='link'>
      <button type="submit">Register</button>
      <a href='./login'>login</a>
      </div>
    </form>
    </div>
  );
};

export default Register;
