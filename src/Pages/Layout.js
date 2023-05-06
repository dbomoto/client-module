import React from 'react'
import { Outlet } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import makeToast from '../Toaster';

export default function Layout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('chat_token')
    makeToast('success', 'You have logged out.')
    navigate('/login')
  }

  return (
    <>
        <div>
            <nav className='border-b-4 flex flex-row justify-end'>
                <button onClick={logout}>Logout</button>
            </nav>
        </div>

        <div>
            <Outlet></Outlet>
        </div>
    </>
  )
}
