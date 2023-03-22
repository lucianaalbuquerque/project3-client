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
      <div className="form">
        {!signupModal ? <>
          <Login />
          <p>Don't have an account yet?</p>
          <span onClick={toogleSignup}> Sign Up</span>
        </>
          : <>
            <Signup setSignupModal={setSignupModal} />
            <p>Already have account?</p>
            <span onClick={toogleSignup}> Login</span>
          </>}
      </div>
    </div>
  )
}

export default HomePage