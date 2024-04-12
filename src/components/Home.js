import React from 'react'
import { useState } from 'react'
import './style.css'
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { motion } from 'framer-motion'
import { NavLink, Link } from 'react-router-dom';
import Projects from './Projects';
import SignUp from './SignUp';
import Login from './Login';
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { setuser } from '../redux/slice';
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";


const Home = () => {

    const [sidebar, setsidebar] = useState(false)
    const dispatch = useDispatch()
    const userdata = useSelector((state) => (state?.user))
    const [drop, setdrop] = useState(false)

    const signout = () => {

        signOut(auth).then(() => {
            dispatch(setuser({}))
            console.log("signout");

        }).catch((error) => {
            console.log("NO SIgnout");
        });

    }
    return (
        <>
            <main className='flex gap-4'>
                <div className={`${sidebar ? "collapsed " : "expanded"} py-6 px-2`} >

                    <motion.div whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }} className='arrow w-8 h-8 rounded-tr-lg rounded-br-lg absolute flex items-center cursor-pointer' onClick={() => {
                            setsidebar(!sidebar)
                        }}>
                        <MdKeyboardDoubleArrowLeft className='text-white text-xl' />
                    </motion.div>

                    <div className='list flex flex-col gap-8'>
                        <NavLink to={'/home'}>
                            <svg viewBox="0 0 138 26" fill="none" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" title="CodePen"><path d="M15 8a7 7 0 1 0 0 10m7-8.7L33 2l11 7.3v7.4L33 24l-11-7.3zm0 0 11 7.4 11-7.4m0 7.4L33 9.3l-11 7.4M33 2v7.3m0 7.4V24M52 6h5a7 7 0 0 1 0 14h-5zm28 0h-9v14h9m-9-7h6m11 1h6a4 4 0 0 0 0-8h-6v14m26-14h-9v14h9m-9-7h6m11 7V6l11 14V6"></path></svg>
                        </NavLink>

                        <Link to={'/newproject'}>
                            <div className={`${sidebar ? "hidden" : "codepen-button"}`}>
                                <span>Start Coding</span>
                            </div>
                        </Link>


                    </div>


                </div>

                <div className=' flex-1 min-h-screen max-h-screen overflow-y-scroll h-full flex flex-col items-start justify-start px-4 py-4'>

                    <div className='flex w-full justify-between items-center gap-4'>

                        <div className="search">
                            <IoSearch className='text-2xl text-slate-100' />
                            <input type="text" placeholder='Search CodePen...' className='px-2 py-2 text-xl' />
                        </div>

                        <div className="profile">
                            {Object.keys(userdata).length == 0 &&
                                <>
                                    <div className='flex gap-4 bg-'>
                                        <motion.div whileTap={{ scale: 0.9 }} className='flex justify-center items-center gap-3'>
                                            <NavLink to={"/home/auth"} className='bg-lime-600 cursor-pointer text-lg text-black px-6 py-1 hover:bg-green-800 hover:text-white rounded'>
                                                SignUp
                                            </NavLink>
                                        </motion.div>

                                        <motion.div whileTap={{ scale: 0.9 }} className='flex justify-center items-center gap-3'>
                                            <Link to={"/home/login"} className='bg-slate-700 cursor-pointer text-lg text-black px-6 py-1 hover:bg-zinc-700 hover:text-white rounded'>
                                                LogIn
                                            </Link>
                                        </motion.div>
                                    </div>
                                </>
                            }
                            {Object.keys(userdata).length !== 0 &&
                                <>
                                    <div className='flex items-center justify-center gap-4 relative'>

                                        <div className='w-14 h-14 flex items-center justify-center rounded overflow-hidden cursor-pointer bg-slate-500'>
                                            {
                                                userdata?.photoURL ? <><img src={userdata.photoURL} alt="" /></> : <><div className='text-4xl uppercase'>{userdata.email[0]}</div></>
                                            }
                                        </div>

                                        <div onClick={() => { setdrop(!drop) }} className='w-14 h-14 flex items-center justify-center rounded cursor-pointer bg-slate-500 relative'>

                                            {
                                                drop ? <><RiArrowDropUpLine className='text-5xl' /></> : <><RiArrowDropDownLine className='text-5xl' /></>
                                            }

                                            <div className={`button flex flex-col bg-slate-500 rounded text-white absolute right-0 w-56 top-20 ${drop ? "block" : "hidden"}`}>

                                                <h1 className='text-2xl px-4 py-4 text-center'>{userdata?.displayName || "Hello User"}</h1>
                                                <button className='w-full text-2xl bg-red-500 py-4 rounded flex justify-center items-center' onClick={signout} >LogOut</button>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                    </div>

                    <div className="projects w-full flex items-center justify-center">
                        <Routes>
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/auth" element={<SignUp />} />
                            <Route path="/login" element={<Login />} />
                        </Routes>
                    </div>

                </div>
            </main>
        </>
    )
}

export default Home
