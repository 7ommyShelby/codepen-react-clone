import { FaHtml5, FaAngleDown, FaCss3Alt, FaCheckCircle } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { BsPencilSquare } from "react-icons/bs";
import { IoLogoJavascript } from "react-icons/io5";
import React, { useState, useReducer, useRef, useCallback, useEffect } from 'react';
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
import './style.css'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { abcdef } from '@uiw/codemirror-theme-abcdef';
import img from '../components/codepen-logo-eccd67a3067908687f74b7725787a321b0a13ce18601ba839aaab2bd8df9d772.svg'
import { Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useSelector, useDispatch } from "react-redux";

function reducer(state, action) {

  switch (action.type) {
    case 'sethtml':
      return {
        ...state, html: action.payload
      };
    case 'setcss':
      return {
        ...state, css: action.payload
      };
    case 'setjs':
      return {
        ...state, js: action.payload
      };
    case 'setoutput':
      return {
        ...state, output: action.payload
      };
    case 'settitle':
      return {
        ...state, title: action.payload
      };
    case 'setcheck':
      return {
        ...state, check: action.payload
      };


    default: return state
  }
}

const NewProjects = () => {

  const reduxdispatch = useDispatch()

  const userdata = useSelector((state) => (state.user))
  console.log(userdata);
  async function saveHandler() {

    if (Object.keys(userdata).length !== 0) {

      const id = userdata.uid;
      const doccument = {
        id: id,
        title: state.title,
        html: state.html,
        css: state.css,
        js: state.js,
        output: state.output,
        user: userdata
      }

      await setDoc(doc(db, "projects", id), doccument, { merge: false }).then((res) => {
        console.log(res);
      })
        .catch((err) => {
          console.log(err);
        })
    }else{
      alert("Please LogIn")
    }
  }

  const initial = {

    html: '',
    css: '',
    js: '',
    output: '',
    title: "Untitled",
    check: false,

  }

  const [state, dispatch] = useReducer(reducer, initial)

  const output = () => {

    const result = `
  <html>
    <head>
      <style>${state.css}</style>
    </head>
    <body>
        ${state.html}
      <script>${state.js}</script>
    </body>
  </html>
    `;

    dispatch({ type: "setoutput", payload: result })
  }

  useEffect(() => {
    output()
  }, [state.html, state.css, state.js])



  const [sizes, setSizes] = useState([
    "50%",
    "50%"
  ]);

  const [sizes1, setSizes1] = useState([
    "33%",
    "33%",
    "33%"
  ]);

  const layoutCSS = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <>
      <section className='h-screen w-full flex items-start justify-start overflow-hidden flex-col'>
        {/* alert section */}

        <header className="w-full items-center justify-between px-12 py-4">
          <div className="flex items-center gap-6">
            <Link to={'/home/projects'}>
              <img className="w-32" src={img} alt="" />
            </Link>
            <div className="flex items-center justify-center gap-6">
              <div className="flex justify-center items-center gap-3">

                {Object.keys(userdata).length !== 0 &&
                  state.check ? (
                    <>
                      <input
                        className="bg-slate-800 border-none px-2 rounded py-1"
                        type="text"
                        placeholder="your title"
                        value={state.title}
                        onChange={(e) => {
                          dispatch({ type: 'settitle', payload: e.target.value })
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <p className="px-3 py-2 text-white text-lg">{state.title}</p>
                    </>
                  )
                }
              </div>
              <div className="flex justify-center items-center gap-3">
                { Object.keys(userdata).length !== 0 &&
                  state.check ? (
                    <>
                      <div className="cursor-pointer h-full flex items-center" onClick={() => {
                        dispatch({ type: "setcheck", payload: false })
                      }}><FaCheckCircle className="text-white" /></div>
                    </>
                  ) : (
                    <>
                      <div className="cursor-pointer h-full flex items-center" onClick={() => {
                        dispatch({ type: "setcheck", payload: true })
                      }}><BsPencilSquare className="text-white" /></div>
                    </>
                  )
                }{
                  Object.keys(userdata) === 0 ? alert("Please LogIn") : ""
                }
              </div>
            </div>
          </div>

          <div>
            <button onClick={saveHandler} className="text-white">SAVE</button>
          </div>

        </header>

        <div className='h-screen w-full'>
          <SplitPane
            split='horizontal'
            sizes={sizes}
            onChange={(sizes) => setSizes(sizes)}
          >
            <div className='w-full' style={{ ...layoutCSS, background: '#ddd' }}>



              <div style={{ width: "100%", height: "100%" }}>
                <SplitPane
                  sizes={sizes1}
                  onChange={(sizes1) => setSizes1(sizes1)}
                >
                  <div style={{ ...layoutCSS, background: '#ddd' }}>

                    <div className='w-full h-full flex flex-col items-start justify-start'>
                      <div className='flex justify-between items-center w-full'>
                        <div className='bg-slate-700 px-4 py-2 flex items-center justify-center gap-3'>
                          <FaHtml5 className='text-xl text-red-500' />
                          <p className='text-white font-semibold'>HTML</p>
                        </div>
                        <div className='flex items-center gap-4 px-4'>
                          <IoMdSettings className='text-xl text-slate-400' />
                          <FaAngleDown className='text-xl  text-slate-400' />
                        </div>
                      </div>
                      <div className='editor'>
                        <CodeMirror theme={abcdef} value={state.html} className='text-black' height="60vh" extensions={[javascript({ jsx: true })]} onChange={(element) => {
                          dispatch({ type: "sethtml", payload: element })
                        }} />
                      </div>
                    </div>

                  </div>
                  <div style={{ ...layoutCSS, background: '#d5d7d9' }}>

                    <div className='w-full h-full flex flex-col items-start justify-start'>
                      <div className='flex justify-between items-center w-full'>
                        <div className='bg-slate-700 px-4 py-2 flex items-center justify-center gap-3'>
                          <FaCss3Alt className='text-xl text-blue-500' />
                          <p className='text-white font-semibold'>CSS</p>
                        </div>
                        <div className='flex items-center gap-4 px-4'>
                          <IoMdSettings className='text-xl text-slate-400' />
                          <FaAngleDown className='text-xl  text-slate-400' />
                        </div>
                      </div>
                      <div className='editor '>
                        <CodeMirror theme={abcdef} value={state.css} className='text-black ' height="60vh" extensions={[javascript({ jsx: true })]} onChange={(element) => {
                          dispatch({ type: "setcss", payload: element })
                        }} />
                      </div>
                    </div>

                  </div>
                  <div style={{ ...layoutCSS, background: '#ddd' }}>

                    <div className='w-full h-full flex flex-col items-start justify-start'>
                      <div className='flex justify-between items-center w-full'>
                        <div className='bg-slate-700 px-4 py-2 flex items-center justify-center gap-3'>
                          <IoLogoJavascript className='text-xl text-yellow-500' />
                          <p className='text-white font-semibold'>JavaScript</p>
                        </div>
                        <div className='flex items-center gap-4 px-4'>
                          <IoMdSettings className='text-xl text-slate-400' />
                          <FaAngleDown className='text-xl  text-slate-400' />
                        </div>
                      </div>
                      <div className='editor'>
                        <CodeMirror theme={abcdef} value={state.js} className='text-black' height="60vh" extensions={[javascript({ jsx: true })]} onChange={(element) => {
                          dispatch({ type: "setjs", payload: element })
                        }} />
                      </div>
                    </div>
                  </div>
                </SplitPane>
              </div>



            </div>

            <div className='overflow-hidden h-full justify-start items-start bg-slate-600 border-2' >

              <iframe
                className="w-full h-full"
                srcDoc={state.output.toString()}
              />

            </div>

          </SplitPane>
        </div>

      </section>
    </>
  )
}

export default NewProjects
