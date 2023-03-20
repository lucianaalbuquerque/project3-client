import { useState } from "react";
import './homepage.css'

import About from '../../components/auth/About'
import Login from '../../components/auth/Login'
import Signup from "../../components/auth/Signup";

function HomePage() {
  const [signupModal, setSignupModal] = useState(false);

  const toogleSignup = () => {
    setSignupModal(prev => !prev)
  }

  return (
    <div className="homepage">
      <About />
      <div className="login">
        {!signupModal ? <>
          <Login />
          <p>Don't have an account yet?</p>
          <a href='#' onClick={toogleSignup}> Sign Up</a>
        </>
          : <>
            <Signup setSignupModal={setSignupModal} />
            <p>Already have account?</p>
            <a href="#" onClick={toogleSignup}> Login</a>
          </>}
      </div>
    </div>
  )
}

export default HomePage