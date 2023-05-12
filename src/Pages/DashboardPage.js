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
    axios.get(`${process.env.REACT_APP_SERVER_URL}/chatroom`, {
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
        socket.emit('joinRoom', {
          id: 'dashboard'
        })

      }

      {/*unmounting*/ }
      return () => {
        if (socket) {
          socket.emit('leaveRoom', {
            id: 'dashboard'
          })
        }
      }
    }
  }, [chatrooms])

  useEffect(() => {
    if (localStorage.getItem('chat_token')) {

      getChatrooms()

      socket.on('updateMessage', ({ roomName, name }) => {
        makeToast('info', `
        <div>
          New message in <span class="text-xl text-orange-500">${roomName}</span> from <span class="text-xl text-red-500">${name}</span>
        </div>`)
      })

    } else {
      makeToast('error', 'Please login first.')
      navigate('/login')
    }

  }, [])

  const createChatroom = () => {
    const chatroomName = chatroomNameRef.current.value;

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/chatroom`,
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
    <div className="ml-5 text-2xl space-y-10">
      <div className="space-x-5">
        <label htmlFor="chatroomName">Chatroom Name</label>
        <input type='text' name='chatroomName' id='chatroomName' ref={chatroomNameRef} className="border-2" placeholder="Input room name"></input>
        <button onClick={createChatroom} className="border-2">Create Chatroom</button>
      </div>
      <div className="space-y-5">
        {chatrooms.map((room) => (
          <div key={room._id} className="flex flex-row space-x-5">
            <Link to={'/auth/chatroom/' + room._id} state={{ roomName: room.name }}>
              <button className="border-2">Chat</button>
            </Link>
            <div>{room.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
