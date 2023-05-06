import { useEffect } from 'react';
import { useNavigate } from "react-router-dom"

export default function IndexPage() {
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem("chat_token");
        !token ? navigate('/login'):navigate('/dashboard');
    },[])
    
    return (
        <div></div>
    )
}
