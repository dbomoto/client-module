import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import DashboardPage from './Pages/DashboardPage'
import IndexPage from './Pages/IndexPage'
import ChatroomPage from './Pages/ChatroomPage'
import { useState, useEffect } from 'react'
import io from "socket.io-client"
import makeToast from './Toaster'
import './index.css'
import Layout from "./Pages/Layout";
import AccountPage from './Pages/AccountPage'

function App() {
  const [socket, setSocket] = useState(null);

  const setupSocket = () => {
    const token = localStorage.getItem('chat_token') || "";
    if (token.length > 0 && !socket) {
      const newSocket = io(process.env.REACT_APP_SERVER_URL, {
        query: {
          token: localStorage.getItem("chat_token")
        },
      })

      newSocket.on('disconnect', ()=>{
        setSocket(null);
        setTimeout(setupSocket, 3000);
        makeToast('error', 'Socket disconnected')
      })
  
      newSocket.on('connect', ()=>{
        makeToast('success', 'Socket connected')
      })
  
      setSocket(newSocket);
    }
  }

  useEffect(()=>{
    setupSocket();
  },[])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />}></Route>
        <Route path="/login" element={<LoginPage setupSocket={setupSocket}/>}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/auth" element={<Layout socket={socket}/>} >  
          <Route path="dashboard" element={<DashboardPage socket={socket}/>}></Route>
          <Route path="chatroom/:id" element={<ChatroomPage socket={socket}/>}></Route>
          <Route path="account" element={<AccountPage socket={socket}/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
