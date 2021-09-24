import React, { useState, useEffect } from 'react'
import "../../assets/css/styles.css";
import Participant from './Participant';
import * as FeatherIcon from 'react-feather'

export default function Lobby({roomName,socket}) {

    const [members, setMembers] = useState([]);

    function CloseCall (){
        socket.emit("EndCall", {room_id:roomName});
    }

    function ReturnToWorkspace(){
        window.location = "/workspace/";
    }

    useEffect(() => {
        socket.emit("GetRoomInfo", {room_id:roomName});
        socket.once("retrive GetRoomInfo", function (data) {
            setMembers(data.info)
        });
        socket.on("retrive EndCall",ReturnToWorkspace);
        return () => {
            socket.off("retrive EndCall",ReturnToWorkspace);
          };
    },[roomName])
  
    return (
        <div>
            <div className="action-button">
                <button type="button" onClick={CloseCall}
                className="btn btn-danger btn-floating btn-lg"
                data-dismiss="modal">
                    <FeatherIcon.X/>
                </button>
            </div>
            {members.map((chat, i) => (
                <div className="text-center">
                    <figure className="avatar user-profile mb-3">
                        {chat.pphoto==""||chat.pphoto==null?
                        <span className="avatar-title bg-info rounded-circle">
                            {chat.name.substring(0, 1)}
                        </span>:
                        <img src={chat.pphoto} className="rounded-circle" alt="image" />}
                    </figure>
                    <h5 className="mb-1">{chat.name}</h5>
                </div>
                
            ))}
            <Participant roomid={roomName} socket={socket}/>
        </div>
    )
}
