import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import '../App.css';
const Forget = () => {
  const [userEmail, setUserEmail] = useState(""); ;
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const auth = getAuth();

  const forgetPassword = (e) => {
    e.preventDefault();

    sendPasswordResetEmail(auth, userEmail)
      .then(() => {
        console.log("Reset Email Sent!");
        setShowMessage(true);
        setErrorMessage("");
        setUserEmail("");
      })
      .catch((error) => {
        console.log("Error: ", error);
        setShowMessage(false);
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="login-container">
      <h2>Reset Password</h2>
      <h3>Enter your email to reset your password</h3>

      <form onSubmit={forgetPassword} className="login-form">
        <label className="login-label">
          Email:{" "}
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="login-input"
            required
          />
        </label>
        <br />
        <button type="submit" className="login-button">
          Send Reset Email
        </button>
      </form>

      {showMessage && <p className="success-message">Reset email sent successfully!</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p className="link">
        <a href="/login" style={{textDecoration: "none" , color: "#333" , fontSize: "20px"}}>Login</a>
      </p>
      <p className="link">
        <a href="/signup" style={{textDecoration: "none" , color: "#333" , fontSize: "20px"}}>Create Account</a>
      </p>
    </div>
  );
};

export default Forget;
