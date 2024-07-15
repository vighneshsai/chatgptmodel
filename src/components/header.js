import React from 'react'
import logo from '../public/yaaneLogo.jpeg'

function Header() {
  return (
    <div className='App-header'>
      <img className='App-logo' src={logo}/>
      <div className='flex'>
          <div className='nav'>Home</div>
          <div className='nav'>About</div>
          <div className='nav'>Contact</div>
          <div className='nav'>Service</div>
      </div>
    </div>
  )
}

export default Header
