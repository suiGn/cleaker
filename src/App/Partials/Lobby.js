import React, { useState, useEffect,useRef } from 'react';
import Webcam from "react-webcam";
import "../../assets/css/styles.css";
import Participant from './Participant';
import * as FeatherIcon from 'react-feather'
import ParticipantVideCall from './ParticipantVideCall';

export default function Lobby({roomName,socket}) {

    const [members, setMembers] = useState([]);
    let recordAudio;
    const videoRef = useRef(null);
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
   

    function CloseCall (){
        socket.emit("EndCall", {room_id:roomName});
    }

    function ReturnToWorkspace(){
        window.location = "/workspace/";
    }

    const draw = (ctx, frameCount) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = '#000000'
        ctx.beginPath()
        ctx.fillRect(frameCount,0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fill()
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
    // useEffect(() => {
    //     const canvas = canvasRef.current
    //     canvas.width = videoRef.current.videoWidth;
    //     canvas.height = videoRef.current.videoHeight;
    //     const context = canvas.getContext('2d');
    //     let frameCount = 0
    //     // let animationFrameId
        
    //     // //Our draw came here
    //     const render = () => {
    //         frameCount++
    //         draw(context, videoRef.current);
    //         //animationFrameId = window.requestAnimationFrame(render)
    //     }
    //     render()
    // }, [draw]);
    

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
    function drawImge() {
        const video = webcamRef.current;
        const canvas = canvasRef.current;
        if (video && canvas) {
            var ctx = canvas.getContext('2d');

            canvas.width = video.video.videoWidth;
            canvas.height = video.video.videoHeight;
            canvas.style.display= 'none';

            // We want also the canvas to display de image mirrored
            ctx.translate(canvas.width, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(video.video, 0, 0, canvas.width, canvas.height);
            ctx.scale(-1, 1);
            ctx.translate(-canvas.width, 0);
            var faceArea = 300;
            var pX = canvas.width / 2 - faceArea / 2;
            var pY = canvas.height / 2 - faceArea / 2;

            ctx.rect(pX, pY, faceArea, faceArea);
            ctx.lineWidth = "6";
            ctx.strokeStyle = "red";
            ctx.stroke();
            socket.emit('stream',{room_id:roomName,stream:canvas.toDataURL('image/webp')});
            setTimeout(drawImge, 33);
    
        }
    }
    setTimeout(drawImge, 33);
    // const getUserMediaVideo = async (status) => {
    //     try {
    //       const stream = await navigator.mediaDevices.getUserMedia({video: true});
    //       videoRef.current.srcObject = stream;
    //       var blob = new Blob([stream], {type: "image/png"});

    //       //verVideo(blob);
    //       // var intervalo = setInterval(()=>{
    //       //     verVideo(stream,context,canvas);
    //       // },30)
    //     } catch (err) {
    //       console.log(err);
    //     }
    // };
    // const verVideo =(stream,context,canvas) =>{
    //     //context.fillStyle = '#000000'
    //     //context.fillRect(stream,0, 0, context.canvas.width, context.canvas.height)
    //     socket.emit('stream',{room_id:roomName,stream:stream});
    // }
    // //getUserMediaVideo(true);
    // setInterval(()=>{
    //     getUserMediaVideo(true);
    // },3000);
    return (
        <div>
            <div className="action-button">
                <button type="button" onClick={CloseCall}
                className="btn btn-danger btn-floating btn-lg"
                data-dismiss="modal">
                    <FeatherIcon.X/>
                </button>
            </div>
             <Webcam
                audio={true}
                ref={webcamRef}
                mirrored
                style={{
                    width: "40%", height: "40%"
                }}
            />
            <canvas ref={canvasRef} style={{ width: "40%", height: "40%" }} />
            {members.map((chat, i) => (
                <ParticipantVideCall chat={chat} roomid={roomName} socket={socket}/>
            ))}
            {/* <Participant roomid={roomName} socket={socket}/> */}
        </div>
    )
}
