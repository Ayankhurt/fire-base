import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const auth = getAuth();
    const navigate = useNavigate();

    const loginUser = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("Res", user);
                navigate('/welcome');
            })
            .catch((error) => {
                console.log("Err", error);
                const errorMessage = error.message;
                setErrorMessage(errorMessage);
            });
        }

    return (
        <div className="login-container">
            <h2>Login to Chrome</h2>
            <h3>Use Your Google Account</h3>

            <form onSubmit={loginUser} className="login-form">
                <label className="login-label">
                    Email or phone:{" "}
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="login-input"
                        required
                    />
                </label>
                <label className="login-label">
                    Password:{" "}
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                        required
                    />
                </label>
                <br />
                <button type="submit" className="login-button">
                    Login
                </button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
            <p className="link">
                <a href="/Forget "style={{textDecoration: "none" , color: "#333" , fontSize: "20px"}}>Forgot Password?</a>
            </p>
            <p className="link">
                <a href="/signup" style={{textDecoration: "none" , color: "#333" , fontSize: "20px"}}>Create account</a>
            </p>
        </div>
    );
}

export default Login;
