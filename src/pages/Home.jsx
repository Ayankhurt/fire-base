import React, { useContext, useState } from 'react';
import './Home.css';
import { GlobalContext } from '../context/Context'
import { getAuth, verifyBeforeUpdateEmail } from "firebase/auth";

const Home = () => {
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
    <div>
      <h1 className="home-title">{state?.user?.displayName}</h1>
      <h6 className="home-email">{state?.user?.email}</h6>
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

    </div>
  )
}

export default Home
