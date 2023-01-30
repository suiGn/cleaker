import React,{useState,useRef,useEffect} from 'react';
import * as FeatherIcon from "react-feather";

export default function Participant({roomid,socket}) {
    const [videoTracks, setVideoTracks] = useState(false);
    const [audioTracks, setAudioTracks] = useState(false);
    //const [permision,setPermission] = useState(false);
    const videoRef = useRef(null);
    const audioRef = useRef(null);
    const canvasRef = useRef(null);
    const imageRef =  useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.width =  512;
        canvas.height = 384;
        canvas.style.display = 'none';
        context.width = canvas.width;
        context.height= canvas.height;
        const getUserMediaVideo = async (status) => {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({video: status,audio: true});
            videoRef.current.srcObject = stream;
            var blob = new Blob([stream], {type: "image/png"});
            verVideo(blob,context,canvas);
            // var intervalo = setInterval(()=>{
            //     verVideo(stream,context,canvas);
            // },30)
          } catch (err) {
            console.log(err);
          }
        };
        //getUserMediaVideo(videoTracks);
    }, [videoTracks,audioTracks]);
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
                socket.emit('audio', {roomid,stream:blob});
            };
        
            // Start recording
            mediaRecorder.start();
        
            // Stop recording after 5 seconds and broadcast it to server
            setTimeout(function() {
                mediaRecorder.stop();
                mediaRecorder.start();
            }, 5000);
          });
          //audioRef.current.srcObject = stream;
          //socket.emit('stream',{roomid,stream});
        } catch (err) {
          console.log(err);
        }
    };
    setInterval(()=>{
        getUserMediaAudio(audioTracks);
    },5000);
    useEffect(() => {
        socket.on('stream',playVideo);
        socket.on('streamAudio',playAudio);
        return () => {
            socket.off('stream',playVideo);
            socket.off('streamAudio',playAudio);
        }
    }, []);
    const verVideo =(stream,context,canvas) =>{
        context.fillStyle = '#000000'
        context.fillRect(stream,0, 0, context.canvas.width, context.canvas.height)
        socket.emit('stream',{roomid,stream:stream});
    }
    const playVideo = ({stream}) =>{
        //console.log('test video stream');
        var blob = new Blob([stream], {type: "image/png"});
        imageRef.current.src = window.URL.createObjectURL(blob);
    };
    const playAudio = ({stream}) =>{
        var blob = new Blob([stream], { 'type' : 'audio/ogg; codecs=opus' });
        //console.log(blob);
        audioRef.current.src = window.URL.createObjectURL(blob);
        audioRef.current.play();
    }
    const checkPermissionsVideo = () =>{
        setVideoTracks(!videoTracks);
    }
    const checkPermissionsAudio = () =>{
        setAudioTracks(!audioTracks);
    }
    return (
        <div className="participant">
            <h3>{roomid}</h3>
            <video ref={videoRef} autoPlay={true} />
            <audio ref={audioRef} type='audio/ogg; codecs=opus' />
            <canvas ref={canvasRef}/>
            <image ref={imageRef}/>
            <button className="btn btn-outline-light text-success" onClick={checkPermissionsVideo}>
                <FeatherIcon.Video/>
            </button> 
            <button className="btn btn-outline-light text-success" onClick={checkPermissionsAudio}>
                <FeatherIcon.Mic/>
            </button> 
        </div>
    )
}
