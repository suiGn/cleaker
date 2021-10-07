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
        //     var intervalo = setInterval(()=>{
        //         verVideo(stream,context,canvas);
        //    },30)
          } catch (err) {
            console.log(err);
          }
        };
        const getUserMediaAudio = async (status) => {
            try {
              const stream = await navigator.mediaDevices.getUserMedia({audio: status});
              audioRef.current.srcObject = stream;
              //socket.emit('stream',{roomid,stream});
            } catch (err) {
              console.log(err);
            }
        };
        getUserMediaVideo(videoTracks);
        //getUserMediaAudio(audioTracks);
    }, [videoTracks,audioTracks]);
    useEffect(() => {
        socket.on('stream',playVideo);
        return () => {
            socket.off('stream',playVideo);
        }
    }, []);
    const verVideo =(stream,context,canvas) =>{
        context.fillStyle = '#000000'
        context.fillRect(stream,0, 0, context.canvas.width, context.canvas.height)
        socket.emit('stream',{roomid,stream:canvas.toDataURL('image/webp')});
    }
    const playVideo = ({stream}) =>{
        console.log('test video stream');
        imageRef.current.src = stream;
    };
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
            <audio ref={audioRef} autoPlay={true} muted={true} />
            <canvas ref={canvasRef}/>
            <img ref={imageRef}/>
            <button className="btn btn-outline-light text-success" onClick={checkPermissionsVideo}>
                <FeatherIcon.Video/>
            </button> 
            <button className="btn btn-outline-light text-success" onClick={checkPermissionsAudio}>
                <FeatherIcon.Mic/>
            </button> 
        </div>
    )
}
