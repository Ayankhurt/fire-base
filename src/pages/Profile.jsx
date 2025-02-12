import React, { useContext, useState } from 'react';
import './Profile.css';
import { GlobalContext } from '../context/Context'
import { getAuth, verifyBeforeUpdateEmail } from "firebase/auth";
// import PostCard from '../components/PostCard';

const Profile = () => {
  const [message, setMessage] = useState("");

  const [newEmail , setNewEmail] = useState("");

  const [showForm , setShowForm] = useState(false);

  let {state, dispatch} = useContext(GlobalContext);

  const auth = getAuth();
  const changeEmail = (e) => {

    e.preventDefault();

    verifyBeforeUpdateEmail(auth.currentUser, newEmail).then(() => {
      console.log("Email Updated")

    }).catch((error) => {
      console.log("Update Email Error" , error)

    });
  }


  return (
    <div className=''>
      <img src={state?.user?.photoURL} alt="" style={{padding:"10px", height: "100px",width: "100px"}} />
      <h1 className="home-title">Name:{state?.user?.displayName}</h1>
      <h6 className="home-email">Email:{state?.user?.email}</h6>
      <p>Change Your Email click here</p>
      <button className="home-button" onClick={() => setShowForm((oldValue) => !oldValue)}>
        {(showForm) ? "Hide" : "Show"} Form
      </button>


      {showForm && (
        <form className="home-form" onSubmit={changeEmail}>
          <label htmlFor="newEmail">
            New Email: 
            <input 
              id="newEmail" 
              value={newEmail} 
              type="email" 
              onChange={(e) => { setNewEmail(e.target.value) }} 
              required 
              aria-label="New Email"
            />

            <button type='submit'>Submit</button>
          </label>
        </form>
      )}
      {message && <p>{message}</p>}
      {/* <PostCard /> */}
    </div>
  )
}

export default Profile
