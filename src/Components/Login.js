import React from "react";
import "./Login.css";
import db, { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {

  const navigate = useNavigate();

  const signInWithGoogle = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((result) => {
        const newUser = {
          fullname: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
        };
        navigate("/");
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        db.collection("users").doc(result.user.email).set(newUser);
      })
      .catch((err) => alert("❗Log in failed\nTry Again🟢🟠🔵"));
  };
  return (
    <div className='login-wrapper'>
        <div className="login">
            <img src="./whatsapp-logo.png" alt="whatsapp logo" />
            <h2>Sign in to Whatsapp </h2>
            <button onClick={signInWithGoogle}><img src="./google-logo.png" alt="Google" className='login__google'/>Log in</button>
        </div>
    </div>
  );
}

export default Login;