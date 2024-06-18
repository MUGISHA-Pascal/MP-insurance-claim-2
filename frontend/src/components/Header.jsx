import React from 'react'

export default function Header() {
  return (
    <div className='header'>
      <h2 className='insu-head'>INSURANCE CLAIM</h2>
      <nav className='nav-header'>
        <a href='./claims'>Home</a>
        <a href="./create-claim">create claims</a>
        <a href="./">Register</a>
        <a href='/login'>Login</a>
      </nav>
    </div>
  )
}
