import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function DashboardPage(props) {
  const [chatrooms, setChatrooms] = useState([])

  const getChatrooms = () => {
    axios.get("http://localhost:4000/chatroom", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('chat_token')
      }
    }).then((res) => {
      setChatrooms(res.data)
    }).catch((err) => {
      setTimeout(getChatrooms, 3000)
    })
  }

  useEffect(() => {
    getChatrooms();
  }, [])

  return (
    <div>
      <label htmlFor="chatroomName">Chatroom Name</label>
      <input type='text' name='chatroomName' id='chatroomName'></input>
      <button type='submit'>Create Chatroom</button>
      <div>
        {chatrooms.map((room) => (
          <div key={room._id}>
            <div>{room.name}</div>
            <Link to={'/chatroom/' + room._id}>
              <button>Join</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
