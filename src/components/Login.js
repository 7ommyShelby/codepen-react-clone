import logo from '../components/codepen-logo-eccd67a3067908687f74b7725787a321b0a13ce18601ba839aaab2bd8df9d772.svg'
import { FaGoogle, FaFacebookSquare, FaGithub } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';
import { useRef } from 'react';
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { provider } from './firebase';
import { gthb } from './firebase';


const Login = () => {

  const emailref = useRef(null)
  const passwdref = useRef(null)
  const navigate = useNavigate();

  function handlelogin() {

    const email = emailref.current.value;
    const pass = passwdref.current.value;

    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // console.log(userCredential);
        const user = userCredential.user;

        navigate('/home/projects')

      })
      .catch((error) => {

        alert("check credentials")
        navigate('/home/auth')
        const errorMessage = error.message;
        console.log(errorMessage);
      });

  }

  function googlesignup() {
    signInWithPopup(auth, provider)
      .then((result) => {

        const credential = GoogleAuthProvider.credentialFromResult(result);
        navigate('/home/projects')
        console.log(result);

      }).catch((error) => {
        alert("check credentials")
        navigate('/home/auth')

        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        const credential = GoogleAuthProvider.credentialFromError(error);

      });
  }

  function signupwithgitgub() {
    signInWithPopup(auth, gthb)
      .then((result) => {

        navigate('/home/projects')

        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

      }).catch((error) => {
        alert("check credentials")
        navigate('/home/auth')
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);

        const email = error.customData.email;

        const credential = GithubAuthProvider.credentialFromError(error);

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
              <p onClick={googlesignup}><FaGoogle className='text-2xl' />Log In with Google</p>
              <p onClick={signupwithgitgub}><FaGithub className='text-2xl' />Log In with GitHub</p>
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
