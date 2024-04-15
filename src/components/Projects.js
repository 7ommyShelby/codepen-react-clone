import React, { useEffect } from 'react'
import { signOut } from "firebase/auth";
import { auth } from './firebase';
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useSelector, useDispatch } from "react-redux";
import { setproject } from '../redux/slice';



const Projects = () => {

  const dispatch = useDispatch()
  const userdata = useSelector((state) => (state.user))
  const proj = useSelector((state) => (state.project))


  async function getdata() {

    if (!userdata?.uid) {
      console.log("User ID is undefined");
      return;
    }

    console.log("hello");

    const userDocRef = doc(db, "projects", userdata.uid);
    try {
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {

        const userDataFromFirestore = docSnap.data();
        dispatch(setproject(userDataFromFirestore));

      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  }

  console.log(proj);

  useEffect(() => {
    getdata()
  }, [userdata?.uid])


  return (
    <>
      <div className='text-white'>
        <div>
          <p>{userdata.uid}</p>
        </div>
      </div>
    </>
  )
}

export default Projects
