import React from 'react'
import "../../assets/css/styles.css";

export default function Lobby({roomName}) {
    return (
        <div>
            <h5>
                Room Name: ${roomName}
            </h5>
        </div>
    )
}
