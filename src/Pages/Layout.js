import React from 'react'
import { Outlet } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import makeToast from '../Toaster';

export default function Layout(props) {
  const navigate = useNavigate();
  const socket = props.socket;

  const logout = () => {
    localStorage.removeItem('chat_token');
    socket.disconnect();
    makeToast('success', 'You have logged out.');
    navigate('/login');
  }

  const account = () => {
    navigate('/auth/account')
  }

  const dashboard = () => {
    navigate('/auth/dashboard')
  }

  return (
    <>
      <div className='relative'>
        <div className='fixed w-full h-5 bg-white z-10 text-2xl'>
          <nav className='border-b-4 flex flex-row justify-end bg-white'>
            <button onClick={dashboard} className='border-2 mr-5'>Dashboard</button>
            <button onClick={account} className='border-2 mr-5'>Account</button>
            <button onClick={logout} className='border-2 mr-5'>Logout</button>
          </nav>
        </div>

        <div className='absolute top-14 w-full'>
          <Outlet ></Outlet>
        </div>
      </div>
    </>
  )
}
