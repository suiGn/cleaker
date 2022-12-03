import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router';
import Lobby from './Partials/Lobby';
import "../assets/css/styles.css";


export default function VoiceChat({setLoaded,socket}) {
    const [permission, setPermission] = useState(null);
    // const [roomName, setRoomName] = useState('');
    const {roomid} = useParams();
    setLoaded(true);
    useEffect(() => {
        socket.emit("validateRoom",{roomid});
        socket.on("validate",Validate);
        return () => {
            socket.off("validate",Validate);
        }
    }, []);
    const Validate = ({status}) =>{
        setPermission(status);
    };
    if(permission)
        return (<div><Lobby roomName={roomid} socket={socket}  isVoiceCall={true}/></div>)
    else
        return (<div><h5>no tienes permisos</h5></div>)
}
