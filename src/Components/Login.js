import React from 'react';
import '../css/login.css';
import {auth , provider} from '../firebase';
import { useStateValue } from '../StateProvider';
import wplogo from './images/whatsappLogo.png';
import gLogo from './images/googleLogo.png';

function Login() {

  const [{},dispatch] = useStateValue();



  const signIn = ()=>{
    auth.signInWithPopup(provider).then(result=>{
      dispatch({
        type:"SET_USER",
        user:result.user
      })
    }).catch(err=>alert("❗Log in failed\nTry Again🟢🟠🔵"))
  }

  return (
    <div className='login__wrapper'>
        <div className="login">
            <img src={wplogo} alt="whatsapp logo" />
            <h2>Sign in to Whatsapp </h2>
            <button onClick={signIn}><img src={gLogo} alt="Google" className='login__google'/>Log in</button>
        </div>
    </div>
  )
}

export default Login