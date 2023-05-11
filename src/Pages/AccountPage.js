import axios from 'axios'
import { useState, useEffect } from 'react'
import makeToast from '../Toaster'
import { useNavigate } from 'react-router-dom'

export default function AccountPage(props) {
  const [account, setAccount] = useState({})
  const navigate = useNavigate();
  const socket = props.socket;
  const contacts = account.contacts || []

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

  const removeContact = (remove) => {
    axios.post("http://localhost:4000/user/removecontact",
      {remove},
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('chat_token')
        }
      }).then((res) => {
        makeToast('success', res.data.message)
        getAccount()
      }).catch((err) => {
        makeToast('error', err.response.data.message)
        setTimeout(removeContact, 3000)
      })
  }  

  useEffect(() => {
    getAccount()
  }, [])

  return (
    <div className='space-y-5 ml-5 text-2xl'>
      <div className='uppercase text-3xl'>Account Details</div>
      <div>Name: {account.name}</div>
      <div>Email: {account.email}</div>
      <div>Contacts:</div>
      {contacts.map((info,index)=>{
        return <div key={index} className='ml-5 space-x-5'>
          <span>{info.name}</span>
          <span>{info.email}</span>
          <button type='button' className='border-2 text-3xl' onClick={()=>{removeContact(info._id)}}>REMOVE</button>
        </div>
      })}
      <button onClick={deleteAccount} className='border-2 text-3xl bg-red-500 p-5'>Delete Account</button>
    </div>
  )
}
