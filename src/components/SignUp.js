import React, { useState, useRef } from 'react'
import { FaGoogle, FaFacebookSquare, FaGithub, FaCheckSquare } from "react-icons/fa";
import { MdOutlineDoNotDisturbOn } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import { auth, db } from './firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signInWithRedirect, GoogleAuthProvider, getRedirectResult, GithubAuthProvider } from "firebase/auth";
import { provider } from './firebase';
import { gthb } from './firebase';
import { doc, setDoc } from 'firebase/firestore';
import {  setuser } from '../redux/slice';
import { useDispatch } from 'react-redux';



const SignUp = () => {

  const dispatch = useDispatch()
  // const userdata = useSelector((state) => (state.user))

  const [active, setactive] = useState(false)

  const emailref = useRef(null)
  const passwdref = useRef(null)
  const nameref = useRef(null)
  
  const navigate = useNavigate();

  function handlesignup() {

    const email = emailref.current.value;
    const pass = passwdref.current.value;
    

    createUserWithEmailAndPassword(auth, email, pass).then((usercred) => {

      console.log(usercred);

      setDoc(doc(db, "users", usercred?.user?.uid), usercred?.user?.providerData[0]).then(() => {
        dispatch(setuser(usercred?.user?.providerData[0]))
      })
      navigate('/home/login')

    }).catch((err) => {

      navigate('/home/auth')

      console.log(err.message)
    })

  }

  function googlesignup() {
    signInWithPopup(auth, provider)
      .then((result) => {

        const credential = GoogleAuthProvider.credentialFromResult(result);
        navigate('/home/projects')
        // console.log(result);

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

        navigate('/home/auth')
        alert("check credentials")
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);

        const email = error.customData.email;

        const credential = GithubAuthProvider.credentialFromError(error);

      });

  }

  return (
    <>

      <section className='mt-16'>
        <div className='w-[700px] bg-slate-500'>
          <div className="top flex text-center py-16 gap-2 flex-col text-white">
            <h1 className='text-6xl font-bold'>Free</h1>
            <p>Welcome to CodePen.</p>
          </div>

          <div className="below flex gap-2">

            <div className="log bg-white flex flex-col py-6 px-4 gap-4">
              <p onClick={googlesignup}><FaGoogle className='text-2xl' />SignUp with Google</p>
              <p onClick={signupwithgitgub}><FaGithub className='text-2xl' />SignUp with GitHub</p>
              <p><FaFacebookSquare className=' text-2xl' />SignUp with Facebook</p>

              Or,
              <p onClick={() => {
                setactive(!active)
              }}>SignUp with Email</p>

              <div className={`${active ? "auth flex gap-4 flex-col justify-start" : "hidden"}`}>
                <div className='inputs'>
                  <label>Your Name</label>
                  <input ref={nameref} type="text" name="" id="" />
                </div>
                <div className='inputs'>
                  <label>Choose a Username</label>
                  <input type="text" name="" id="" />
                  <span>codepen.io/username</span>
                </div>
                <div className='inputs'>
                  <label >Email</label>
                  <input ref={emailref} type="email" name="" id="" />
                </div>
                <div className='inputs'>
                  <label >Choose Password</label>
                  <input ref={passwdref} type="password" name="" id="" />
                  <span>Your password must:
                    <ul>
                      <li>Include an UPPER and lowercase letter</li>
                      <li>Include a number</li>
                      <li>Include one or more of these special characters: .@$!%*#?&</li>
                      <li>Be between 8 and 100 characters</li>
                    </ul>
                  </span>
                </div>
                <button onClick={handlesignup}>Submit</button>
              </div>
              <span>By signing up, you agree to CodePen's Terms of Service , Code of Conduct , and Privacy Policy .</span>
            </div>

            <div className="info flex flex-col gap-4 bg-slate-800 px-4 py-6">

              <div className='tags'>
                <h3>Free</h3>
                <hr />
                <p>Deploys <span>0</span></p>
                <p>Custom Domains <span>0</span></p>
              </div>

              <div className='tags'>
                <h3>PEN & PROJECT VIEWS</h3>
                <hr />
                <p>Editor View <span><FaCheckSquare /></span></p>
                <p>Full View <span><FaCheckSquare /></span></p>
                <p>Details View <span><FaCheckSquare /></span></p>
                <p>Shareable Debug View <span><MdOutlineDoNotDisturbOn /></span></p>
              </div>

              <div className='tags'>
                <h3>PEN FEATURES</h3>
                <hr />
                <p>Collab Mode <span><MdOutlineDoNotDisturbOn /></span></p>
                <p>Professor Mode <span><MdOutlineDoNotDisturbOn /></span></p>
                <p>Presentation View<span><MdOutlineDoNotDisturbOn /></span></p>
              </div>

              <div className='tags'>
                <h3>ASSET HOSTING</h3>
                <hr />
                <p>Storage <span><MdOutlineDoNotDisturbOn /></span></p>
              </div>
              <div className='tags'>
                <h3>Need More</h3>
                <hr />
                <div className='bg-yellow-400 py-2 px-4 rounded'>
                  <span className='text-black text-sm'>Unlock the full power of CodePen with our PRO plans.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full flex text-center items-center justify-center py-6'>
          <h4 className='text-white'>Terms of Service · Privacy Policy · Code of Conduct</h4>
        </div>
      </section>
    </>
  )
}

export default SignUp
