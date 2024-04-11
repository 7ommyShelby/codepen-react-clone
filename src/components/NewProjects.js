import { FaHtml5, FaAngleDown, FaCss3Alt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoLogoJavascript } from "react-icons/io5";
import React, { useState, useReducer, useRef, useCallback } from 'react';
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
import './style.css'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';



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
  }

}

const NewProjects = () => {

  
  const initial = {
    html: '',
    css: '',
    js: '',
  }
  
  const [state, dispatch] = useReducer(reducer, initial)

 
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

        {/* header section */}

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
                        <CodeMirror value={state.html} className='text-black' height="600px" extensions={[javascript({ jsx: true })]} onChange={(element) => {
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
                      <div className='editor'>
                        <CodeMirror value={state.css} className='text-black' height="600px" extensions={[javascript({ jsx: true })]} onChange={(element) => {
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
                        <CodeMirror value={state.js} className='text-black' height="600px" extensions={[javascript({ jsx: true })]} onChange={(element) => {
                          dispatch({ type: "setjs", payload: element })
                        }} />
                      </div>
                    </div>
                  </div>
                </SplitPane>
              </div>



            </div>

            <div style={{ ...layoutCSS, background: '#c0c3c6' }}>
              pane2
            </div>

          </SplitPane>
        </div>









      </section>
    </>
  )
}

export default NewProjects
