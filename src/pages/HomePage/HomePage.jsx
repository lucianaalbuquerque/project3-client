import {useState} from "react";                     


import About from '../../components/auth/About'
import Login from '../../components/auth/Login'
import Signup from '../../components/auth/Signup'


function HomePage() {
  const [signup, setSignup] = useState(false)
  const [login, setLogin] = useState(true)

  const toogleSignup = () => {
    setSignup(login)
    setLogin(signup)
  }
  
  return (
    <div>
      <h3>HomePage</h3>
      <About />
      { login && <>
      <Login />
      <p>Don't have an account yet?</p>
      <a href='#' onClick={toogleSignup}> Sign Up</a>
      </>}
      { signup && <>
      <Signup />
      <p>Already have account?</p>
        <a href="#" onClick={toogleSignup}> Login</a>
      </>}
      
      {/* <button >Signup</button> */}
    </div>
  )
}

export default HomePage