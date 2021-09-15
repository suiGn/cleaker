import React,{useState} from 'react'
import { useParams } from 'react-router';
import Lobby from './Partials/Lobby';
import "../assets/css/styles.css";


export default function VideoChat() {
    const [username, setUsername] = useState('');
    // const [roomName, setRoomName] = useState('');
    const {roomid} = useParams();
    console.log(roomid);
    return (
        <div>
            <Lobby roomName={roomid}/>
        </div>
    )
}
