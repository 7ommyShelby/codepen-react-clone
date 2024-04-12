import './App.css';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Home from './components/Home';
import NewProjects from './components/NewProjects';
import { useEffect } from 'react';
import { auth, db } from './components/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './components/Loading';
import { setloading, setuser } from './redux/slice';
import { onAuthStateChanged } from 'firebase/auth';



function App() {

  const dispatch = useDispatch()

  const loading = useSelector((state) => (state.loading))
  const userdata = useSelector((state) => (state.user))

  const navigate = useNavigate()



  useEffect(() => {

    dispatch(setloading(true))

    onAuthStateChanged(auth, (usercred) => {

      if (usercred) {

        setDoc(doc(db, "users", usercred?.uid), usercred?.providerData[0]).then(() => {
          dispatch(setuser(usercred?.providerData[0]))

        })
      }
    });

    const interval = setTimeout(() => {
      dispatch(setloading(false))
    }, 2000)

    return () => {
      clearTimeout(interval)
    }
  }, [])
  return (
    <>
      {loading ? (
        <div className='w-screen h-screen flex items-center justify-center overflow-hidden'>
          <Loading />
        </div>
      ) : (
        <div className="App">
          <Routes>
            <Route path='/home/*' element={<Home />} />
            <Route path='/newproject' element={<NewProjects />} />
            <Route path='/*' element={<Navigate to={'/home'} />} />
          </Routes >
        </div >
      )
      }
    </>
  );
}

export default App;
