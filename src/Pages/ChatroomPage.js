import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import makeToast from '../Toaster';
import axios from 'axios';


export default function ChatroomPage(props) {
    const { id } = useParams();
    const socket = props.socket;
    const [messages, setMessages] = useState([]);
    const messageRef = useRef()
    const [userID, setUserID] = useState("");
    const navigate = useNavigate();
    const [roomClients, setRoomClients] = useState([])
    const location = useLocation();
    const { roomName } = location.state

    const sendMessage = () => {
        if (socket) {
            socket.emit('chatroomMessage', {
                id,
                message: messageRef.current.value,
                roomName
            })

            messageRef.current.value = ""
        }
    }
    
    const getAccount = () => {
        axios.post(`${process.env.REACT_APP_SERVER_URL}/user/getinfo`,
            {},
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('chat_token')
                }
            }).then((res) => {
                setUserID(res.data)
            }).catch((err) => {
                setTimeout(getAccount, 3000)
            })
    }

    useEffect(() => {
        if (socket) {
            socket.on('newMessage', (message) => {
                const newMessage = [...messages, message]
                setMessages(newMessage)
            })
        }
    }, [messages])

    useEffect(() => {
        if (localStorage.getItem('chat_token')) {
            getAccount();

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

    useEffect(() => {
        socket.emit('getUsersInRoom', {
            id
        })

        socket.on('listOfUsers', ({ users }) => {
            const list = users.map(({ _id, name }) => {
                return { _id, name }
            })
            setRoomClients(list)
        })

    }, [])
    
    const addContact = (addID) => {
        axios.post(`${process.env.REACT_APP_SERVER_URL}/user/addcontact`,
            { add: addID },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('chat_token')
                }
            }).then((res) => {
                makeToast('success', res.data.message)
            }).catch((err) => {
                makeToast('error', err.message)
            })
    }

    return (
        <div className='text-2xl divide-x-2 divide-gray-700 flex flex-row w-full mb-5'>
            <div className='w-1/2 px-5 pt-5'> {/*chat section*/}
                <div className='text-3xl'>Room name: {roomName}</div>
                <div className='mt-10'>
                    <div className='space-y-5'> {/*content*/}
                        {messages.map((message, index) => (
                            <div key={index} className={userID._id === (message.userID || message.user) ? 'flex flex-row':'flex flex-row-reverse'}>
                                <span className={userID._id === (message.userID || message.user) ? 'text-blue-500' : 'text-orange-500'}>{message.name}</span><span className='px-5'>{message.message}</span>
                            </div>
                        ))}
                    </div>
                    <div className='space-y-5 mt-5 flex flex-col place-items-center'> {/*actions*/}
                        <div>
                            <input
                                type="text"
                                name="message"
                                placeholder="Say something"
                                ref={messageRef}
                                className='text-center border-2'
                            />
                        </div>
                        <div>
                            <button onClick={sendMessage} className='border-2 text-3xl'>Send</button>
                        </div>
                    </div>
                </div>

            </div>
            <div className='w-1/2 pl-5 pt-5'> {/*users in the room*/}
                <div className='text-3xl'>Room users:</div>
                <div className='space-y-5 mt-10'>
                    {roomClients.map((user, index) => (
                        <div key={index} className='flex flex-row justify-between'>
                            <div>{user.name}</div>
                            <button className={user._id === userID._id ? 'hidden' : 'border-2'} onClick={() => { addContact(user._id) }}>ADD CONTACT</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
