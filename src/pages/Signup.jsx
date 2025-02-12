import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import { Alert, Button, Snackbar } from '@mui/material';
import { VerticalAlignBottom } from '@mui/icons-material';

const firebaseConfig = {
  apiKey: "AIzaSyDq_YACZ923FWm0n8X-k68_V7JFKNbpZJ8",
  authDomain: "social-app-850ee.firebaseapp.com",
  projectId: "social-app-850ee",
  storageBucket: "social-app-850ee.firebasestorage.app",
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
  const [open, setOpen] = useState(false); // Snackbar state
  const navigate = useNavigate();

  const signUpUser = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: userName, photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs10cupyp3Wf-pZvdPjGQuKne14ngVZbYdDQ&s"
        }).then(() => {
          // navigate('/welcome');
          sendEmailVerification(auth.currentUser)
            .then(() => {
              console.log("Email verification sent!");
              setOpen(true); // Show Snackbar on success
            })
            .catch(() => {
              console.log("Verification not sent");
            });

          console.log("Profile Updated");
        }).catch((error) => {
          console.log("Update Profile Err", error);
        });
        console.log("Res", user);
      })
      .catch((error) => {
        console.log("err", error);
        setErrorMessage(error.message); // Display error message
      });
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="signup-container">
      <h2>Sign in to Chrome</h2>
      <h3>Use Your Google Account</h3>

      <form onSubmit={signUpUser} className="signup-form">
        <label className="signup-label">
          UserName{" "}
          <input
            type="text" // Corrected input type
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
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
      </form>
      <Button onClick={signUpUser}>Create Account</Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Your account has been created successfully!
        </Alert>
      </Snackbar>

      <p className="link">
        <a href="/Forget" style={{ textDecoration: "none", color: "#333", fontSize: "20px" }}>Forgot email?</a>
      </p>
      <p className="link">
        <a href="/login" style={{ textDecoration: "none", color: "#333", fontSize: "20px" }}>Already have an account?</a>
      </p>
    </div>
  );
};

export default Signup;
