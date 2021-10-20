import React, { useState, useEffect,useRef } from 'react'
import RecordRTC from 'recordrtc';
import "../../assets/css/styles.css";
import Participant from './Participant';
import * as FeatherIcon from 'react-feather'
import ParticipantVideCall from './ParticipantVideCall';

export default function Lobby({roomName,socket}) {

    const [members, setMembers] = useState([]);
    let recordAudio;

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
    

    const getUserMediaAudio = async (status) => {
        try {
            navigator.mediaDevices.getUserMedia({audio: true}).then((mediaStream)=>{
              var mediaRecorder = new MediaRecorder(mediaStream);
              mediaRecorder.onstart = function(e) {
                  this.chunks = [];
              };
              mediaRecorder.ondataavailable = function(e) {
                  this.chunks.push(e.data);
              };
              mediaRecorder.onstop = function(e) {
                  var blob = new Blob(this.chunks, { 'type' : 'audio/ogg; codecs=opus' });
                  socket.emit('audio', {room_id:roomName,stream:blob});
              };
          
              // Start recording
              mediaRecorder.start();
          
              // Stop recording after 5 seconds and broadcast it to server
              setTimeout(function() {
                  mediaRecorder.stop();
                  mediaRecorder.start();
              }, 3000);
            });
            //audioRef.current.srcObject = stream;
            //socket.emit('stream',{roomid,stream});
          } catch (err) {
            console.log(err);
          }
    };
    setInterval(()=>{
        getUserMediaAudio(true);
    },3000);

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
                <ParticipantVideCall chat={chat} roomid={roomName} socket={socket}/>
            ))}
            {/* <Participant roomid={roomName} socket={socket}/> */}
        </div>
    )
}
