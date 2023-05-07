import React from 'react'
import { useRef } from 'react'
import axios from 'axios'
import makeToast from '../Toaster'
import { useNavigate } from "react-router-dom"

export default function LoginPage(props) {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const loginUser = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    axios.post("http://localhost:4000/user/login", {
      email,
      password
    }).then(res => {
      makeToast("success", res.data.message)
      localStorage.setItem("chat_token", res.data.token)
      navigate('/auth/dashboard')
      props.setupSocket()
    }).catch(err => {
      makeToast("error", err.response.data.message)
    })
  }

  const registerUser = () => {
    navigate('/register')
  }


  return (
    <div>
      <label htmlFor="email">Email:</label>
      <input type='email' name='email' id='email' ref={emailRef}></input>
      <label htmlFor="password">Password:</label>
      <input type='password' name='password' id='password' ref={passwordRef}></input>
      <div className='space-x-5'>
        <button onClick={loginUser}>Login</button>
        <button onClick={registerUser}>Register</button>
      </div>
    </div>
  )
}
