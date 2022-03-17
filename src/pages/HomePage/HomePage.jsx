import {useState} from "react"; 
import './homepage.css'                    


import About from '../../components/auth/About'
import Login from '../../components/auth/Login'
import Signup from "../../components/auth/Signup";


function HomePage() {
  const [signup, setSignup] = useState(false)
  const [login, setLogin] = useState(true)

  const toogleSignup = () => {
    setSignup(login)
    setLogin(signup)
  }
  
  return (
    <div className="homepage">
      <About />
      <div className="login">
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
      </div>
    </div>
  )
}

export default HomePage