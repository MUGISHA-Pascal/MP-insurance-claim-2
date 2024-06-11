import React, { useState } from 'react';
import axios from 'axios';
import "../App.css"
 
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:5000/login', { username, password });
    localStorage.setItem('token', response.data.token);
    window.location.href = '/claims'; 
  };

  return (
    <div className='form'>
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div className='link'>
      <button type="submit">Login</button>
      <a href="./claims">Home</a>
      </div>
    </form>
    </div>
  );
};

export default Login;
