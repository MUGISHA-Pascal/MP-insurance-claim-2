import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css'
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
    <div className='claims-gen'>
      <div className='images'>
        <div className='images-sub1'>
        <img src="./Assets/Images/insurance.jpeg" className='insu-img' alt="" />
        <p>Security: By default, web browsers enforce a security measure called the Security:  By default, web browsers enforce a 
security measure called the  Same-Origin Policy. This restricts a web page from making requests to a  different domain 
than the one it was loaded from. This helps prevent  malicious scripts from stealing data or performing </p>
     </div>
     <div className='images-sub2'>
      <div>
       <img src="./Assets/Images/im5.png" alt="" className='im5'/>
       <p>Property and Casualty (P&C) Claims: These claims involve damage or loss to property or injuries sustained by a person. They can be further broken down into:
Homeowner's Insurance Claims,Car Insurance Claims ,Business Interruption Claims</p>
      </div>
      <div>
        <img src="./Assets/Images/im4.png" alt="" className='im4' />
        <p>Health Insurance Claims: These claims are filed to recover the cost of medical treatment, surgery, hospitalization, or prescription drugs.</p>
      </div>
      <div>
        <img src="./Assets/Images/im3.png" className='im3' alt="" />
        <p>Liability Claims: These claims are filed against you by someone else who alleges you caused them injury or property damage.  Your insurance company will typically defend you in court and cover any settlements or judgments up to the policy limits.</p>
      </div>
      <div>
        <img src="./Assets/Images/im2.png" className='im2' alt="" />
      <p>Life Insurance Claims: This claim is filed upon the death of the insured person. The beneficiary named in the policy receives the death benefit.</p>
      </div>
      <div>
        <img src="./Assets/Images/im1.png" className='im1' alt="" />
        <p>Natural Disaster Claims: These claims are filed after a natural disaster such as a hurricane, tornado, or earthquake damages your property.</p>
      </div>
     </div>
      </div>
    <div className='claims'>
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
    </div>
  );
};

export default Claims;
