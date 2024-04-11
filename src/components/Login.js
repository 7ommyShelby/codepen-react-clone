import logo from '../components/codepen-logo-eccd67a3067908687f74b7725787a321b0a13ce18601ba839aaab2bd8df9d772.svg'
import { FaGoogle, FaFacebookSquare, FaGithub } from "react-icons/fa";
import SignUp from './SignUp';
import { Link,useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';
import { useRef } from 'react';




const Login = () => {

  const emailref = useRef(null)
  const passwdref = useRef(null)
  const navigate = useNavigate();

  function handlelogin() {


    const email = emailref.current.value;
    const pass = passwdref.current.value;


    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // Signed in 
        console.log(userCredential);
        const user = userCredential.user;
        // ...
        navigate('/*')  
        
      })
      .catch((error) => {
        navigate('/home/auth')
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });

  }



  return (
    <>
      <section className='w-full flex items-center h-full flex-col mt-16 gap-8'>

        <div className='w-[700px] flex gap-8'>

          <div className="loginweb flex flex-col gap-4">

            <div className='w-40'>
              <img src={logo} alt="" />
            </div>
            <h1 className='text-white text-6xl font-bold'>Log In</h1>

            <div className=' sign-log flex flex-col gap-4'>
              <p><FaGoogle className='text-2xl' />Log In with Google</p>
              <p><FaGithub className='text-2xl' />Log In with GitHub</p>
              <p><FaFacebookSquare className=' text-2xl' />Log In with Facebook</p>
            </div>

          </div>



          <div className="signin flex flex-col items-baseline gap-4">
            <div className='sign-label'>
              <label>Email</label>
              <input ref={emailref} type="email" name="" id="" />
            </div>

            <div className='sign-label'>
              <label>Password</label>
              <input ref={passwdref} type="password" name="" id="" />
            </div>
            <button onClick={handlelogin}>LogIn</button>
          </div>

        </div>
        <div className='w-full flex justify-center'>
          <span className='text-white'>Need an account? <Link className='text-blue-500'
            to={'/home/auth'}>Sign up now!</Link></span>
        </div>
      </section>
    </>
  )
}

export default Login
