import React, { useState } from 'react';
import {
    getAuth,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    GithubAuthProvider,
    GoogleAuthProvider,
    FacebookAuthProvider
} from "firebase/auth";
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

    const provider = new GithubAuthProvider();
    const signupWithGithub = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                const credential = GithubAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log("User :", user)
                navigate('/welcome');
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GithubAuthProvider.credentialFromError(error);
                console.log("error", error)
                // ...
            });
    }
    const provider2 = new GoogleAuthProvider();

    const signupWithGoogle = () => {
        signInWithPopup(auth, provider2)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log("User :", user)
                navigate('/welcome');
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
                console.log("error", error)
            });
    }
    const provider3 = new FacebookAuthProvider();
    const signupWithFacebook = () => {
    signInWithPopup(auth, provider3)
        .then((result) => {
            // The signed-in user info.
            const user = result.user;

            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;
            console.log("User :", user)
            navigate('/welcome');

            // IdP data available using getAdditionalUserInfo(result)
            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);

            // ...
            console.log("error", error)

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
                <a href="/Forget " style={{ textDecoration: "none", color: "#333", fontSize: "20px" }}>Forgot Password?</a>
            </p>
            <p className="link">
                <a href="/signup" style={{ textDecoration: "none", color: "#333", fontSize: "20px" }}>Create account</a>
            </p>
            <button onClick={signupWithGithub}>Login With Github</button>
            <button onClick={signupWithGoogle}>Login With Google</button>
            <button onClick={signupWithFacebook}>Login With Facebook</button>
        </div>
    );
}

export default Login;
