import React from 'react'
import "../../assets/css/styles.css";
import Participant from './Participant';

export default function Lobby({roomName,socket}) {
    return (
        <div>
            <h5>
                Room Name: ${roomName}
            </h5>
            <Participant roomid={roomName} socket={socket}/>
        </div>
    )
}
