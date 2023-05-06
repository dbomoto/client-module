import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import makeToast from "../Toaster"

export default function DashboardPage(props) {
  const [chatrooms, setChatrooms] = useState([])
  const chatroomNameRef = useRef();
  const navigate = useNavigate();
  const socket = props.socket;

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
    if (localStorage.getItem('chat_token')) {
      if (socket) {
        chatrooms.map((room) => {
          socket.emit('joinRoom', {
            id: room._id
          })
        })


      }

      {/*unmounting*/ }
      return () => {
        if (socket) {
          chatrooms.map((room) => {
            socket.emit('leaveRoom', {
              id: room._id
            })
          })
        }
      }
    }
  }, [chatrooms])

  useEffect(() => {
    if (localStorage.getItem('chat_token')) {

      getChatrooms()

      socket.on('updateMessage', ({message,name}) => {
        makeToast('info',`${name}: ${message}`)
      })

    } else {
      makeToast('error', 'Please login first.')
      navigate('/login')
    }    

  }, [])

  const createChatroom = () => {
    const chatroomName = chatroomNameRef.current.value;

    axios
      .post("http://localhost:4000/chatroom",
        {
          name: chatroomName,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("chat_token"),
          },
        })
      .then((response) => {
        makeToast("success", response.data.message);
        getChatrooms();
        chatroomNameRef.current.value = "";
      })
      .catch((err) => {
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
        )
          makeToast("error", err.response.data.message);
      });
  };

  return (
    <div>
      <label htmlFor="chatroomName">Chatroom Name</label>
      <input type='text' name='chatroomName' id='chatroomName' ref={chatroomNameRef}></input>
      <button onClick={createChatroom}>Create Chatroom</button>
      <div>
        {chatrooms.map((room) => (
          <div key={room._id} className="flex flex-row space-x-5">
            <Link to={'/auth/chatroom/' + room._id}>
              <button>Chat</button>
            </Link>
            <div>{room.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
