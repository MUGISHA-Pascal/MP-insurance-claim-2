import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Claims = () => {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    const fetchClaims = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/claims', {
        headers: { Authorization: token }
      });
      setClaims(response.data);
    };
    fetchClaims();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:5000/claims/${id}`, {
      headers: { Authorization: token }
    });
    setClaims(claims.filter(claim => claim._id !== id));
  };

  return (
    <div>
      <h2>Claims</h2>
      <Link to="/create-claim">Create New Claim</Link>
      <ul>
        {claims.map(claim => (
          <li key={claim._id}>
            {claim.title} - {claim.description} - ${claim.amount}
            <Link to={`/update-claim/${claim._id}`}>Edit</Link>
            <button onClick={() => handleDelete(claim._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Claims;
