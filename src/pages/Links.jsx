import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router";
import Login from "./Login";
import Signup from "./Signup";
import Welcome from "./Welcome";
import Profile from "./Profile";
import { GlobalContext } from "../context/Context";
import Forget from "./Forget";
import Home from "./Home";

const Links = () => {
    const { state, dispatch, logout } = useContext(GlobalContext);
  
    return (
        <>
            {state.isLogin ? (
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/Profile" element={<Profile />} />
                    <Route path="/Home" element={<Home />} />
                    <Route path="/Forget" element={<Forget />} />
                    <Route path="*" element={<Navigate to={"/"} />} />
                </Routes>
            ) : (
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/Forget" element={<Forget />} />
                    <Route path="*" element={<Navigate to={"/"} />} />
                </Routes>
            )}
        </>
    );
};

export default Links;
