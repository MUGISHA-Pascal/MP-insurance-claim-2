import React, { useState } from 'react';
import axios from 'axios';

const CreateClaim = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:5000/claims', { title, description, amount }, {
      headers: { Authorization: token }
    });
    window.location.href = '/claims';
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Claim</h2>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <label>Amount:</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateClaim;
