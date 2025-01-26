import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const firebaseConfig = {
  apiKey: "AIzaSyBcWvd_VQaT4UWOTQXAEQJ7KXzUkQ1Dwus",
  authDomain: "social-app-70807.firebaseapp.com",
  projectId: "social-app-70807",
  storageBucket: "social-app-70807.firebasestorage.app",
  messagingSenderId: "606608953062",
  appId: "1:606608953062:web:c3c6807a9011c9e1b6f527"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const signUpUser = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: userName, photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs10cupyp3Wf-pZvdPjGQuKne14ngVZbYdDQ&s"
        }).then(() => {

          sendEmailVerification(auth.currentUser)
            .then(() => { 
              console.log("Email verification sent!")

            })
            .catch(() => {
              console.log("Verification not sent")
            })

          console.log("Profile Updated")
        }).catch((error) => {

          console.log("Update Profile Err", error)

        });
        console.log("Res", user)
      })
      .catch((error) => {
        console.log("err", error)
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  return (
    <div className="signup-container">
      <h2>Sign in to Chrome</h2>
      <h3>Use Your Google Account</h3>

      <form onSubmit={signUpUser} className="signup-form">
        <label className="signup-label">
          UserName{" "}
          <input
            type="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="signup-input"
            required
          />
        </label>
        <label className="signup-label">
          Email{" "}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signup-input"
            required
          />
        </label>
        <label className="signup-label">
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signup-input"
            required
          />
        </label>
        <br />
        <button type="submit" className="signup-button">
          Create account
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
      </form>
      <p className="link">
        <a href="/Forget" style={{textDecoration: "none" , color: "#333" , fontSize: "20px"}}>Forgot email?</a>
      </p>
      <p className="link">
        <a href="/login" style={{textDecoration: "none" , color: "#333" , fontSize: "20px"}}>Already have an account?</a>
      </p>
    </div>
  );
};

export default Signup;
