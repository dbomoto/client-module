import axios from 'axios'
import { useState, useEffect } from 'react'
import makeToast from '../Toaster'
import { useNavigate } from 'react-router-dom'

export default function AccountPage(props) {
  const [account, setAccount] = useState({})
  const navigate = useNavigate();
  const socket = props.socket;

  const getAccount = () => {
    axios.post("http://localhost:4000/user/getinfo",
      {},
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('chat_token')
        }
      }).then((res) => {
        setAccount(res.data)
      }).catch((err) => {
        setTimeout(getAccount, 3000)
      })
  }

  const deleteAccount = () => {
    axios.delete("http://localhost:4000/user/delete",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('chat_token')
        }
      }).then((res) => {
        localStorage.removeItem('chat_token');
        socket.disconnect();        
        makeToast('success',res.data.message)
        navigate('/login')
      }).catch((err) => {
        makeToast('error', err.response.data.message)
      })    
  }

  useEffect(() => {
    getAccount()
  }, [])

  return (
    <>
      <div>Account Details</div>
      <div>Name: {account.name}</div>
      <div>Email: {account.email}</div>
      <button onClick={deleteAccount}>Delete Account</button>
    </>
  )
}
