import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/Context";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import CircularProgress from "@mui/material/CircularProgress";
import './Welcome.css';

const Welcome = () => {
  const { state, dispatch, logout } = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();

  useEffect(() => {
    document.title = "Welcome - ConnectFission";

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user", user);
        dispatch({ type: "USER_LOGIN", payload: user });
        setLoading(false);
      } else {
        dispatch({ type: "USER_LOGOUT" });
        console.log("User Not Found");
        setLoading(false);
      }
    });
  }, [auth, dispatch]);

  return (
    <div className="welcome-container">
      <h1>Welcome</h1>
      {loading ? (
        <CircularProgress size={45} color="#B0BEC5" />
      ) : state.isLogin ? (
        <>
          <div className="card">
            <button>
              <Link style={{ textDecoration: "none" }} to={"home"}>
                Home
              </Link>
            </button>
          </div>

          <button className="logout-button" onClick={logout}>
            LOGOUT
          </button>
        </>
      ) : (
        <div className="card">
          <button>
            <Link style={{ textDecoration: "none" }} to={"signup"}>
              SignUp
            </Link>
          </button>

          <button>
            <Link style={{ textDecoration: "none" }} to={"login"}>
              Login
            </Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Welcome;
