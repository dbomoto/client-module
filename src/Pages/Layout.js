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
        <div>
            <nav className='border-b-4 flex flex-row justify-end space-x-5'>
                <button onClick={dashboard}>Dashboard</button>
                <button onClick={account}>Account</button>
                <button onClick={logout}>Logout</button>
            </nav>
        </div>

        <div>
            <Outlet></Outlet>
        </div>
    </>
  )
}
