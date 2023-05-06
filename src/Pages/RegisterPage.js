import React from 'react'
import axios from 'axios'
import makeToast from '../Toaster'
import { useNavigate } from "react-router-dom"

export default function RegisterPage() {
  const navigate = useNavigate();
  const nameRef = React.createRef();
  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  const registerUser = () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    axios.post("http://localhost:4000/user/register",{
      name,
      email,
      password
    }).then(res =>{
      makeToast("success", res.data.message)
      navigate("/login");
    }).catch(err => {
      makeToast("error", err.response.data.message)
    })
  }

  return (
    <div>
      <label htmlFor="name">Name:</label>
      <input type='text' name='name' id='name' ref={nameRef}></input>
      <label htmlFor="email">Email:</label>
      <input type='email' name='email' id='email' ref={emailRef}></input>
      <label htmlFor="password">Password:</label>
      <input type='password' name='password' id='password' ref={passwordRef}></input>
      <button onClick={registerUser}>Register</button>
    </div>
  )
}
