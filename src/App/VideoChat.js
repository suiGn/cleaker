import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router';
import Lobby from './Partials/Lobby';
import "../assets/css/styles.css";


export default function VideoChat({setLoaded,socket}) {
    const [permission, setPermission] = useState(null);
    // const [roomName, setRoomName] = useState('');
    const {roomid} = useParams();
    console.log(roomid);
    setLoaded(true);
    useEffect(() => {
        socket.emit("validateRoom",{roomid});
        socket.on("validate",Validate);
        return () => {
            socket.off("validate",Validate);
        }
    }, []);
    const Validate = ({status}) =>{
        console.log(status);
        setPermission(status);
    };
    if(permission)
        return (<div><Lobby roomName={roomid}/></div>)
    else
        return (<div><h5>no tienes permisos</h5></div>)
}
