import { useRef } from 'react'
import axios from 'axios'
import makeToast from '../Toaster'
import { useNavigate } from "react-router-dom"

export default function RegisterPage() {
  const navigate = useNavigate();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const registerUser = () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    
    
    axios.post(`${process.env.REACT_APP_SERVER_URL}/user/register`, {
      name,
      email,
      password
    }).then(res => {
      makeToast("success", res.data.message)
      navigate("/login");
    }).catch(err => {
      makeToast("error", err.response.data.message)
    })
  }

  return (
    <div className='grid place-items-center h-screen text-2xl'>
      <div className='flex flex-col space-y-8'>
        <label htmlFor="name">Name:</label>
        <input type='text' name='name' id='name' ref={nameRef} placeholder='John Doe'></input>
        <label htmlFor="email">Email:</label>
        <input type='email' name='email' id='email' ref={emailRef} placeholder='example@gmail.com'></input>
        <label htmlFor="password">Password:</label>
        <input type='password' name='password' id='password' ref={passwordRef} placeholder='Input password'></input>
        <button onClick={registerUser} className='border-2 text-3xl'>Register</button>
      </div>
    </div>
  )
}
