import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { Buffer } from 'buffer'
import makeToast from '../Toaster';


export default function ChatroomPage(props) {
    const { id } = useParams();
    const socket = props.socket;
    const [messages, setMessages] = useState([]);
    const messageRef = useRef()
    const [userID, setUserID] = useState("");
    const navigate = useNavigate();

    const location = useLocation();
    const {roomName} = location.state

    const atob = (base64) => {
        return Buffer.from(base64, 'base64').toString('binary');
    };


    const sendMessage = () => {
        if (socket) {
            socket.emit('chatroomMessage', {
                id,
                message: messageRef.current.value
            })

            messageRef.current.value = ""
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('chat_token')
        if (token) {
            const payload = JSON.parse(atob(token.split(".")[1]));
            setUserID(payload.id)
        }
        if (socket) {
            socket.on('newMessage', (message) => {
                const newMessage = [...messages, message]
                setMessages(newMessage)
            })
        }
    }, [messages])

    useEffect(() => {
        if (localStorage.getItem('chat_token')) {
            if (socket) {
                socket.emit('joinRoom', {
                    id
                })

                socket.emit('previousMessages', {
                    id
                })

                socket.on('loadHistory', (message) => {
                    const newMessage = [...messages, ...message]
                    setMessages(newMessage)
                })
            }

            {/*unmounting*/ }
            return () => {
                if (socket) {
                    socket.emit('leaveRoom', {
                        id
                    })
                }
            }
        } else {
            makeToast('error', 'Please login first.')
            navigate('/login')
        }


    }, [])

    return (
        <div>
            <div>{roomName}</div>
            <div>
                <div> {/*content*/}
                    {messages.map((message, index) => (
                        <div key={index}>
                            <span className={userID === (message.userID || message.user) ? 'text-blue-500' : 'text-orange-500'}>{message.name}:</span>{" "}{message.message}
                        </div>
                    ))}
                </div>
                <div> {/*actions*/}
                    <div>
                        <input type="text" name="message" placeholder="Say something" ref={messageRef} />
                    </div>
                    <div>
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
