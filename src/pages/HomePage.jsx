import React from 'react'

import About from '../components/auth/About'
import Login from '../components/auth/Login'
import Signup from '../components/auth/Signup'

function HomePage() {
  return (
    <div>
      <h3>HomePage</h3>
      <About />
      <Login />
      <Signup />
    </div>
  )
}

export default HomePage